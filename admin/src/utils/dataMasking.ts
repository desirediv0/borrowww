/**
 * Data Security and Masking Utilities for Admin Panel
 * Handles encrypted data display and privacy protection
 */

// Check if data appears to be encrypted (contains colons indicating iv:encrypted:tag format)
export const isEncryptedData = (data: string): boolean => {
    if (!data || typeof data !== 'string') return false;
    const parts = data.split(':');
    return parts.length === 3 && parts.every(part => /^[a-fA-F0-9]+$/.test(part));
};

// Display masked data for admin view
export const displayMaskedData = (data: string): string => {
    if (!data) return '';

    // If data is already masked (contains *), display as-is
    if (data.includes('*')) return data;

    // If data is encrypted (backend didn't decrypt), show as [ENCRYPTED]
    if (isEncryptedData(data)) return '[ENCRYPTED]';

    // Data is already decrypted by backend — show as-is
    return data;
};

// Mask mobile number for display
export const maskMobileNumber = (mobile: string): string => {
    if (!mobile) return '';
    if (isEncryptedData(mobile)) return '[ENCRYPTED]';
    // Show full phone for admin
    return mobile;
};

// Mask email for display
export const maskEmail = (email: string): string => {
    if (!email) return '';
    if (isEncryptedData(email)) return '[ENCRYPTED]';
    return email;
};

// Mask address for display
export const maskAddress = (address: string): string => {
    if (!address) return '';
    if (isEncryptedData(address)) return '[ENCRYPTED]';
    return address;
};

// Process user data for admin display — show decrypted data fully
export const processUserDataForAdmin = (user: any) => {
    if (!user) return user;

    return {
        ...user,
        firstName: displayMaskedData(user.firstName),
        middleName: displayMaskedData(user.middleName),
        lastName: displayMaskedData(user.lastName),
        address: displayMaskedData(user.address),
        state: user.state,
        phoneNumber: maskMobileNumber(user.phoneNumber),
        // Keep non-sensitive fields as-is
        id: user.id,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        pincode: user.pincode,
        identityType: user.identityType,
        identityNumber: displayMaskedData(user.identityNumber),
        isActive: user.isActive,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
    };
};

// Process CIBIL data for admin display
export const processCibilDataForAdmin = (cibilData: any) => {
    if (!cibilData) return cibilData;

    return {
        ...cibilData,
        firstName: displayMaskedData(cibilData.firstName),
        middleName: displayMaskedData(cibilData.middleName),
        lastName: displayMaskedData(cibilData.lastName),
        mobileNumber: maskMobileNumber(cibilData.mobileNumber),
        address: displayMaskedData(cibilData.address),
        state: cibilData.state,
        // Keep non-sensitive fields as-is
        id: cibilData.id,
        score: cibilData.score,
        panNumber: cibilData.panNumber,
        dateOfBirth: cibilData.dateOfBirth,
        gender: cibilData.gender,
        identityType: cibilData.identityType,
        identityNumber: displayMaskedData(cibilData.identityNumber),
        pincode: cibilData.pincode,
        source: cibilData.source,
        fetchedAt: cibilData.fetchedAt,
        expiresAt: cibilData.expiresAt,
        status: cibilData.status,
        isSubmitted: cibilData.isSubmitted,
        createdAt: cibilData.createdAt,
        updatedAt: cibilData.updatedAt,
    };
};

// Process array of users for admin display
export const processUsersArrayForAdmin = (users: any[]) => {
    if (!Array.isArray(users)) return users;
    return users.map(processUserDataForAdmin);
};

// Process array of CIBIL data for admin display
export const processCibilArrayForAdmin = (cibilData: any[]) => {
    if (!Array.isArray(cibilData)) return cibilData;
    return cibilData.map(processCibilDataForAdmin);
};

// Get privacy notice for admin
export const getPrivacyNotice = (): string => {
    return 'User data is encrypted in the database. You are viewing decrypted administrative data.';
};

// Admin can always view full data (decryption happens server-side)
export const canViewUnmaskedData = (_adminRole?: string): boolean => {
    return true;
};

export default {
    isEncryptedData,
    displayMaskedData,
    maskMobileNumber,
    maskEmail,
    maskAddress,
    processUserDataForAdmin,
    processCibilDataForAdmin,
    processUsersArrayForAdmin,
    processCibilArrayForAdmin,
    getPrivacyNotice,
    canViewUnmaskedData,
};