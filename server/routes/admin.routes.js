import express from "express";
import { registerAdmin, loginAdmin, getAdminProfile, verifyAdminToken, getComprehensiveDashboard } from "../controllers/admin.controller.js";
// Verify token (for frontend auth check)
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/auth/verify-token", verifyAdminToken);
// Register
router.post("/register", registerAdmin);
// Login
router.post("/login", loginAdmin);
// Profile (protected)
// Dashboard comprehensive stats (protected)

router.get("/dashboard/comprehensive", adminAuth, getComprehensiveDashboard);

router.get("/profile", adminAuth, getAdminProfile);

export default router;
