/**
 * ================================================================================
 * AWS KMS ENVELOPE ENCRYPTION UTILITY
 * ================================================================================
 * 
 * SECURITY ARCHITECTURE:
 * - Uses AWS KMS Customer Managed Key (CMK) for key encryption
 * - Implements envelope encryption pattern:
 *   1. Generate a unique Data Encryption Key (DEK) per encryption
 *   2. Encrypt plaintext with DEK using AES-256-GCM
 *   3. Encrypt DEK with KMS CMK
 *   4. Store encrypted DEK + encrypted data together
 * 
 * WHY THIS APPROACH:
 * - Never store plaintext keys
 * - Each record has unique encryption key
 * - KMS CMK never leaves AWS
 * - Even AWS cannot decrypt without CMK access
 * - Meets banking compliance requirements (PCI-DSS, SOC2)
 * 
 * ENVIRONMENT VARIABLES REQUIRED:
 * - AWS_REGION: AWS region where KMS key exists (e.g., ap-south-1)
 * - AWS_KMS_KEY_ID: ARN of Customer Managed Key
 * - AWS_ACCESS_KEY_ID: IAM user access key with kms:Encrypt, kms:Decrypt
 * - AWS_SECRET_ACCESS_KEY: IAM user secret key
 * 
 * ================================================================================
 */

import { KMSClient, GenerateDataKeyCommand, DecryptCommand } from '@aws-sdk/client-kms';
import crypto from 'crypto';

// ================================================================================
// KMS CLIENT CONFIGURATION
// ================================================================================

/**
 * SECURITY: KMS client is initialized with credentials from environment variables.
 * NEVER hardcode AWS credentials in source code.
 * IAM user should have MINIMAL permissions: kms:GenerateDataKey, kms:Decrypt only.
 */
