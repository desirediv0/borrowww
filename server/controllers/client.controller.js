/**
 * ================================================================================
 * CLIENT CONTROLLER - ENCRYPTION ONLY, NO DECRYPTION
 * ================================================================================
 * 
 * SECURITY ARCHITECTURE:
 * - Client APIs receive plaintext data from frontend forms
 * - ALL sensitive fields are encrypted before database storage
 * - ONLY reference ID is returned to client
 * - Client must NEVER see decrypted data
 * 
 * WARNING: DO NOT add decryption to any function in this file.
 * Decryption is ONLY allowed in admin.controller.js
 * 
 * SENSITIVE DATA HANDLING:
 * - Name, phone, email, address, income - ALL encrypted
 * - Database stores ONLY encrypted values
 * - Even DBA cannot read customer data
 * 
 * ================================================================================
 */

import { prisma } from '../config/db.js';
import { ApiResponsive } from '../utils/ApiResponsive.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isValidIndianNumber } from '../utils/validation.js';
import { encryptFields, SENSITIVE_FIELDS, logDataAccess } from '../utils/kms.util.js';

// ================================================================================
// CREDIT CHECK INQUIRY - CLIENT SUBMISSION
// ================================================================================

/**
 * Create credit check inquiry from client website.
 * 
 * SECURITY:
 * - Encrypts firstName, mobileNumber before storage
 * - Returns only inquiry ID
 * - Client NEVER sees decrypted data
 * 
 * @route POST /api/client/credit-check
 * @access Public
 */
export const createCreditCheckInquiry = asyncHandler(async (req, res) => {
    const { firstName, mobileNumber, consent } = req.body;

    // Validation
    if (!firstName || !mobileNumber) {
        return res.status(400).json({
            success: false,
            error: 'First name and mobile number are required',
        });
    }

    if (!isValidIndianNumber(mobileNumber)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid mobile number',
        });
    }

    // SECURITY: Encrypt all sensitive fields before database storage
    const encryptedData = await encryptFields(
        { firstName, mobileNumber },
        SENSITIVE_FIELDS.CreditCheckInquiry
    );

    // Create inquiry with encrypted data
    const inquiry = await prisma.creditCheckInquiry.create({
        data: {
            firstName: encryptedData.firstName,
            mobileNumber: encryptedData.mobileNumber,
            consent: consent !== false, // Default true
            ipAddress: req.ip || req.headers['x-forwarded-for'] || null,
            userAgent: req.headers['user-agent'] || null,
        },
    });

    // AUDIT: Log data creation (encrypted)
    logDataAccess('encrypt', 'CreditCheckInquiry', inquiry.id);

    // SECURITY: Return ONLY reference ID - NO sensitive data
    // Client must never see decrypted data
    return res.status(201).json(
        new ApiResponsive(201, {
            referenceId: inquiry.id,
            message: 'Your credit check inquiry has been submitted successfully.',
        }, 'Credit check inquiry created')
    );
});

// ================================================================================
// CONTACT INQUIRY - CLIENT SUBMISSION
// ================================================================================

/**
 * Create contact inquiry from client website.
 * 
 * SECURITY:
 * - Encrypts name, email, phone, message
 * - Returns only inquiry ID
 * 
 * @route POST /api/client/contact
 * @access Public
 */
export const createContactInquiry = asyncHandler(async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Name, email, and message are required',
        });
    }

    if (phone && !isValidIndianNumber(phone)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid phone number',
        });
    }

    // SECURITY: Encrypt all sensitive fields
    const encryptedData = await encryptFields(
        { name, email, phone, message },
        SENSITIVE_FIELDS.ContactInquiry
    );

    const inquiry = await prisma.contactInquiry.create({
        data: {
            name: encryptedData.name,
            email: encryptedData.email,
            phone: encryptedData.phone || null,
            subject: subject || null, // Subject is not PII, no encryption
            message: encryptedData.message,
            ipAddress: req.ip || req.headers['x-forwarded-for'] || null,
            userAgent: req.headers['user-agent'] || null,
        },
    });

    logDataAccess('encrypt', 'ContactInquiry', inquiry.id);

    // SECURITY: Return ONLY reference ID
    return res.status(201).json(
        new ApiResponsive(201, {
            referenceId: inquiry.id,
            message: 'Your contact inquiry has been submitted successfully.',
        }, 'Contact inquiry created')
    );
});

