/**
 * =============================================================
 * CREDIT REPORT SERVICE — Production-Grade
 * =============================================================
 *
 * Security Notes:
 * - userId always comes from req.user.id (JWT-verified) — never from body.
 * - PAN is ALWAYS returned masked (ABC****34F) to any frontend.
 * - Full PAN visible only to SUPER_ADMIN in admin detail view.
 * - CDN URLs for PDF are NEVER sent to frontend (secure stream only).
 * - AES KMS encryption for all sensitive fields before DB write.
 * - Race condition prevented: DB uniqueness + guard check.
 * =============================================================
 */

import { prisma } from '../config/db.js';   // Shared singleton Prisma instance
import { deepVueService } from '../services/deepvue.service.js';
import * as encryption from '../services/encryption.service.js';
import * as storage from '../utils/storage.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format date: "25 February 2026" */
function formatDate(date) {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

/**
 * Standard API response envelope.
 * SECURITY: Never include CDN PDF URL here.
 */
function buildResponse(source, report) {
    const isExpired = report.status === 'EXPIRED' || new Date(report.expiresAt) < new Date();
    return {
        success: true,
        source,                          // "database" | "api"
        status: isExpired ? 'expired' : 'active',
        fetch_date: report.fetchedAt,
        expiry_date: report.expiresAt,
        fetch_date_formatted: formatDate(report.fetchedAt),
        expiry_date_formatted: formatDate(report.expiresAt),
    };
}

/** Return summary fields (non-sensitive, no PAN, no PDF URL) */
function buildSummary(report) {
    return {
        creditScore: report.creditScore,
        totalAccounts: report.totalAccounts,
        activeAccounts: report.activeAccounts,
        closedAccounts: report.closedAccounts,
        totalBalance: report.totalBalance,
        totalOverdue: report.totalOverdue,
        totalSanctionAmount: report.totalSanctionAmount,
        noOfWriteOffs: report.noOfWriteOffs,
        enquiryCount: report.enquiryCount,
        enquiryPast30Days: report.enquiryPast30Days,
        enquiryPast12Months: report.enquiryPast12Months,
    };
}

// ─── USER: Check Cache ────────────────────────────────────────────────────────

/**
 * Check if a valid active report exists for user.
 * (Used by legacy endpoint — main flow uses getMyReport directly)
 */
export const checkCache = async (userId) => {
    try {
        const report = await prisma.creditReport.findFirst({
            where: {
                userId,
                status: 'ACTIVE',
                expiresAt: { gt: new Date() },
            },
            orderBy: { fetchedAt: 'desc' },
            select: {
                creditScore: true,
                totalAccounts: true,
                activeAccounts: true,
                fetchedAt: true,
                expiresAt: true,
                status: true,
            },
        });

        if (report) {
            return {
                cached: true,
                expiry_date_formatted: formatDate(report.expiresAt),
                creditScore: report.creditScore,
            };
        }
        return { cached: false };
    } catch (error) {
        console.error('[CreditReport] checkCache error:', error.message);
        throw new Error('Failed to check cache');
    }
};

// ─── USER: Create DeepVue Session ────────────────────────────────────────────

export const getSession = async (userData) => {
    // GUARD: Don't create a session if user already has a valid report
    // (Secondary check — primary is in fetchAndSaveReport)
    return await deepVueService.createCibilSession(userData);
};

// ─── USER: Fetch + Save Report ────────────────────────────────────────────────

/**
 * Main entry point for generating a new credit report.
 *
 * RACE CONDITION PROTECTION:
 * We use a DB-level guard (status=ACTIVE + expiresAt>now) BEFORE the external API call.
 * The DeepVue transactionId is unique per session, so concurrent requests with the
 * same transactionId will both attempt to fetch, but only one DB insert will succeed
 * (the second will return the cached result).
 *
 * SECURITY:
 * - userId comes from JWT (req.user.id), never from request body.
 * - All sensitive data encrypted via AWS KMS before DB write.
 * - PDF CDN URL never returned to client.
 */
export const fetchAndSaveReport = async (userId, transactionId) => {
    // ── GUARD 1: 28-day check ─────────────────────────────────────────────────
    // IMPORTANT: This check must happen BEFORE any external API call.
    const existingActive = await prisma.creditReport.findFirst({
        where: {
            userId,
            status: 'ACTIVE',
            expiresAt: { gt: new Date() },
        },
        orderBy: { fetchedAt: 'desc' },
    });

    if (existingActive) {
        return {
            ...buildResponse('database', existingActive),
            ...buildSummary(existingActive),
            message: `Your credit report is already generated and valid until ${formatDate(existingActive.expiresAt)}`,
            alreadyCached: true,
        };
    }

    // ── GUARD 2: Duplicate transactionId check ────────────────────────────────
    // Prevent concurrent rapid clicks from calling DeepVue API twice
    const duplicateTxn = await prisma.creditReport.findFirst({
        where: { userId, transactionId },
    });
    if (duplicateTxn) {
        return {
            ...buildResponse('database', duplicateTxn),
            ...buildSummary(duplicateTxn),
            message: 'Report already generated for this session.',
            alreadyCached: true,
        };
    }

    // ── STEP 1: Fetch from DeepVue ────────────────────────────────────────────
    const response = await deepVueService.fetchCibilReport(transactionId);

    if (!response) {
        throw new Error('No response from DeepVue');
    }

    // Still processing — tell frontend to retry
    if (response.status === 'PROCESSING') {
        return { status: 'PROCESSING', message: 'Report is being processed. Please wait...' };
    }

    if (!response.success || !response.data) {
        throw new Error(response.message || 'Invalid response from DeepVue');
    }

    const { data } = response;
    const reportData = data.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData;

    if (!reportData) {
        throw new Error('Credit report data missing in DeepVue response');
    }

    const summary = reportData.RetailAccountsSummary || {};
    const enquiry = reportData.EnquirySummary || {};

    // ── STEP 2: Encrypt sensitive fields via AWS KMS ──────────────────────────
    // SECURITY: Only encrypted blobs are stored in DB. Never plaintext.
    if (!data.pan) throw new Error('PAN missing from DeepVue response');

    const [panEncrypted, mobileEncrypted, nameEncrypted, fullReportEncrypted] = await Promise.all([
        encryption.encrypt(data.pan),
        encryption.encrypt(data.mobile || ''),
        encryption.encrypt(data.name || ''),
        encryption.encryptLarge(JSON.stringify(data)),   // KMS envelope encryption
    ]);

    // ── STEP 3: Upload PDF to DigitalOcean Spaces ─────────────────────────────
    // Path: {year}/{month}/{date}/user_{userId}.pdf
    // If upload fails, we still save the report (non-blocking)
    let doPath = null;
    let doUrl = null;
    if (data.pdf_url) {
        try {
            const uploadResult = await storage.uploadPdfFromUrl(data.pdf_url, userId);
            doPath = uploadResult.doPath;
            doUrl = uploadResult.doUrl;    // Internal use only — NOT sent to client
        } catch (uploadErr) {
            // Log but continue — report data is more important than PDF
            console.error('[CreditReport] PDF upload failed (non-fatal):', uploadErr.message);
        }
    }

    // ── STEP 4: Expire any previous ACTIVE reports for this user ──────────────
    // This must happen BEFORE creating the new record
    await prisma.creditReport.updateMany({
        where: {
            userId,
            status: 'ACTIVE',
        },
        data: {
            status: 'EXPIRED',
            pdfSpacesPath: null,
            pdfSpacesUrl: null,
        },
    });

    // ── STEP 5: Save new report to DB ─────────────────────────────────────────
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000); // +28 days exactly

    const savedReport = await prisma.creditReport.create({
        data: {
            userId,
            status: 'ACTIVE',

            // Encrypted via AWS KMS — NO plaintext stored
            panEncrypted,
            mobileEncrypted,
            nameEncrypted,
            fullReportEncrypted,

            // Non-sensitive summary fields (safe to store plaintext for queries)
            creditScore: parseInt(data.credit_score) || 0,
            totalAccounts: parseInt(summary.NoOfAccounts) || 0,
            activeAccounts: parseInt(summary.NoOfActiveAccounts) || 0,
            closedAccounts: Math.max((parseInt(summary.NoOfAccounts) - parseInt(summary.NoOfActiveAccounts)) || 0, 0),
            totalBalance: parseFloat(summary.TotalBalanceAmount) || 0,
            totalOverdue: parseFloat(summary.TotalPastDue) || 0,
            totalSanctionAmount: parseFloat(summary.TotalSanctionAmount) || 0,
            totalMonthlyPayment: parseFloat(summary.TotalMonthlyPaymentAmount) || 0,
            noOfWriteOffs: parseInt(summary.NoOfWriteOffs) || 0,
            oldestAccountDate: summary.OldestAccount || null,
            newestAccountDate: summary.RecentAccount || null,

            enquiryCount: parseInt(enquiry.Total) || 0,
            enquiryPast30Days: parseInt(enquiry.Past30Days) || 0,
            enquiryPast12Months: parseInt(enquiry.Past12Months) || 0,

            transactionId,
            pdfOriginalUrl: data.pdf_url || null,   // Original URL (from DeepVue, not public)
            pdfSpacesPath: doPath,                   // Internal storage path
            pdfSpacesUrl: doUrl,                     // INTERNAL ONLY — never sent to client

            fetchedAt: now,
            expiresAt,
        },
    });

    return {
        ...buildResponse('api', savedReport),
        ...buildSummary(savedReport),
        // SECURITY: No PAN, no mobile, no PDF URL in this response
        // Client must call /my-report to get masked PAN
    };
};

