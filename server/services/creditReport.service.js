import { PrismaClient } from '@prisma/client';
import { deepVueService } from '../services/deepvue.service.js';
import * as encryption from '../services/encryption.service.js';
import * as storage from '../utils/storage.js';

const prisma = new PrismaClient();

export const checkCache = async (userId) => {
    try {
        const report = await prisma.creditReport.findFirst({
            where: {
                userId: userId,
                expiresAt: {
                    gt: new Date(),
                },
            },
            orderBy: {
                fetchedAt: 'desc',
            },
            select: {
                creditScore: true,
                totalAccounts: true,
                activeAccounts: true,
                closedAccounts: true,
                totalBalance: true,
                totalOverdue: true,
                totalSanctionAmount: true,
                noOfWriteOffs: true,
                oldestAccountDate: true,
                newestAccountDate: true,
                enquiryCount: true,
                enquiryPast30Days: true,
                enquiryPast12Months: true,
                fetchedAt: true,
                expiresAt: true,
                pdfSpacesUrl: true,
            },
        });

        if (report) {
            return { cached: true, report };
        }
        return { cached: false };
    } catch (error) {
        console.error('Check Cache Error:', error);
        throw new Error('Failed to check cache');
    }
};

export const getSession = async (userData) => {
    return await deepVueService.createCibilSession(userData);
};

export const fetchAndSaveReport = async (userId, transactionId) => {
    try {
        // 1. Check cache again to be safe
        const cached = await checkCache(userId);
        if (cached.cached) return cached.report;

        // 2. Fetch from DeepVue
        const response = await deepVueService.fetchCibilReport(transactionId);

        // Validate response structure
        if (!response || !response.data) {
            throw new Error('Invalid response from DeepVue');
        }

        const { data } = response;
        const reportData = data.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData;

        if (!reportData) {
            throw new Error('Credit report data missing in response');
        }

        const summary = reportData.RetailAccountsSummary || {};
        const enquiry = reportData.EnquirySummary || {};

        // 3. Encrypt sensitive data
        const [panEncrypted, mobileEncrypted, nameEncrypted, fullReportEncrypted] = await Promise.all([
            encryption.encrypt(data.pan),
            encryption.encrypt(data.mobile),
            encryption.encrypt(data.name),
            encryption.encryptLarge(JSON.stringify(data))
        ]);

        // 4. Upload PDF
        let doPath = null;
        let doUrl = null;
        if (data.pdf_url) {
            const uploadResult = await storage.uploadPdfFromUrl(
                data.pdf_url,
                userId,
                (data.pan || 'XXXX').slice(-4)
            );
            doPath = uploadResult.doPath;
            doUrl = uploadResult.doUrl;
        }

        // 4.1 Delete previous PDF if exists (Data Retention Policy: Keep DB history, delete old PDF)
        const previousReport = await prisma.creditReport.findFirst({
            where: { userId, pdfSpacesPath: { not: null } },
            orderBy: { fetchedAt: 'desc' }
        });

        if (previousReport && previousReport.pdfSpacesPath) {
            try {
                await storage.deletePdf(previousReport.pdfSpacesPath);
                // Update DB to reflect PDF deletion
                await prisma.creditReport.update({
                    where: { id: previousReport.id },
                    data: { pdfSpacesPath: null, pdfSpacesUrl: null }
                });
                console.log(`Deleted previous PDF for report ${previousReport.id}`);
            } catch (err) {
                console.error('Failed to delete previous PDF:', err);
                // Continue execution, don't fail new report generation
            }
        }

        // 5. Save to DB
        const savedReport = await prisma.creditReport.create({
            data: {
                userId,
                panEncrypted,
                mobileEncrypted,
                nameEncrypted,
                fullReportEncrypted,

                creditScore: parseInt(data.credit_score) || 0,
                totalAccounts: parseInt(summary.NoOfAccounts) || 0,
                activeAccounts: parseInt(summary.NoOfActiveAccounts) || 0,
                closedAccounts: (parseInt(summary.NoOfAccounts) - parseInt(summary.NoOfActiveAccounts)) || 0,
                totalBalance: parseFloat(summary.TotalBalanceAmount) || 0,
                totalOverdue: parseFloat(summary.TotalPastDue) || 0,
                totalSanctionAmount: parseFloat(summary.TotalSanctionAmount) || 0,
                totalMonthlyPayment: parseFloat(summary.TotalMonthlyPaymentAmount) || 0, // Added
                noOfWriteOffs: parseInt(summary.NoOfWriteOffs) || 0,
                oldestAccountDate: summary.OldestAccount || null,
                newestAccountDate: summary.RecentAccount || null,

                enquiryCount: parseInt(enquiry.Total) || 0,
                enquiryPast30Days: parseInt(enquiry.Past30Days) || 0, // Added
                enquiryPast12Months: parseInt(enquiry.Past12Months) || 0, // Added

                transactionId,
                pdfOriginalUrl: data.pdf_url,
                pdfSpacesPath: doPath, // Renamed
                pdfSpacesUrl: doUrl,   // Renamed

                fetchedAt: new Date(),
                expiresAt: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 28 days
            },
        });

        // Return summary only (no PII)
        return {
            creditScore: savedReport.creditScore,
            totalAccounts: savedReport.totalAccounts,
            activeAccounts: savedReport.activeAccounts,
            totalBalance: savedReport.totalBalance,
            expiresAt: savedReport.expiresAt
        };

    } catch (error) {
        console.error('Fetch and Save Error:', error);
        throw error;
    }
};

