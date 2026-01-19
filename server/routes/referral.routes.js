import express from "express";
import {
    createReferralInquiry,
    getAllReferralInquiries,
    bulkDeleteReferralInquiries,
    updateReferralStatus,
    getReferralStats,
} from "../controllers/referral.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// Public routes - Create referral
router.post("/", createReferralInquiry);

// Admin routes - Get all referrals
router.get("/", adminAuth, getAllReferralInquiries);

// Admin routes - Get referral stats
router.get("/stats", adminAuth, getReferralStats);

// Admin routes - Bulk delete referrals
router.delete("/bulk", adminAuth, bulkDeleteReferralInquiries);

// Admin routes - Update referral status
router.patch("/:id/status", adminAuth, updateReferralStatus);

export default router;
