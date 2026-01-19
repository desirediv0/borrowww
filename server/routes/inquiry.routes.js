import express from "express";
import {
    createCreditCheckInquiry,
    getAllCreditCheckInquiries,
    bulkDeleteCreditCheckInquiries,
    createContactInquiry,
    getAllContactInquiries,
    bulkDeleteContactInquiries,
    createHomeLoanInquiry,
    getAllHomeLoanInquiries,
    bulkDeleteHomeLoanInquiries,
    updateInquiryStatus,
    getDashboardStats,
} from "../controllers/inquiry.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// Public routes - Create inquiries
router.post("/credit-check", createCreditCheckInquiry);
router.post("/contact", createContactInquiry);
router.post("/home-loan", createHomeLoanInquiry);

// Admin routes - Get all inquiries
router.get("/credit-check", adminAuth, getAllCreditCheckInquiries);
router.get("/contact", adminAuth, getAllContactInquiries);
router.get("/home-loan", adminAuth, getAllHomeLoanInquiries);

// Admin routes - Bulk delete inquiries
router.delete("/credit-check/bulk", adminAuth, bulkDeleteCreditCheckInquiries);
router.delete("/contact/bulk", adminAuth, bulkDeleteContactInquiries);
router.delete("/home-loan/bulk", adminAuth, bulkDeleteHomeLoanInquiries);

// Admin routes - Update inquiry status
router.patch("/:type/:id/status", adminAuth, updateInquiryStatus);

// Admin routes - Dashboard stats
router.get("/dashboard/stats", adminAuth, getDashboardStats);

export default router;