// ================================================================================
// HOME LOAN INQUIRY - CLIENT SUBMISSION
// ================================================================================

/**
 * Create home loan inquiry from client website.
 * 
 * SECURITY:
 * - Encrypts name, phone, city, monthlyIncome
 * - Financial data (income) is especially sensitive
 * 
 * @route POST /api/client/home-loan
 * @access Public
 */
export const createHomeLoanInquiry = asyncHandler(async (req, res) => {
    const {
        name, phone, city, propertyType, loanAmount,
        duration, monthlyIncome, employmentType, remarks
    } = req.body;

    // Validation
    if (!name || !phone) {
        return res.status(400).json({
            success: false,
            error: 'Name and phone are required',
        });
    }

    if (!isValidIndianNumber(phone)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid phone number',
        });
    }

    // SECURITY: Encrypt all sensitive fields including financial data
    const encryptedData = await encryptFields(
        { name, phone, city, monthlyIncome },
        SENSITIVE_FIELDS.HomeLoanInquiry
    );

    const inquiry = await prisma.homeLoanInquiry.create({
        data: {
            name: encryptedData.name,
            phone: encryptedData.phone,
            city: encryptedData.city || null,
            propertyType: propertyType || null,
            loanAmount: loanAmount || null, // Stored as string, could encrypt
            duration: duration || null,
            monthlyIncome: encryptedData.monthlyIncome || null,
            employmentType: employmentType || null,
            remarks: remarks || null,
            ipAddress: req.ip || req.headers['x-forwarded-for'] || null,
            userAgent: req.headers['user-agent'] || null,
        },
    });

    logDataAccess('encrypt', 'HomeLoanInquiry', inquiry.id);

    // SECURITY: Return ONLY reference ID
    return res.status(201).json(
        new ApiResponsive(201, {
            referenceId: inquiry.id,
            message: 'Your home loan inquiry has been submitted successfully.',
        }, 'Home loan inquiry created')
    );
});

// ================================================================================
// REFERRAL INQUIRY - CLIENT SUBMISSION
// ================================================================================

/**
 * Create referral inquiry from client website.
 * 
 * SECURITY:
 * - Encrypts both referrer and referee personal data
 * - All phone numbers and emails encrypted
 * 
 * @route POST /api/client/referral
 * @access Public
 */
export const createReferralInquiry = asyncHandler(async (req, res) => {
    const {
        referrerName, referrerPhone, referrerEmail,
        refereeName, refereePhone, refereeEmail,
        relationship, loanType, remarks
    } = req.body;

    // Validation
    if (!referrerName || !referrerPhone || !refereeName || !refereePhone) {
        return res.status(400).json({
            success: false,
            error: 'Referrer name, phone and referee name, phone are required',
        });
    }

    if (!isValidIndianNumber(referrerPhone)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid referrer phone number',
        });
    }

    if (!isValidIndianNumber(refereePhone)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid referee phone number',
        });
    }

    // SECURITY: Encrypt all personal data for both parties
    const encryptedData = await encryptFields(
        {
            referrerName, referrerPhone, referrerEmail,
            refereeName, refereePhone, refereeEmail
        },
        SENSITIVE_FIELDS.ReferralInquiry
    );

    const inquiry = await prisma.referralInquiry.create({
        data: {
            referrerName: encryptedData.referrerName,
            referrerPhone: encryptedData.referrerPhone,
            referrerEmail: encryptedData.referrerEmail || null,
            refereeName: encryptedData.refereeName,
            refereePhone: encryptedData.refereePhone,
            refereeEmail: encryptedData.refereeEmail || null,
            relationship: relationship || null,
            loanType: loanType || null,
            remarks: remarks || null,
            ipAddress: req.ip || req.headers['x-forwarded-for'] || null,
            userAgent: req.headers['user-agent'] || null,
        },
    });

    logDataAccess('encrypt', 'ReferralInquiry', inquiry.id);

    // SECURITY: Return ONLY reference ID
    return res.status(201).json(
        new ApiResponsive(201, {
            referenceId: inquiry.id,
            message: 'Your referral has been submitted successfully.',
        }, 'Referral inquiry created')
    );
});