export const getMyReport = async (userId) => {
    try {
        const report = await prisma.creditReport.findFirst({
            where: {
                userId: userId,
                expiresAt: { gt: new Date() }
            },
            orderBy: { fetchedAt: 'desc' }
        });

        if (!report) return null;

        // Fetch history (last 6 months)
        const historyData = await prisma.creditReport.findMany({
            where: {
                userId: userId,
                fetchedAt: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
                }
            },
            orderBy: { fetchedAt: 'asc' },
            select: {
                fetchedAt: true,
                creditScore: true
            }
        });

        const history = historyData.map(h => ({
            month: h.fetchedAt.toLocaleString('default', { month: 'short' }),
            score: h.creditScore,
            date: h.fetchedAt
        }));

        // Decrypt data
        const pan = await encryption.decrypt(report.panEncrypted);
        const mobile = await encryption.decrypt(report.mobileEncrypted);
        const name = await encryption.decrypt(report.nameEncrypted);
        const fullReportJson = await encryption.decryptLarge(report.fullReportEncrypted);

        return {
            ...report,
            pan,
            mobile,
            name,
            fullReport: JSON.parse(fullReportJson),
            history: history // Added history array
        };
    } catch (error) {
        console.error('Get My Report Error:', error);
        throw new Error('Failed to retrieve report');
    }
};

export const getMyPdf = async (userId) => {
    try {
        const report = await prisma.creditReport.findFirst({
            where: { userId },
            orderBy: { fetchedAt: 'desc' },
            select: { id: true, pdfSpacesUrl: true }
        });
        return report;
    } catch (error) {
        console.error('Get PDF Error:', error);
        throw new Error('Failed to get PDF URL');
    }
};

// Admin Functions
export const getAllReportsAdmin = async (page = 1, limit = 10, search = '') => {
    const skip = (page - 1) * limit;

    const where = {};
    if (search) {
        // Cannot search encrypted fields easily. 
        // Searching by user relation
        where.user = {
            OR: [
                { email: { contains: search, mode: 'insensitive' } },
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } }
            ]
        };
    }

    const [reports, total] = await Promise.all([
        prisma.creditReport.findMany({
            where,
            skip,
            take: limit,
            orderBy: { fetchedAt: 'desc' },
            include: {
                user: {
                    select: { firstName: true, lastName: true, phoneNumber: true } // Assuming email is not directly on User based on schema seeing phoneNumber
                }
            }
        }),
        prisma.creditReport.count({ where })
    ]);

    // Decrypt user details for each report
    const decryptedReports = await Promise.all(reports.map(async (report) => {
        if (report.user) {
            report.user = await encryption.decryptUserData(report.user, false);
        }
        return report;
    }));

    return { reports: decryptedReports, total, page, pages: Math.ceil(total / limit) };
};

export const getReportDetailAdmin = async (reportId) => {
    const report = await prisma.creditReport.findUnique({
        where: { id: reportId },
        include: { user: true }
    });

    if (!report) return null;

    // Decrypt for admin
    const pan = await encryption.decrypt(report.panEncrypted);
    const mobile = await encryption.decrypt(report.mobileEncrypted);
    const name = await encryption.decrypt(report.nameEncrypted);
    const fullReportJson = await encryption.decryptLarge(report.fullReportEncrypted);

    return {
        ...report,
        pan,
        mobile,
        name,
        fullReport: JSON.parse(fullReportJson)
    };
};

export const getAdminStats = async () => {
    try {
        const [totalReports, activeReports, expiredReports, averageScoreResult] = await Promise.all([
            prisma.creditReport.count(),
            prisma.creditReport.count({ where: { expiresAt: { gt: new Date() } } }),
            prisma.creditReport.count({ where: { expiresAt: { lte: new Date() } } }),
            prisma.creditReport.aggregate({
                _avg: {
                    creditScore: true
                }
            })
        ]);

        // Unique users is a bit more complex with standard prisma count, so we'll approximate or use groupBy
        const uniqueUsersGroup = await prisma.creditReport.groupBy({
            by: ['userId'],
            _count: true
        });
        const uniqueUsers = uniqueUsersGroup.length;

        return {
            totalReports,
            activeReports,
            expiredReports,
            uniqueUsers,
            averageCreditScore: Math.round(averageScoreResult._avg.creditScore || 0)
        };
    } catch (error) {
        console.error('Get Admin Stats Error:', error);
        throw new Error('Failed to get admin stats');
    }
};