const getKMSClient = () => {
    // Validate required environment variables before creating client
    if (!process.env.AWS_REGION) {
        throw new Error('AWS_REGION environment variable is required for KMS encryption');
    }
    if (!process.env.AWS_KMS_KEY_ID) {
        throw new Error('AWS_KMS_KEY_ID environment variable is required for KMS encryption');
    }

    return new KMSClient({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
};

// ================================================================================
// ENCRYPTION CONFIGURATION
// ================================================================================

const ALGORITHM = 'aes-256-gcm';  // AES-GCM provides authenticated encryption
const IV_LENGTH = 12;              // 96 bits recommended for GCM
const AUTH_TAG_LENGTH = 16;        // 128 bits authentication tag

// ================================================================================
// ENVELOPE ENCRYPTION FUNCTIONS
// ================================================================================

/**
 * Encrypt plaintext using AWS KMS envelope encryption.
 * 
 * SECURITY FLOW:
 * 1. Request KMS to generate a new Data Encryption Key (DEK)
 * 2. KMS returns plaintext DEK (for local encryption) + encrypted DEK
 * 3. Encrypt plaintext with plaintext DEK using AES-256-GCM
 * 4. Immediately zero out plaintext DEK from memory
 * 5. Return base64 encoded: encryptedDEK + IV + authTag + ciphertext
 * 
 * @param {string} plainText - The text to encrypt
 * @returns {Promise<string>} - Base64 encoded encrypted envelope
 * @throws {Error} - On encryption failure or missing config
 */
export const encryptText = async (plainText) => {
    // SECURITY: Handle null/undefined gracefully
    if (!plainText || typeof plainText !== 'string') {
        return plainText;
    }

    try {
        const kmsClient = getKMSClient();

        // Step 1: Generate a unique Data Encryption Key (DEK) from KMS
        // SECURITY: Each encryption gets a unique DEK - no key reuse
        const generateKeyCommand = new GenerateDataKeyCommand({
            KeyId: process.env.AWS_KMS_KEY_ID,
            KeySpec: 'AES_256',  // 256-bit key for AES-256
        });

        const { CiphertextBlob: encryptedDEK, Plaintext: plaintextDEK } =
            await kmsClient.send(generateKeyCommand);

        // Step 2: Generate random IV for AES-GCM
        const iv = crypto.randomBytes(IV_LENGTH);

        // Step 3: Encrypt plaintext with DEK using AES-256-GCM
        const cipher = crypto.createCipheriv(ALGORITHM, plaintextDEK, iv, {
            authTagLength: AUTH_TAG_LENGTH,
        });

        let encrypted = cipher.update(plainText, 'utf8');
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        const authTag = cipher.getAuthTag();

        // Step 4: SECURITY - Zero out plaintext DEK from memory immediately
        // This is a best-effort security measure to minimize key exposure
        plaintextDEK.fill(0);

        // Step 5: Combine all parts into envelope
        // Format: [4 bytes DEK length][encrypted DEK][12 bytes IV][16 bytes authTag][ciphertext]
        const dekLength = Buffer.alloc(4);
        dekLength.writeUInt32BE(encryptedDEK.length, 0);

        const envelope = Buffer.concat([
            dekLength,
            encryptedDEK,
            iv,
            authTag,
            encrypted,
        ]);

        // Return as base64 for safe storage in database String columns
        return envelope.toString('base64');

    } catch (error) {
        // SECURITY: Log error but don't expose internal details
        console.error('[KMS ENCRYPTION ERROR]', {
            timestamp: new Date().toISOString(),
            errorMessage: error.message,
            // Never log: plaintext, keys, or full stack in production
        });
        throw new Error('Encryption failed. Contact system administrator.');
    }
};

/**
 * Decrypt ciphertext using AWS KMS envelope encryption.
 * 
 * SECURITY FLOW:
 * 1. Parse the envelope to extract encrypted DEK, IV, authTag, ciphertext
 * 2. Request KMS to decrypt the DEK using the CMK
 * 3. Decrypt ciphertext with plaintext DEK
 * 4. Immediately zero out plaintext DEK from memory
 * 5. Return decrypted plaintext
 * 
 * @param {string} cipherText - Base64 encoded encrypted envelope
 * @returns {Promise<string>} - Decrypted plaintext
 * @throws {Error} - On decryption failure or tampering detected
 */
export const decryptText = async (cipherText) => {
    // SECURITY: Handle null/undefined gracefully
    if (!cipherText || typeof cipherText !== 'string') {
        return cipherText;
    }

    // SECURITY: Check if data looks like it's encrypted with our format
    // If not, it might be legacy data or unencrypted - return as-is
    try {
        // Quick validation: base64 encoded envelope should be longer than minimum
        // Minimum: 4 (DEK length) + 1 (DEK) + 12 (IV) + 16 (authTag) = 33 bytes
        const envelope = Buffer.from(cipherText, 'base64');
        if (envelope.length < 33) {
            // Likely not encrypted with our format, return as-is
            return cipherText;
        }
    } catch {
        // Not valid base64, return as-is (might be legacy or plain)
        return cipherText;
    }

    try {
        const kmsClient = getKMSClient();

        // Step 1: Parse the envelope
        const envelope = Buffer.from(cipherText, 'base64');

        const dekLength = envelope.readUInt32BE(0);
        let offset = 4;

        const encryptedDEK = envelope.subarray(offset, offset + dekLength);
        offset += dekLength;

        const iv = envelope.subarray(offset, offset + IV_LENGTH);
        offset += IV_LENGTH;

        const authTag = envelope.subarray(offset, offset + AUTH_TAG_LENGTH);
        offset += AUTH_TAG_LENGTH;

        const encrypted = envelope.subarray(offset);

        // Step 2: Decrypt the DEK using KMS
        const decryptKeyCommand = new DecryptCommand({
            CiphertextBlob: encryptedDEK,
            KeyId: process.env.AWS_KMS_KEY_ID,
        });

        const { Plaintext: plaintextDEK } = await kmsClient.send(decryptKeyCommand);

        // Step 3: Decrypt ciphertext with DEK
        const decipher = crypto.createDecipheriv(ALGORITHM, plaintextDEK, iv, {
            authTagLength: AUTH_TAG_LENGTH,
        });
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        // Step 4: SECURITY - Zero out plaintext DEK from memory immediately
        plaintextDEK.fill(0);

        return decrypted.toString('utf8');

    } catch (error) {
        // SECURITY: Log error with context for debugging
        console.error('[KMS DECRYPTION ERROR]', {
            timestamp: new Date().toISOString(),
            errorMessage: error.message,
            // SECURITY WARNING: If authTag fails, data may have been tampered
            isTamperWarning: error.message?.includes('Unsupported state') ||
                error.message?.includes('authentication tag'),
        });

        // SECURITY: For decryption errors, we might be dealing with:
        // 1. Tampered data (auth tag mismatch)
        // 2. Legacy encrypted data (old format)
        // 3. Already decrypted plain data
        // Return as-is to not break the application, but log for investigation
        return cipherText;
    }
};

// ================================================================================
// HELPER FUNCTIONS FOR BATCH OPERATIONS
// ================================================================================

/**
 * Encrypt multiple fields in an object.
 * 
 * @param {Object} data - Object with fields to encrypt
 * @param {string[]} fields - Array of field names to encrypt
 * @returns {Promise<Object>} - Object with encrypted fields
 */
export const encryptFields = async (data, fields) => {
    if (!data || typeof data !== 'object') return data;

    const encryptedData = { ...data };

    for (const field of fields) {
        if (encryptedData[field] !== undefined && encryptedData[field] !== null) {
            // SECURITY: Convert non-strings to string before encryption
            const value = typeof encryptedData[field] === 'string'
                ? encryptedData[field]
                : String(encryptedData[field]);
            encryptedData[field] = await encryptText(value);
        }
    }

    return encryptedData;
};

/**
 * Decrypt multiple fields in an object.
 * 
 * @param {Object} data - Object with encrypted fields
 * @param {string[]} fields - Array of field names to decrypt
 * @returns {Promise<Object>} - Object with decrypted fields
 */
export const decryptFields = async (data, fields) => {
    if (!data || typeof data !== 'object') return data;

    const decryptedData = { ...data };

    for (const field of fields) {
        if (decryptedData[field] !== undefined && decryptedData[field] !== null) {
            decryptedData[field] = await decryptText(decryptedData[field]);
        }
    }

    return decryptedData;
};

// ================================================================================
// SENSITIVE FIELD DEFINITIONS
// ================================================================================

/**
 * SECURITY: Define which fields contain PII/sensitive data per model.
 * These fields MUST be encrypted before database storage.
 * 
 * WARNING: Phone numbers excluded from encryption to allow lookups.
 * Consider alternative approaches (hashing) for phone-based searches.
 */

export const SENSITIVE_FIELDS = {
    User: [
        'firstName',
        'middleName',
        'lastName',
        'address',
        'pincode',
        'identityNumber',  // PAN/Aadhaar
        // 'phoneNumber' - Excluded for lookup capability
    ],
    CibilData: [
        'firstName',
        'middleName',
        'lastName',
        'panNumber',
        'identityNumber',
        'address',
        'mobileNumber',
        // 'reportData' - JSON, encrypt separately
    ],
    CreditCheckInquiry: [
        'firstName',
        'mobileNumber',
    ],
    ContactInquiry: [
        'name',
        'email',
        'phone',
        'message',
    ],
    HomeLoanInquiry: [
        'name',
        'phone',
        'city',
        'monthlyIncome',
    ],
    ReferralInquiry: [
        'referrerName',
        'referrerPhone',
        'referrerEmail',
        'refereeName',
        'refereePhone',
        'refereeEmail',
    ],
};

// ================================================================================
// AUDIT LOGGING
// ================================================================================

/**
 * Log sensitive data access for compliance auditing.
 * 
 * @param {string} action - 'encrypt' or 'decrypt'
 * @param {string} model - Model name (e.g., 'User')
 * @param {string} recordId - Record ID being accessed
 * @param {string} adminId - Admin ID if applicable
 */
export const logDataAccess = (action, model, recordId, adminId = null) => {
    // SECURITY: Audit log for compliance (PCI-DSS, DPDP Act)
    console.log(JSON.stringify({
        type: 'DATA_ACCESS_AUDIT',
        timestamp: new Date().toISOString(),
        action,
        model,
        recordId,
        adminId,
        // In production, this should go to a secure, immutable log service
    }));
};