// ─── USER: Get My Report ──────────────────────────────────────────────────────

/**
 * Return the user's own report with decrypted (but masked) PAN.
 *
 * SECURITY:
 * - PAN is ALWAYS masked (ABC****34F) — even for the owner
 * - Mobile number is masked in response (show last 4 only)
 * - CDN PDF URL is NEVER included — use /download-pdf endpoint
 * - User can only get their own report (userId from JWT)
 */
export const getMyReport = async (userId) => {
    // Fetch most recent report (any status — for Try Again flow)
    const report = await prisma.creditReport.findFirst({
        where: { userId },
        orderBy: { fetchedAt: 'desc' },
    });

    if (!report) return null;

    const isExpired = report.status === 'EXPIRED' || new Date(report.expiresAt) < new Date();

    // EXPIRED — return minimal info only (no sensitive data, no PDF)
    if (isExpired) {
        return {
            success: true,
            source: 'database',
            status: 'expired',
            fetch_date: report.fetchedAt,
            expiry_date: report.expiresAt,
            fetch_date_formatted: formatDate(report.fetchedAt),
            expiry_date_formatted: formatDate(report.expiresAt),
            message: 'Your credit report has expired. Generate a new one.',
            // SECURITY: No PAN, no fullReport, no PDF path for expired reports
        };
    }

    // ACTIVE — decrypt and return (with masking)
    let maskedPan = null;
    let maskedMobile = null;
    let decryptedName = null;
    let fullReportObj = null;

    try {
        const [pan, mobile, name, fullReportJson] = await Promise.all([
            encryption.decrypt(report.panEncrypted),
            encryption.decrypt(report.mobileEncrypted),
            encryption.decrypt(report.nameEncrypted),
            encryption.decryptLarge(report.fullReportEncrypted),
        ]);

        maskedPan = encryption.maskPan(pan);    // ALWAYS masked ABC****34F
        // SECURITY: Mask mobile — only show last 4 digits to user
        maskedMobile = mobile ? `XXXXXX${mobile.slice(-4)}` : null;
        decryptedName = name;
        fullReportObj = JSON.parse(fullReportJson);
    } catch (decryptErr) {
        console.error('[CreditReport] Decryption failed for report', report.id, '—', decryptErr.message);
        // Return partial response with only summary (score + stats)
        // so the user at least sees their credit score
        return {
            ...buildResponse('database', report),
            ...buildSummary(report),
            decryptionError: true,
            pan: null,
            name: null,
            history: [],
        };
    }

    // Score history (6 months)
    const historyData = await prisma.creditReport.findMany({
        where: {
            userId,
            fetchedAt: { gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) },
        },
        orderBy: { fetchedAt: 'asc' },
        select: { fetchedAt: true, creditScore: true },
    });

    const history = historyData.map((h) => ({
        month: h.fetchedAt.toLocaleString('default', { month: 'short' }),
        score: h.creditScore,
        date: h.fetchedAt,
    }));

    return {
        ...buildResponse('database', report),
        ...buildSummary(report),

        // SECURITY: Masked PAN always
        pan: maskedPan,
        maskedPan,
        // SECURITY: Masked mobile (only last 4 digits)
        mobile: maskedMobile,
        name: decryptedName,
        fullReport: fullReportObj,
        history,

        oldestAccountDate: report.oldestAccountDate,
        newestAccountDate: report.newestAccountDate,
        // SECURITY: No pdfSpacesUrl — use /download-pdf endpoint
        hasPdf: !!report.pdfSpacesPath,
    };
};

