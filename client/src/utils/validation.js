import { parsePhoneNumberFromString } from 'libphonenumber-js';

const FAKE_SEQUENCES = [
    // Sequential patterns
    '1234567890',
    '9876543210',
    '0123456789',
    '0987654321',

    // Common test/placeholder numbers
    '9000000000',
    '8000000000',
    '7000000000',
    '6000000000',
    '9999999990',
    '9123456789',
    '9876500000',

    // Movie/TV style fake numbers
    '9876543211',
    '9988776655',
    '1122334455',
];

/**
 * Checks if number is obviously fake
 */
export function isObviouslyFake(digits) {
    if (!digits || digits.length !== 10) return true;

    // Indian mobile must start with 6, 7, 8, or 9
    if (!/^[6-9]/.test(digits)) return true;

    // All same digits: 9999999999
    if (/^(\d)\1{9}$/.test(digits)) return true;

    // Alternating digits: 9898989898, 7878787878
    if (/^(\d)(\d)\1\2\1\2\1\2\1\2$/.test(digits)) return true;

    // Repeated pairs: 9999988888, 7777766666
    if (/^(\d)\1{4}(\d)\2{4}$/.test(digits)) return true;

    // Triple + repeated: 9991111111, 8882222222
    if (/^(\d)\1{2}(\d)\2{6}$/.test(digits)) return true;

    // First digit + all zeros: 9000000000
    if (/^[6-9]0{9}$/.test(digits)) return true;

    // First digit repeated + zeros: 9990000000
    if (/^([6-9])\1{2}0{7}$/.test(digits)) return true;

    // Mirror pattern: 9123221329 (rare but worth checking)
    if (digits === digits.split('').reverse().join('')) return true;

    // Repeating 3-digit blocks: 9879879879 (close enough)
    if (/^(\d{3})\1\1/.test(digits)) return true;

    // Check against known fake sequences
    if (FAKE_SEQUENCES.includes(digits)) return true;

    return false;
}

/**
 * Normalizes phone to 10-digit format
 */
function normalizeToTenDigits(phone) {
    const digits = phone.replace(/\D/g, '');

    if (digits.startsWith('91') && digits.length === 12) return digits.slice(2);
    if (digits.startsWith('0') && digits.length === 11) return digits.slice(1);

    return digits;
}

/**
 * Validates Indian mobile number
 * @param {string} phone - Phone number in any format
 * @returns {boolean}
 */
export function isValidIndianNumber(phone) {
    if (!phone) return false;

    const digits = normalizeToTenDigits(phone);

    if (isObviouslyFake(digits)) return false;

    const parsed = parsePhoneNumberFromString(`+91${digits}`, 'IN');

    return parsed?.isValid() && parsed?.country === 'IN';
}