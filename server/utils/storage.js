import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from 'axios';

const s3Client = new S3Client({
    endpoint: process.env.SPACES_ENDPOINT,
    region: process.env.SPACES_REGION,
    credentials: {
        accessKeyId: process.env.SPACES_ACCESS_KEY,
        secretAccessKey: process.env.SPACES_SECRET_KEY,
    },
    forcePathStyle: false,
});

/**
 * Generate storage path in required format:
 * {year}/{month}/{date}/user_{userId}.pdf
 * Example: 2026/February/25-02-2026/user_abc123.pdf
 */
function generatePdfPath(userId) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.toLocaleString('en-US', { month: 'long' }); // "February"
    const day = String(now.getDate()).padStart(2, '0');
    const month2 = String(now.getMonth() + 1).padStart(2, '0');
    const date = `${day}-${month2}-${year}`; // "25-02-2026"
    return `${year}/${month}/${date}/user_${userId}.pdf`;
}

/**
 * Upload a PDF from a URL to DigitalOcean Spaces.
 * Path format: {year}/{month}/{date}/user_{userId}.pdf
 */
export async function uploadPdfFromUrl(sourceUrl, userId) {
    try {
        // 1. Download PDF from DeepVue
        const response = await axios.get(sourceUrl, {
            responseType: 'arraybuffer',
            timeout: 30000,
        });
        const pdfBuffer = response.data;

        if (!pdfBuffer || pdfBuffer.byteLength === 0) {
            throw new Error('PDF download returned empty buffer');
        }

        // 2. Generate structured path
        const path = generatePdfPath(userId);

        // 3. Upload to Spaces — PRIVATE (no ACL public-read)
        // SECURITY: PDFs are sensitive financial documents.
        // Access only via authenticated server-side stream (/download-pdf).
        const command = new PutObjectCommand({
            Bucket: process.env.SPACES_BUCKET,
            Key: path,
            Body: pdfBuffer,
            ContentType: 'application/pdf',
            // NO ACL property — bucket defaults to private
        });

        await s3Client.send(command);

        console.log(`[Storage] PDF uploaded (private): ${path}`);
        return {
            doPath: path,    // stored in pdfSpacesPath for server-side streaming
            doUrl: null,     // SECURITY: No public CDN URL — use streamPdfToResponse()
        };
    } catch (error) {
        console.error("[Storage] PDF Upload Error:", error.message);
        // Return nulls — don't fail report generation if PDF upload fails
        return { doPath: null, doUrl: null };
    }
}

/**
 * Generate a signed (private) URL for a stored PDF.
 * Use for secure, time-limited download links.
 */
export async function generateSignedUrl(path, expiresIn = 3600) {
    if (!path) return null;
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.SPACES_BUCKET,
            Key: path,
        });
        return await getSignedUrl(s3Client, command, { expiresIn });
    } catch (error) {
        console.error("[Storage] Signed URL Error:", error.message);
        return null;
    }
}

/**
 * Delete a PDF from Spaces by its stored path.
 */
export async function deletePdf(path) {
    if (!path) return;
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.SPACES_BUCKET,
            Key: path,
        });
        await s3Client.send(command);
        console.log(`[Storage] PDF deleted: ${path}`);
    } catch (error) {
        console.error("[Storage] PDF Delete Error:", error.message);
        throw error;
    }
}

/**
 * Stream a PDF from Spaces directly to an HTTP response.
 * Use this for secure authenticated downloads — never expose CDN URL to client.
 *
 * @param {string} path - The storage key (pdfSpacesPath in DB)
 * @param {object} res  - Express response object
 * @param {string} filename - Optional filename for Content-Disposition header
 */
export async function streamPdfToResponse(path, res, filename = 'credit-report.pdf') {
    if (!path) {
        res.status(404).json({ success: false, message: 'PDF not found' });
        return;
    }
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.SPACES_BUCKET,
            Key: path,
        });
        const data = await s3Client.send(command);

        // Set secure download headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('X-Content-Type-Options', 'nosniff');

        if (data.ContentLength) {
            res.setHeader('Content-Length', data.ContentLength);
        }

        // Pipe the S3 stream directly to the HTTP response
        data.Body.pipe(res);
    } catch (error) {
        console.error("[Storage] Stream PDF Error:", error.message);
        if (error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404) {
            res.status(404).json({ success: false, message: 'PDF file not found in storage' });
        } else {
            res.status(500).json({ success: false, message: 'Failed to retrieve PDF' });
        }
    }
}