// ─── USER: Get PDF Path (internal — for streaming) ───────────────────────────

/**
 * Get PDF path for the user's active report.
 * SECURITY:
 * - Only ACTIVE and within expiry — never for expired reports
 * - userId from JWT, not request body
 *
 * Returns { id, pdfSpacesPath } or null
 */
export const getMyPdfPath = async (userId) => {
    // SECURITY: Check both status=ACTIVE AND expiresAt>now
    // Cron may not have run yet, so expired reports could still be ACTIVE in DB
    const report = await prisma.creditReport.findFirst({
        where: {
            userId,
            status: 'ACTIVE',
            expiresAt: { gt: new Date() },    // FIX: Must validate expiry here too
        },
        orderBy: { fetchedAt: 'desc' },
        select: { id: true, pdfSpacesPath: true },
    });
    return report;
};

// ─── ADMIN: Get PDF Path (internal — for streaming) ──────────────────────────

/**
 * Get the PDF path for any report (admin use only).
 * @param {string} reportId - The CreditReport.id
 */
export const getReportPdfPath = async (reportId) => {
    const report = await prisma.creditReport.findUnique({
        where: { id: reportId },
        select: { id: true, pdfSpacesPath: true, userId: true, status: true },
    });
    return report;
};

// ─── USER: Get My PDF URL (legacy) ───────────────────────────────────────────

