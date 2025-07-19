import express from "express";
import { authenticateAdmin } from "../../middleware/auth.js";
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
  refreshAdminToken,
  createAdmin,
  getAdminDashboardStats,
  updateAdminProfile,
  changeAdminPassword,
  verifyAdminTokenController,
} from "../../controllers/auth/adminAuth.controller.js";

const router = express.Router();

/**
 * Admin Authentication Routes
 */

// Admin login (Email + Password)
router.post("/login", adminLogin);

// Verify admin token
router.get("/verify-token", verifyAdminTokenController);

// Admin logout
router.post("/logout", adminLogout);

// Get admin profile (Protected)
router.get("/profile", authenticateAdmin, getAdminProfile);

// Update admin profile (Protected)
router.put("/profile", authenticateAdmin, updateAdminProfile);

// Change admin password (Protected)
router.put("/change-password", authenticateAdmin, changeAdminPassword);

// Refresh admin token
router.post("/refresh", refreshAdminToken);

// Create new admin (Protected - Super Admin only)
router.post("/create-admin", createAdmin);

// Get dashboard statistics (Protected)
router.get("/dashboard-stats", authenticateAdmin, getAdminDashboardStats);

export default router;
