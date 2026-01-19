import crypto from 'crypto';

// Use a consistent key for dev/prod (in prod, this should come from env)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'borrowww-secure-key-32-bytes-long!!'; // Can be any string
const IV_LENGTH = 16; // For AES, this is always 16

// Derive a 32-byte key from the secret string to ensure valid length for aes-256
const KEY_BUFFER = crypto.createHash('sha256').update(String(ENCRYPTION_KEY)).digest();

// Fields to encrypt for User
const USER_ENCRYPT_FIELDS = [
    'email',
    'address',
    'pincode',
    'identityNumber', // PAN/Aadhaar stored here
    // 'phoneNumber' - Excluded to avoid breaking lookups
];

// Fields to encrypt for CIBIL Data
const CIBIL_ENCRYPT_FIELDS = [
    'panNumber',
    'identityNumber',
    'address',
    'reportData', // Full JSON report
    // 'mobileNumber' - Excluded to avoid breaking lookups
];

const encrypt = (text) => {
    if (!text) return text;
    try {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-cbc', KEY_BUFFER, iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (error) {
        console.error("Encryption error:", error);
        return text; // Return original if fail
    }
};

const decrypt = (text) => {
    if (!text) return text;
    try {
        const textParts = text.split(':');
        if (textParts.length < 2) return text; // Not encrypted
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', KEY_BUFFER, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        // console.error("Decryption error:", error);
        return text; // Return original if fail (might be already plain or invalid)
    }
};

const maskData = (text) => {
    if (!text || text.length < 4) return text;
    return '******' + text.slice(-4);
};

// Generic object processor
const processObject = (data, fields, processor) => {
    if (!data || typeof data !== 'object') return data;
    const newData = { ...data };
    for (const field of fields) {
        if (newData[field]) {
            newData[field] = processor(newData[field]);
        }
    }
    return newData;
};

export const encryptCibilData = (data) => {
    return processObject(data, CIBIL_ENCRYPT_FIELDS, (val) => {
        if (typeof val !== 'string') val = String(val);
        return encrypt(val);
    });
};

export const decryptCibilData = (data, mask = false) => {
    return processObject(data, CIBIL_ENCRYPT_FIELDS, (val) => {
        const decrypted = decrypt(val);
        return mask ? maskData(decrypted) : decrypted;
    });
};

export const encryptUserData = (data) => {
    return processObject(data, USER_ENCRYPT_FIELDS, (val) => {
        if (typeof val !== 'string') val = String(val);
        return encrypt(val);
    });
};

export const decryptUserData = (data, mask = false) => {
    return processObject(data, USER_ENCRYPT_FIELDS, (val) => {
        const decrypted = decrypt(val);
        return mask ? maskData(decrypted) : decrypted;
    });
};