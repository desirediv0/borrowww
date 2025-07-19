import express from "express";
import {
  authenticate,
  authenticateAdmin,
  adminOrUser,
} from "../../middleware/auth.js";
import {
  getAllLoans,
  applyForLoan,
  getUserLoans,
  updateLoanStatus,
  getLoanStats,
  getLoanById,
  getLoanTypeDistribution,
  getRecentLoans,
  updateLoan,
  deleteLoan,
} from "../../controllers/loan.controller.js";

const router = express.Router();

/**
 * Loan Management Routes
 */

// Get all loans (Admin only)
router.get("/", authenticateAdmin, getAllLoans);

// Get loan statistics (Admin only)
router.get("/stats", authenticateAdmin, getLoanStats);

// Get loan type distribution (Admin only)
router.get("/type-distribution", authenticateAdmin, getLoanTypeDistribution);

// Get recent loans (Admin only)
router.get("/recent", authenticateAdmin, getRecentLoans);

// Get specific loan by ID (Admin only)
router.get("/:id", authenticateAdmin, getLoanById);

// Apply for loan (Authenticated users)
router.post("/apply", authenticate, applyForLoan);

// Get user's loans (Authenticated users)
router.get("/my-loans", authenticate, getUserLoans);

// Update loan status (Admin only)
router.put("/:id/status", authenticateAdmin, updateLoanStatus);

// Update loan (Admin only)
router.put("/:id", authenticateAdmin, updateLoan);

// Delete loan (Admin only)
router.delete("/:id", authenticateAdmin, deleteLoan);

export default router;
