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
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

// Public routes - Create inquiries
router.post("/credit-check", createCreditCheckInquiry);
router.post("/contact", createContactInquiry);
router.post("/home-loan", createHomeLoanInquiry);

// Admin routes - Get all inquiries
router.get("/credit-check", isAdmin, getAllCreditCheckInquiries);
router.get("/contact", isAdmin, getAllContactInquiries);
router.get("/home-loan", isAdmin, getAllHomeLoanInquiries);

// Admin routes - Bulk delete inquiries
router.delete("/credit-check/bulk", isAdmin, bulkDeleteCreditCheckInquiries);
router.delete("/contact/bulk", isAdmin, bulkDeleteContactInquiries);
router.delete("/home-loan/bulk", isAdmin, bulkDeleteHomeLoanInquiries);

// Admin routes - Update inquiry status
router.patch("/:type/:id/status", isAdmin, updateInquiryStatus);

// Admin routes - Dashboard stats
router.get("/dashboard/stats", isAdmin, getDashboardStats);

export default router;
