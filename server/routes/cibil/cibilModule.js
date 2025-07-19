import express from "express";
import {
  authenticate,
  adminOrUser,
  rateLimit,
  authenticateAdmin,
} from "../../middleware/auth.js";
import {
  checkCibil,
  getCachedCibil,
  getSubmittedCibilData,
  getUnsubmittedCibilData,
  getCibilStats,
} from "../../controllers/cibil.controller.js";

const router = express.Router();

// Apply rate limiting for CIBIL operations
router.use(rateLimit(100, 60 * 60 * 1000)); // 100 requests per hour

/**
 * CIBIL Routes
 */

// Check CIBIL score (Authenticated users)
router.post("/check", authenticate, checkCibil);

// Get cached CIBIL data (Admin or owner)
router.get("/cached/:userId", authenticate, adminOrUser, getCachedCibil);

// Get submitted CIBIL data (Admin only)
router.get("/submitted", authenticateAdmin, getSubmittedCibilData);

// Get unsubmitted CIBIL data (Admin only)
router.get("/unsubmitted", authenticateAdmin, getUnsubmittedCibilData);

// Get CIBIL statistics (Admin only)
router.get("/stats", authenticateAdmin, getCibilStats);

export default router;
