
import { PrismaClient } from '@prisma/client';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from parent directory (server root)
dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

// Initialize S3 Client (DigitalOcean Spaces)
const s3Client = new S3Client({
    endpoint: process.env.DO_SPACES_ENDPOINT,
    region: "us-east-1", // DigitalOcean Spaces uses this region
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET
    }
});

async function cleanupPdfs() {
    console.log('Starting PDF Cleanup Job...');

    try {
        // 1. Find Expired Reports with PDFs
        const expiredReports = await prisma.creditReport.findMany({
            where: {
                expiresAt: {
                    lt: new Date() // Expired
                },
                pdfSpacesPath: {
                    not: null // Has a PDF path
                }
            },
            take: 100 // Process in batches to avoid memory issues
        });

        console.log(`Found ${expiredReports.length} expired reports with PDFs to clean up.`);

        let deletedCount = 0;
        let errorCount = 0;

        for (const report of expiredReports) {
            try {
                // 2. Delete from DigitalOcean Spaces
                console.log(`Deleting PDF for report ${report.id} path: ${report.pdfSpacesPath}`);

                const deleteCommand = new DeleteObjectCommand({
                    Bucket: process.env.DO_SPACES_BUCKET,
                    Key: report.pdfSpacesPath
                });

                await s3Client.send(deleteCommand);

                // 3. Update DB to clear paths
                await prisma.creditReport.update({
                    where: { id: report.id },
                    data: {
                        pdfSpacesPath: null,
                        pdfSpacesUrl: null
                    }
                });

                deletedCount++;
            } catch (err) {
                console.error(`Failed to delete PDF for report ${report.id}:`, err);
                errorCount++;
            }
        }

        console.log(`Cleanup Complete.`);
        console.log(`Deleted: ${deletedCount}`);
        console.log(`Errors: ${errorCount}`);

    } catch (error) {
        console.error('Cleanup Job Critical Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run
cleanupPdfs().then(() => process.exit(0)).catch(() => process.exit(1));
