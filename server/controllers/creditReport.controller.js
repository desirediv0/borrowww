/**
 * =============================================================
 * CREDIT REPORT CONTROLLER — Production-Grade
 * =============================================================
 *
 * SECURITY NOTES:
 * - All user endpoints: userId from req.user.id (JWT-verified)
 * - SUPER_ADMIN check: req.session.role === 'SUPER_ADMIN'
 *   (isAdmin middleware sets req.admin without role — role lives in session)
 * - PDF downloads: stream via S3 GetObject — CDN URL never sent to client
 * =============================================================
 */

import * as creditReportService from '../services/creditReport.service.js';
import * as storage from '../utils/storage.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Determine if the admin making the request is a SUPER_ADMIN.
 * SECURITY: role is stored in server-side session — cannot be spoofed by client.
 */
function isSuperAdmin(req) {
    return req.session?.role === 'SUPER_ADMIN';
}

// ─── USER Endpoints ───────────────────────────────────────────────────────────

export const checkCache = async (req, res) => {
    const result = await creditReportService.checkCache(req.user.id);
    res.json(result);
};

export const getSession = async (req, res) => {
    // userData from body (name + mobile) — userId strictly from JWT
    const userData = {
        firstName: req.body.firstName || req.user.firstName,
        mobileNumber: req.body.mobileNumber || req.user.phoneNumber,
    };

    const session = await creditReportService.getSession(userData);
    res.json(session);
};

export const fetchReport = async (req, res) => {
    const { transactionId } = req.body;

    if (!transactionId?.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Transaction ID is required',
        });
    }

    // SECURITY: userId from JWT — never from req.body
    const result = await creditReportService.fetchAndSaveReport(req.user.id, transactionId.trim());
    res.json(result);
};

export const getMyReport = async (req, res) => {
    // SECURITY: userId from JWT
    const report = await creditReportService.getMyReport(req.user.id);

    if (!report) {
        return res.status(404).json({
            success: false,
            message: 'No credit report found. Generate your first report.',
        });
    }

    res.json(report);
};

/**
 * Legacy URL endpoint — retained for backward compat.
 * Returns public URL if still valid. Prefer /download-pdf.
 * @deprecated
 */
export const getMyPdf = async (req, res) => {
    const report = await creditReportService.getMyPdf(req.user.id);

    if (!report) {
        return res.status(404).json({
            success: false,
            message: 'No active report found',
        });
    }

    // For legacy support — in production use /download-pdf instead
    if (report.pdfSpacesUrl) {
        return res.json({ success: true, url: report.pdfSpacesUrl });
    }

    return res.json({ success: false, status: 'PROCESSING', message: 'PDF is being generated' });
};

/**
 * SECURE PDF Download — streams the PDF directly from DigitalOcean Spaces.
 *
 * SECURITY:
 * - Only the report owner can download (userId from JWT, not body)
 * - Only ACTIVE and non-expired reports (dual check)
 * - Returns 403 if trying to access someone else's report (handled by strict userId)
 * - Returns 404 if no active report or PDF missing
 * - Content-Type: application/pdf + Content-Disposition: attachment
 */
export const downloadMyPdf = async (req, res) => {
    // SECURITY: userId strictly from verified JWT token
    const userId = req.user.id;

    const report = await creditReportService.getMyPdfPath(userId);

    if (!report) {
        return res.status(404).json({
            success: false,
            message: 'No active credit report found. Generate a new report first.',
        });
    }

    if (!report.pdfSpacesPath) {
        return res.status(404).json({
            success: false,
            message: 'PDF not available for this report.',
        });
    }

    // Stream directly from Spaces — browser never sees the CDN URL
    await storage.streamPdfToResponse(
        report.pdfSpacesPath,
        res,
        `credit-report-${new Date().toISOString().slice(0, 10)}.pdf`,
    );
};

// ─── ADMIN Endpoints ──────────────────────────────────────────────────────────

export const getAllReportsAdmin = async (req, res) => {
    const { page, limit, search, month, year } = req.query;

    const result = await creditReportService.getAllReportsAdmin(
        parseInt(page) || 1,
        parseInt(limit) || 10,
        search || '',
        isSuperAdmin(req),                  // FIX: read from session, not req.admin.role
        month ? parseInt(month) : undefined,
        year ? parseInt(year) : undefined,
    );

    res.json(result);
};

export const getReportDetailAdmin = async (req, res) => {
    const report = await creditReportService.getReportDetailAdmin(
        req.params.id,
        isSuperAdmin(req),                  // FIX: read from session
    );

    if (!report) {
        return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.json(report);
};

export const getAdminStats = async (req, res) => {
    const stats = await creditReportService.getAdminStats();
    res.json(stats);
};

/**
 * ADMIN: Secure PDF download for any user's report.
 *
 * SECURITY:
 * - Protected by isAdmin middleware (session-based)
 * - Streams directly from Spaces (no CDN URL to client)
 * - SECURITY NOTE: Admin can download PDF for ANY report — including expired ones.
 *   This is intentional for compliance/audit purposes.
 */
export const downloadAdminPdf = async (req, res) => {
    const { id: reportId } = req.params;

    if (!reportId?.trim()) {
        return res.status(400).json({ success: false, message: 'Report ID required' });
    }

    const report = await creditReportService.getReportPdfPath(reportId.trim());

    if (!report) {
        return res.status(404).json({ success: false, message: 'Report not found' });
    }

    if (!report.pdfSpacesPath) {
        return res.status(404).json({
            success: false,
            message: 'No PDF available — it may have been deleted after expiry',
        });
    }

    console.info(`[Audit] Admin (${req.admin?.id}) downloading PDF for report ${reportId} (user ${report.userId})`);

    await storage.streamPdfToResponse(
        report.pdfSpacesPath,
        res,
        `credit-report-${reportId}.pdf`,
    );
};
