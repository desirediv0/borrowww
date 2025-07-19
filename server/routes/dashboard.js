import express from "express";
import { authenticateAdmin } from "../middleware/auth.js";
import {
  getDashboardStats,
  getActivityOverview,
  getRecentUsers,
  getLoanDistribution,
  getCibilDistribution,
  getComprehensiveDashboard,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

/**
 * Dashboard Routes (Admin only)
 */

// Get comprehensive dashboard data
router.get("/comprehensive", authenticateAdmin, getComprehensiveDashboard);

// Get dashboard statistics
router.get("/stats", authenticateAdmin, getDashboardStats);

// Get activity overview for last 7 days
router.get("/activity", authenticateAdmin, getActivityOverview);

// Get recent users
router.get("/recent-users", authenticateAdmin, getRecentUsers);

// Get loan distribution
router.get("/loan-distribution", authenticateAdmin, getLoanDistribution);

// Get CIBIL distribution
router.get("/cibil-distribution", authenticateAdmin, getCibilDistribution);

export default router;
