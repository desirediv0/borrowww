import express from "express";
import {
    createReferralInquiry,
    getAllReferralInquiries,
    bulkDeleteReferralInquiries,
    updateReferralStatus,
    getReferralStats,
} from "../controllers/referral.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

// Public routes - Create referral
router.post("/", createReferralInquiry);

// Admin routes - Get all referrals
router.get("/", isAdmin, getAllReferralInquiries);

// Admin routes - Get referral stats
router.get("/stats", isAdmin, getReferralStats);

// Admin routes - Bulk delete referrals
router.delete("/bulk", isAdmin, bulkDeleteReferralInquiries);

// Admin routes - Update referral status
router.patch("/:id/status", isAdmin, updateReferralStatus);

export default router;
