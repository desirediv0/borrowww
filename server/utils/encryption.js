import { KMSClient, EncryptCommand, DecryptCommand } from "@aws-sdk/client-kms";

const kmsClient = new KMSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const KMS_KEY_ID = process.env.AWS_KMS_KEY_ID;

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
        console.error("Decryption error:", error);
        throw new Error("Failed to decrypt data");
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
