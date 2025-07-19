import express from "express";
import { authenticate } from "../../middleware/auth.js";
import {
  registerUser,
  loginUser,
  sendOtp,
  refreshToken,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../../controllers/auth/userAuth.controller.js";

const router = express.Router();

/**
 * User Authentication Routes
 */

// Register new user (Phone-based)
router.post("/register", registerUser);

// Send OTP for registration/login
router.post("/send-otp", sendOtp);

// Login user (Phone + OTP based)
router.post("/login", loginUser);

// Refresh access token
router.post("/refresh", refreshToken);

// Logout user
router.post("/logout", logoutUser);

// Get current user profile (Protected)
router.get("/profile", authenticate, getUserProfile);

// Update user profile (Protected)
router.put("/profile", authenticate, updateUserProfile);

// Change password (Protected)
router.put("/change-password", authenticate, changePassword);

export default router;
