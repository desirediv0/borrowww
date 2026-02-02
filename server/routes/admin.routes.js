/**
 * ================================================================================
 * ADMIN ROUTES - PROTECTED WITH SESSION AUTH
 * ================================================================================
 * 
 * SECURITY:
 * - All routes except login are protected by isAdmin middleware
 * - Session-based authentication with HTTP-only cookies
 * - All data access is logged for audit compliance
 * 
 * ================================================================================
 */

import express from 'express';
import {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    verifyAdminSession,
    getAdminProfile,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
    getAllCreditCheckInquiries,
    getAllContactInquiries,
    getAllHomeLoanInquiries,
    getAllReferralInquiries,
    softDeleteCreditCheckInquiries,
    softDeleteContactInquiries,
    softDeleteHomeLoanInquiries,
    softDeleteReferralInquiries,
    updateInquiryStatus,
    getComprehensiveDashboard,
} from '../controllers/admin.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { prodSafety } from '../middlewares/prodSafety.js';

const router = express.Router();

// ================================================================================
// PUBLIC ROUTES (No Auth)
// ================================================================================

/**
 * @route POST /api/admin/login
 * @desc Admin login - creates session
 * @access Public
 */
router.post('/login', loginAdmin);

// ================================================================================
// PROTECTED ROUTES (Session Auth Required)
// ================================================================================

// Apply isAdmin middleware to all routes below
router.use(isAdmin);

// Apply production safety middleware
router.use(prodSafety);

// --- Auth ---
/**
 * @route POST /api/admin/logout
 * @desc Admin logout - destroys session
 * @access Protected
 */
router.post('/logout', logoutAdmin);

/**
 * @route GET /api/admin/auth/verify
 * @desc Verify admin session is valid
 * @access Protected
 */
router.get('/auth/verify', verifyAdminSession);

/**
 * @route POST /api/admin/register
 * @desc Register new admin (super admin only)
 * @access Protected
 */
router.post('/register', registerAdmin);

/**
 * @route GET /api/admin/profile
 * @desc Get admin profile
 * @access Protected
 */
router.get('/profile', getAdminProfile);

// --- Dashboard ---
/**
 * @route GET /api/admin/dashboard/comprehensive
 * @desc Get comprehensive dashboard stats
 * @access Protected
 */
router.get('/dashboard/comprehensive', getComprehensiveDashboard);

// --- User Management ---
/**
 * @route GET /api/admin/users
 * @desc List all users with decrypted data
 * @access Protected
 */
router.get('/users', listUsers);

/**
 * @route GET /api/admin/users/:id
 * @desc Get single user with decrypted data
 * @access Protected
 */
router.get('/users/:id', getUser);

/**
 * @route PUT /api/admin/users/:id
 * @desc Update user
 * @access Protected
 */
router.put('/users/:id', updateUser);

/**
 * @route DELETE /api/admin/users/:id
 * @desc Soft delete user
 * @access Protected
 */
router.delete('/users/:id', deleteUser);

// --- Inquiry Management ---
/**
 * Credit Check Inquiries
 */
router.get('/inquiries/credit-check', getAllCreditCheckInquiries);
router.post('/inquiries/credit-check/soft-delete', softDeleteCreditCheckInquiries);

/**
 * Contact Inquiries
 */
router.get('/inquiries/contact', getAllContactInquiries);
router.post('/inquiries/contact/soft-delete', softDeleteContactInquiries);

/**
 * Home Loan Inquiries
 */
router.get('/inquiries/home-loan', getAllHomeLoanInquiries);
router.post('/inquiries/home-loan/soft-delete', softDeleteHomeLoanInquiries);

/**
 * Referral Inquiries
 */
router.get('/inquiries/referral', getAllReferralInquiries);
router.post('/inquiries/referral/soft-delete', softDeleteReferralInquiries);

/**
 * Update Inquiry Status (all types)
 */
router.patch('/inquiries/:type/:id/status', updateInquiryStatus);

export default router;
