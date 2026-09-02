/**
 * ================================================================================
 * CLIENT ROUTES - PUBLIC FORM SUBMISSIONS
 * ================================================================================
 * 
 * SECURITY:
 * - These routes are PUBLIC (no authentication required)
 * - All data is ENCRYPTED before storage
 * - NO decryption on these routes
 * - Only reference ID returned to client
 * 
 * ================================================================================
 */

import express from 'express';
import {
    createCreditCheckInquiry,
    createContactInquiry,
    createHomeLoanInquiry,
    createReferralInquiry,
} from '../controllers/client.controller.js';
import { rateLimit } from '../utils/rateLimiter.js';

const router = express.Router();

// SECURITY: public form endpoints — cap submissions per IP to stop spam / flooding.
const formLimiter = rateLimit({
    max: 20,
    windowMs: 60 * 60 * 1000,
    keyPrefix: 'client-form',
    message: 'Too many submissions. Please try again later.',
});
router.use(formLimiter);

// ================================================================================
// PUBLIC ROUTES - Client Website Submissions
// ================================================================================

/**
 * @route POST /api/client/credit-check
 * @desc Submit credit check inquiry (encrypted storage)
 * @access Public
 */
router.post('/credit-check', createCreditCheckInquiry);

/**
 * @route POST /api/client/contact
 * @desc Submit contact inquiry (encrypted storage)
 * @access Public
 */
router.post('/contact', createContactInquiry);

/**
 * @route POST /api/client/home-loan
 * @desc Submit home loan inquiry (encrypted storage)
 * @access Public
 */
router.post('/home-loan', createHomeLoanInquiry);

/**
 * @route POST /api/client/referral
 * @desc Submit referral inquiry (encrypted storage)
 * @access Public
 */
router.post('/referral', createReferralInquiry);

export default router;
