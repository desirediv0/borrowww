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

const router = express.Router();

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
