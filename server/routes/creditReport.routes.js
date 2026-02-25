import express from 'express';
import * as creditReportController from '../controllers/creditReport.controller.js';
import { userAuth } from '../middleware/userAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// ─── User Routes ──────────────────────────────────────────────────────────────
// All routes use userAuth — userId is always taken from req.user.id (JWT token).
// Never from req.body — prevents user_id spoofing.

router.get('/check-cache', userAuth, asyncHandler(creditReportController.checkCache));
router.post('/session', userAuth, asyncHandler(creditReportController.getSession));
router.post('/fetch', userAuth, asyncHandler(creditReportController.fetchReport));
router.get('/my-report', userAuth, asyncHandler(creditReportController.getMyReport));
router.get('/pdf', userAuth, asyncHandler(creditReportController.getMyPdf));              // Legacy URL endpoint

// SECURE: Streams PDF from DigitalOcean with proper Content-Type + auth
router.get('/download-pdf', userAuth, asyncHandler(creditReportController.downloadMyPdf));

// ─── Admin Routes ─────────────────────────────────────────────────────────────
router.get('/admin/stats', isAdmin, asyncHandler(creditReportController.getAdminStats));
router.get('/admin/all', isAdmin, asyncHandler(creditReportController.getAllReportsAdmin));
router.get('/admin/:id', isAdmin, asyncHandler(creditReportController.getReportDetailAdmin));

// SECURE: Admin streams any user's PDF — protected by isAdmin middleware
router.get('/admin/:id/download-pdf', isAdmin, asyncHandler(creditReportController.downloadAdminPdf));

export default router;
