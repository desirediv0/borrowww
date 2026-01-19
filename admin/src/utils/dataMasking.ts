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

    // If data is encrypted, show as [ENCRYPTED]
    if (isEncryptedData(data)) return '[ENCRYPTED]';

    // For unencrypted data, apply basic masking
    if (data.length <= 2) return '***';
    return data.charAt(0) + '*'.repeat(Math.min(data.length - 2, 5)) + data.charAt(data.length - 1);
};

// Mask mobile number for display
export const maskMobileNumber = (mobile: string): string => {
    if (!mobile) return '';
    if (mobile.includes('*') || mobile.includes('-')) return mobile; // Already masked
    if (isEncryptedData(mobile)) return '[ENCRYPTED]';

    if (mobile.length < 6) return '***-***-****';
    return mobile.substring(0, 3) + '-***-' + mobile.substring(mobile.length - 3);
};

// Mask email for display
export const maskEmail = (email: string): string => {
    if (!email) return '';
    if (email.includes('*')) return email; // Already masked
    if (isEncryptedData(email)) return '[ENCRYPTED]';

    const [local, domain] = email.split('@');
    if (!domain) return displayMaskedData(email);

    const maskedLocal = local.length <= 2 ? '***' :
        local.charAt(0) + '*'.repeat(local.length - 2) + local.charAt(local.length - 1);

    return `${maskedLocal}@${domain}`;
};

// Mask address for display
export const maskAddress = (address: string): string => {
    if (!address) return '';
    if (address.includes('HIDDEN') || address.includes('***')) return address; // Already masked
    if (isEncryptedData(address)) return '[ENCRYPTED]';

    if (address.length <= 10) return '*** HIDDEN ***';
    return address.substring(0, 3) + '*** HIDDEN ***' + address.substring(address.length - 3);
};

// Process user data for admin display
export const processUserDataForAdmin = (user: any) => {
    if (!user) return user;

    return {
        ...user,
        firstName: displayMaskedData(user.firstName),
        middleName: displayMaskedData(user.middleName),
        lastName: displayMaskedData(user.lastName),
        address: maskAddress(user.address),
        state: displayMaskedData(user.state),
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
        address: maskAddress(cibilData.address),
        state: displayMaskedData(cibilData.state),
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
    return 'User data is encrypted and masked for privacy protection. Only partial information is visible to administrators.';
};

// Check if current user has permission to view unmasked data (for future use)
export const canViewUnmaskedData = (adminRole?: string): boolean => {
    // For now, no admin can view unmasked data
    // This can be extended in future for super-admin roles
    console.log('Admin role check:', adminRole); // Future use
    return false;
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