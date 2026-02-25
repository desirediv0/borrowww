/**
 * =============================================================
 * CREDIT REPORT EXPIRY CRON JOB
 * =============================================================
 *
 * Runs daily at midnight (00:00) IST.
 *
 * For each report where expiresAt < now AND status = ACTIVE:
 *   1. Delete PDF from DigitalOcean Spaces
 *   2. Null out pdf path/url in DB
 *   3. Set status = EXPIRED
 *
 * DB records are NEVER deleted (regulatory compliance).
 * Only the PDF binary is removed after expiry.
 * =============================================================
 */

import cron from 'node-cron';
import { prisma } from '../config/db.js';    // FIX: use shared singleton, not new PrismaClient()
import * as storage from '../utils/storage.js';

/**
 * Process expired credit reports:
 * - Delete PDF from object storage
 * - Mark report as EXPIRED in DB
 */
async function processExpiredReports() {
    const now = new Date();
    console.log(`[Cron] Running credit report expiry job at ${now.toISOString()}`);

    try {
        // Find all reports that have passed their expiry and are still marked ACTIVE
        const expiredReports = await prisma.creditReport.findMany({
            where: {
                status: 'ACTIVE',
                expiresAt: { lte: now },
            },
            select: {
                id: true,
                userId: true,
                pdfSpacesPath: true,
                expiresAt: true,
            },
        });

        if (expiredReports.length === 0) {
            console.log('[Cron] No expired reports found.');
            return;
        }

        console.log(`[Cron] Found ${expiredReports.length} expired report(s) to process.`);

        let successCount = 0;
        let errorCount = 0;

        for (const report of expiredReports) {
            try {
                // Step 1: Delete PDF from Spaces (if it exists)
                if (report.pdfSpacesPath) {
                    try {
                        await storage.deletePdf(report.pdfSpacesPath);
                        console.log(`[Cron] PDF deleted for report ${report.id}: ${report.pdfSpacesPath}`);
                    } catch (pdfErr) {
                        // Log but don't stop — mark report as expired regardless
                        console.error(`[Cron] PDF delete failed for report ${report.id}:`, pdfErr.message);
                    }
                }

                // Step 2: Mark as EXPIRED in DB, clear pdf fields
                await prisma.creditReport.update({
                    where: { id: report.id },
                    data: {
                        status: 'EXPIRED',
                        pdfSpacesPath: null,
                        pdfSpacesUrl: null,
                    },
                });

                successCount++;
                console.log(`[Cron] Report ${report.id} (user: ${report.userId}) marked as EXPIRED`);
            } catch (err) {
                errorCount++;
                console.error(`[Cron] Failed to process report ${report.id}:`, err.message);
            }
        }

        console.log(`[Cron] Expiry job complete. Success: ${successCount}, Errors: ${errorCount}`);
    } catch (err) {
        console.error('[Cron] Fatal error in expiry job:', err);
    }
}

/**
 * Start the daily expiry cron job.
 * Schedule: '0 0 * * *' = every day at 00:00 (midnight server time).
 *
 * Call this once at server startup.
 */
export function startCreditReportExpiryJob() {
    // Run once immediately on startup to catch any reports that expired while server was down
    processExpiredReports();

    // Schedule daily at midnight
    cron.schedule('0 0 * * *', () => {
        processExpiredReports();
    }, {
        timezone: 'Asia/Kolkata', // IST timezone
    });

    console.log('[Cron] Credit report expiry job scheduled (daily at midnight IST)');
}

// Allow manual trigger for testing
export { processExpiredReports };
