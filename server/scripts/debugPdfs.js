
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simple .env parser since imports are failing
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');

if (fs.existsSync(envPath)) {
    console.log(`Loading .env from ${envPath}`);
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
} else {
    console.log(`.env not found at ${envPath}`);
}

import { prisma } from '../config/db.js';

async function checkPdfs() {
    console.log("--- Checking Credit Reports PDF Status ---");

    try {
        const reports = await prisma.creditReport.findMany({
            take: 5,
            orderBy: { fetchedAt: 'desc' },
            select: {
                id: true,
                userId: true,
                fetchedAt: true,
                pdfSpacesUrl: true,
                pdfSpacesPath: true,
                pdfOriginalUrl: true
            }
        });

        console.log(`Found ${reports.length} recent reports:`);
        reports.forEach(r => {
            console.log(`\nID: ${r.id}`);
            console.log(`User: ${r.userId}`);
            console.log(`Date: ${r.fetchedAt}`);
            console.log(`Spaces URL: ${r.pdfSpacesUrl || 'NULL'}`);
            console.log(`Spaces Path: ${r.pdfSpacesPath || 'NULL'}`);
            console.log(`Original URL: ${r.pdfOriginalUrl || 'NULL'}`);
        });

    } catch (error) {
        console.error("PDF Check Failed:", error);
    }
}

checkPdfs();
