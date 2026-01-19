import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Common fake/test number patterns
const FAKE_PATTERNS = [
    '1234567890',
    '0123456789',
    '9876543210',
    '1234512345',
    '9999999999',
    '8888888888',
    '7777777777',
    '6666666666',
    '0000000000',
    '1111111111',
    '9000000000',
    '8000000000',
    '7000000000',
    '6000000000',
    '9123456789',
    '9012345678',
    '9999888877',
    '1212121212',
    '1122334455',
    '9898989898',
    '7878787878',
];

export function isObviouslyFake(number) {
    if (!number) return false;

    const digits = number.replace(/\D/g, '');

    // Length check - Indian numbers are exactly 10 digits
    if (digits.length !== 10) return true;

    // Must start with 6, 7, 8, or 9 (valid Indian mobile prefixes)
    if (!/^[6-9]/.test(digits)) return true;

    // All same digits (9999999999, 1111111111, etc.)
    if (/^(\d)\1{9}$/.test(digits)) return true;

    // Repeating 2-digit pattern (1212121212, 9898989898)
    if (/^(\d{2})\1{4}$/.test(digits)) return true;

    // Repeating 5-digit pattern (1234512345)
    if (/^(\d{5})\1$/.test(digits)) return true;

    // Sequential pairs (1122334455)
    if (/^(\d)\1(\d)\2(\d)\3(\d)\4(\d)\5$/.test(digits)) return true;

    // Too many zeros (more than 5)
    if ((digits.match(/0/g) || []).length > 5) return true;

    // Known fake patterns
    if (FAKE_PATTERNS.includes(digits)) return true;

    // Ends with 6+ same digits (9800000000)
    if (/(\d)\1{5,}$/.test(digits)) return true;

    // Starts with valid prefix but rest is all same (9111111111)
    if (/^[6-9](\d)\1{8}$/.test(digits)) return true;

    return false;
}

export function isValidIndianNumber(phone) {
    if (!phone || typeof phone !== 'string') return false;

    // Clean the input
    const digits = phone.replace(/\D/g, '');

    // Handle country code
    let mobileDigits = digits;
    if (digits.length === 12 && digits.startsWith('91')) {
        mobileDigits = digits.slice(2);
    } else if (digits.length === 13 && digits.startsWith('091')) {
        mobileDigits = digits.slice(3);
    }

    // Check for fake patterns first
    if (isObviouslyFake(mobileDigits)) {
        return false;
    }

    // Prepare for libphonenumber validation
    const phoneToCheck = mobileDigits.length === 10
        ? '+91' + mobileDigits
        : phone.startsWith('+') ? phone : '+' + digits;

    try {
        const phoneNumber = parsePhoneNumberFromString(phoneToCheck, 'IN');
        return phoneNumber?.isValid() && phoneNumber?.country === 'IN';
    } catch {
        return false;
    }
}