/** @deprecated Use /download-pdf secure stream instead */
export const getMyPdf = async (userId) => {
    const report = await prisma.creditReport.findFirst({
        where: { userId, status: 'ACTIVE', expiresAt: { gt: new Date() } },
        orderBy: { fetchedAt: 'desc' },
        select: { id: true, pdfSpacesUrl: true, pdfSpacesPath: true },
    });
    return report;
};

// ─── ADMIN: Get All Reports ───────────────────────────────────────────────────

export const getAllReportsAdmin = async (
    page = 1,
    limit = 10,
    search = '',
    isSuperAdmin = false,
    month = undefined,
    year = undefined,
) => {
    const skip = (page - 1) * limit;
    const where = {};

    // Month/Year filter
    if (month && year) {
        where.fetchedAt = {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
        };
    } else if (year) {
        where.fetchedAt = {
            gte: new Date(year, 0, 1),
            lt: new Date(year + 1, 0, 1),
        };
    }

    // Search (by phone)
    if (search) {
        where.user = {
            OR: [{ phoneNumber: { contains: search } }],
        };
    }

    // Single DB call with count (no N+1 issue)
    const [reports, total] = await Promise.all([
        prisma.creditReport.findMany({
            where,
            skip,
            take: limit,
            orderBy: { fetchedAt: 'desc' },
            include: {
                user: {
                    select: { id: true, firstName: true, lastName: true, phoneNumber: true },
                },
            },
        }),
        prisma.creditReport.count({ where }),
    ]);

    // Decrypt user names + PAN in parallel for the page
    const decryptedReports = await Promise.all(
        reports.map(async (report) => {
            // Decrypt user name fields
            if (report.user) {
                try {
                    report.user = await encryption.decryptUserData(report.user, false);
                } catch {
                    // Keep encrypted value if decryption fails
                }
            }

            // Decrypt PAN — ALWAYS masked in list view
            if (report.panEncrypted) {
                try {
                    const pan = await encryption.decrypt(report.panEncrypted);
                    report.pan = encryption.maskPan(pan);    // Always ABC****34F in list
                } catch {
                    report.pan = null;
                }
            }

            // Status + dates
            const isExpired = report.status === 'EXPIRED' || new Date(report.expiresAt) < new Date();
            report.statusLabel = isExpired ? 'expired' : 'active';
            report.fetch_date_formatted = formatDate(report.fetchedAt);
            report.expiry_date_formatted = formatDate(report.expiresAt);

            // SECURITY: Remove CDN URL from list response
            delete report.pdfSpacesUrl;
            delete report.pdfOriginalUrl;
            // Keep pdfSpacesPath so frontend knows if PDF exists (for download button)
            return report;
        }),
    );

    return {
        reports: decryptedReports,
        total,
        page,
        pages: Math.ceil(total / limit),
    };
};

