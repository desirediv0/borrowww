import { KMSClient, EncryptCommand, DecryptCommand, GenerateDataKeyCommand } from "@aws-sdk/client-kms";
import crypto from 'crypto';

const kmsClient = new KMSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const KMS_KEY_ID = process.env.AWS_KMS_KEY_ID;

// Small data encryption (Direct KMS) - Limit 4KB
export async function encrypt(text) {
    if (!text) return null;

    try {
        const command = new EncryptCommand({
            KeyId: KMS_KEY_ID,
            Plaintext: Buffer.from(String(text)),
        });

        const response = await kmsClient.send(command);
        return Buffer.from(response.CiphertextBlob).toString('base64');
    } catch (error) {
        console.error("Encryption error:", error);
        throw new Error("Failed to encrypt data");
    }
}

export async function decrypt(encryptedText) {
    if (!encryptedText) return null;

    try {
        const command = new DecryptCommand({
            CiphertextBlob: Buffer.from(encryptedText, 'base64'),
        });

        const response = await kmsClient.send(command);
        return Buffer.from(response.Plaintext).toString('utf-8');
    } catch (error) {
        // Suppress logging for known KMS errors when dealing with potentially legacy plaintext data
        if (error.name === 'InvalidCiphertextException') {
            // Treat as not encrypted (legacy data)
            // console.warn("Decryption skipped: Data is not valid ciphertext (likely plaintext)");
            throw error;
        }
        console.error("Decryption error:", error);
        throw new Error("Failed to decrypt data");
    }
}

// Large data encryption (Envelope Encryption: KMS + AES-256-GCM)
export async function encryptLarge(text) {
    if (!text) return null;

    try {
        // 1. Generate Data Key from KMS
        const dataKeyCommand = new GenerateDataKeyCommand({
            KeyId: KMS_KEY_ID,
            KeySpec: 'AES_256',
        });
        const dataKeyResponse = await kmsClient.send(dataKeyCommand);
        const plaintextKey = dataKeyResponse.Plaintext; // Raw bytes
        const encryptedKey = Buffer.from(dataKeyResponse.CiphertextBlob).toString('base64');

        // 2. Encrypt data locally using the Data Key (AES-256-GCM)
        const iv = crypto.randomBytes(12); // 96-bit IV for GCM
        const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(plaintextKey), iv);

        let encryptedData = cipher.update(String(text), 'utf8', 'base64');
        encryptedData += cipher.final('base64');
        const authTag = cipher.getAuthTag().toString('base64');

        // 3. Return combined structure
        // Format: { encryptedKey, iv, authTag, encryptedData }
        return JSON.stringify({
            k: encryptedKey,
            iv: iv.toString('base64'),
            t: authTag,
            d: encryptedData
        });

    } catch (error) {
        console.error("Large Encryption error:", error);
        throw new Error("Failed to encrypt large data");
    }
}

export async function decryptLarge(combinedString) {
    if (!combinedString) return null;

    try {
        let parsed;
        try {
            parsed = JSON.parse(combinedString);
        } catch (e) {
            // Fallback: If not JSON, try standard decrypt (backward compatibility or mistaken call)
            return await decrypt(combinedString);
        }

        const { k, iv, t, d } = parsed;
        if (!k || !iv || !t || !d) {
            // Fallback attempt if structure doesn't match
            return await decrypt(combinedString);
        }

        // 1. Decrypt the Data Key using KMS
        const decryptCommand = new DecryptCommand({
            CiphertextBlob: Buffer.from(k, 'base64'),
        });
        const keyResponse = await kmsClient.send(decryptCommand);
        const plaintextKey = keyResponse.Plaintext;

        // 2. Decrypt data locally using AES-256-GCM
        const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(plaintextKey), Buffer.from(iv, 'base64'));
        decipher.setAuthTag(Buffer.from(t, 'base64'));

        let decrypted = decipher.update(d, 'base64', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;

    } catch (error) {
        console.error("Large Decryption error:", error);
        throw new Error("Failed to decrypt large data");
    }
}

// Helper to encrypt sensitive fields in a user object
export const encryptUserData = async (data) => {
    // phoneNumber is NOT encrypted (used for lookups)
    const sensitiveFields = ['firstName', 'middleName', 'lastName', 'address', 'identityNumber'];
    const encryptedData = { ...data };

    for (const field of sensitiveFields) {
        if (encryptedData[field]) {
            encryptedData[field] = await encrypt(encryptedData[field]);
        }
    }
    return encryptedData;
};

// Helper to decrypt user object (with optional masking)
export const decryptUserData = async (user, mask = false) => {
    if (!user) return null;
    const sensitiveFields = ['firstName', 'middleName', 'lastName', 'address', 'identityNumber'];
    const decryptedUser = { ...user };

    for (const field of sensitiveFields) {
        if (decryptedUser[field]) {
            try {
                const val = await decrypt(decryptedUser[field]);
                if (mask && field === 'identityNumber') {
                    // Mask ID: XXXXX1234
                    decryptedUser[field] = 'XXXXX' + val.slice(-4);
                } else {
                    decryptedUser[field] = val;
                }
            } catch (e) {
                // If decryption fails (maybe not encrypted), keep original
            }
        }
    }

    // Handle Phone Number (Plain text, but might need masking)
    if (decryptedUser.phoneNumber && mask) {
        const phone = decryptedUser.phoneNumber;
        decryptedUser.phoneNumber = 'XXXXXX' + phone.slice(-4);
    }

    return decryptedUser;
};

// Helper to encrypt CIBIL data
export const encryptCibilData = async (data) => {
    const sensitiveFields = ['firstName', 'middleName', 'lastName', 'mobileNumber', 'panNumber', 'identityNumber', 'address', 'reportData'];
    const encryptedData = { ...data };

    for (const field of sensitiveFields) {
        if (encryptedData[field]) {
            encryptedData[field] = await encrypt(encryptedData[field]);
        }
    }
    return encryptedData;
};

// Helper to decrypt CIBIL data
export const decryptCibilData = async (data) => {
    if (!data) return null;
    const sensitiveFields = ['firstName', 'middleName', 'lastName', 'mobileNumber', 'panNumber', 'identityNumber', 'address', 'reportData'];
    const decryptedData = { ...data };

    for (const field of sensitiveFields) {
        if (decryptedData[field]) {
            try {
                decryptedData[field] = await decrypt(decryptedData[field]);
                // Parse reportData if it's a JSON string
                if (field === 'reportData') {
                    try {
                        decryptedData[field] = JSON.parse(decryptedData[field]);
                    } catch (e) {
                        // ignore if not json
                    }
                }
            } catch (e) {
                // ignore decryption failure
            }
        }
    }
    return decryptedData;
};
