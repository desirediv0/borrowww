import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
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

export async function uploadPdfFromUrl(sourceUrl, userId, panLast4) {
    try {
        // 1. Download PDF
        const response = await axios.get(sourceUrl, { responseType: 'arraybuffer' });
        const pdfBuffer = response.data;

        // 2. Generate Path
        const timestamp = Date.now();
        const path = `credit-reports/${userId}/${timestamp}_${panLast4}.pdf`;

        // 3. Upload to Spaces
        const command = new PutObjectCommand({
            Bucket: process.env.SPACES_BUCKET,
            Key: path,
            Body: pdfBuffer,
            ContentType: 'application/pdf',
            ACL: 'public-read',
        });

        await s3Client.send(command);

        // 4. Return URLs
        // Construct CDN/public URL:
        // https://bucket.region.cdn.digitaloceanspaces.com/key
        // OR process.env.SPACES_ENDPOINT based (usually has region in it)
        // Prompt says: "https://" + SPACES_BUCKET + "." + SPACES_REGION + ".cdn.digitaloceanspaces.com/" + key
        const spacesUrl = `https://${process.env.SPACES_BUCKET}.${process.env.SPACES_REGION}.cdn.digitaloceanspaces.com/${path}`; // Assuming CDN format

        return {
            spacesPath: path,
            spacesUrl: spacesUrl
        };
    } catch (error) {
        console.error("PDF Upload Error:", error);
        // Don't throw, return nulls so we can still save the report data
        return { spacesPath: null, spacesUrl: null };
    }
}

export async function generateSignedUrl(path, expiresIn = 3600) {
    if (!path) return null;
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.DO_SPACES_BUCKET,
            Key: path,
        });
        return await getSignedUrl(s3Client, command, { expiresIn });
    } catch (error) {
        console.error("Signed URL Error:", error);
        return null;
    }
}
