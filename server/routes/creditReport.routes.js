import express from 'express';
import * as creditReportController from '../controllers/creditReport.controller.js';
import { userAuth } from '../middleware/userAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// User routes
router.get('/check-cache', userAuth, asyncHandler(creditReportController.checkCache));
router.post('/session', userAuth, asyncHandler(creditReportController.getSession));
router.post('/fetch', userAuth, asyncHandler(creditReportController.fetchReport));
router.get('/my-report', userAuth, asyncHandler(creditReportController.getMyReport));
router.get('/pdf', userAuth, asyncHandler(creditReportController.getMyPdf));

// Admin routes
router.get('/admin/stats', isAdmin, asyncHandler(creditReportController.getAdminStats));
router.get('/admin/all', isAdmin, asyncHandler(creditReportController.getAllReportsAdmin));
router.get('/admin/:id', isAdmin, asyncHandler(creditReportController.getReportDetailAdmin));

export default router;