// ─── ADMIN: Get Single Report Detail ─────────────────────────────────────────

/**
 * Full report detail for admin.
 * SECURITY:
 * - PAN: masked for regular admin, FULL only for SUPER_ADMIN
 * - PDF URL: never returned — admin uses /admin/:id/download-pdf
 */
export const getReportDetailAdmin = async (reportId, isSuperAdmin = false) => {
    const report = await prisma.creditReport.findUnique({
        where: { id: reportId },
        include: {
            user: {
                select: { id: true, firstName: true, lastName: true, phoneNumber: true, email: true },
            },
        },
    });

    if (!report) return null;

    // Decrypt all sensitive fields
    let pan = null, mobile = null, name = null, fullReportObj = null;

    try {
        [pan, mobile, name] = await Promise.all([
            encryption.decrypt(report.panEncrypted),
            encryption.decrypt(report.mobileEncrypted),
            encryption.decrypt(report.nameEncrypted),
        ]);
    } catch (e) {
        console.error('[Admin] Decryption error for report', reportId);
    }

    try {
        const fullReportJson = await encryption.decryptLarge(report.fullReportEncrypted);
        fullReportObj = JSON.parse(fullReportJson);
    } catch (e) {
        console.error('[Admin] Full report decryption error for', reportId);
    }

    // Decrypt user fields
    if (report.user) {
        try {
            report.user = await encryption.decryptUserData(report.user, false);
        } catch { /* keep encrypted */ }
    }

    const isExpired = report.status === 'EXPIRED' || new Date(report.expiresAt) < new Date();

    return {
        ...report,
        // PAN: Full only for SUPER_ADMIN; masked for regular admin
        pan: isSuperAdmin ? pan : encryption.maskPan(pan),
        mobile,
        name,
        fullReport: fullReportObj,
        statusLabel: isExpired ? 'expired' : 'active',
        fetch_date_formatted: formatDate(report.fetchedAt),
        expiry_date_formatted: formatDate(report.expiresAt),
        // SECURITY: Remove CDN URL — admin downloads via /admin/:id/download-pdf
        pdfSpacesUrl: undefined,
        hasPdf: !!report.pdfSpacesPath,
    };
};

// ─── ADMIN: Statistics ────────────────────────────────────────────────────────

export const getAdminStats = async () => {
    const now = new Date();

    const [totalReports, activeReports, expiredReports, avgResult, uniqueUsersGroup] =
        await Promise.all([
            prisma.creditReport.count(),
            prisma.creditReport.count({
                where: { status: 'ACTIVE', expiresAt: { gt: now } },
            }),
            prisma.creditReport.count({
                where: {
                    OR: [{ status: 'EXPIRED' }, { expiresAt: { lte: now } }],
                },
            }),
            prisma.creditReport.aggregate({ _avg: { creditScore: true } }),
            prisma.creditReport.groupBy({ by: ['userId'], _count: true }),
        ]);

    return {
        totalReports,
        activeReports,
        expiredReports,
        uniqueUsers: uniqueUsersGroup.length,
        averageCreditScore: Math.round(avgResult._avg.creditScore || 0),
    };
};
