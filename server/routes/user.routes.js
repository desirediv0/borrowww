import express from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
    listUsers, getUser, updateUser, deleteUser, bulkDeleteUsers,
    sendOtp, verifyOtp, getUserProfile, getFullUserProfile, updateUserSelf,
    changePhone, verifyPhoneChange, logoutUser, getMe
} from "../controllers/user.controller.js";
import { retryOtp } from "../controllers/user.controller.js";
import { userAuth } from "../middleware/userAuth.js";
import { rateLimit } from "../utils/rateLimiter.js";
import { getUserDetails } from "../controllers/user.controller.js";

// Extra IP-level guard in front of the OTP endpoints (per-number limits live in the controller)
const otpIpLimiter = rateLimit({ max: 30, windowMs: 60 * 60 * 1000, keyPrefix: "otp-route", message: "Too many requests. Please try again later." });

const router = express.Router();

// List users (admin only)
router.get("/", isAdmin, listUsers);

// Get user details (admin only)


router.get("/:id/details", isAdmin, getUserDetails);
// User self-update (user can update their own profile)
router.put("/profile", userAuth, updateUserSelf);
router.patch("/profile", userAuth, updateUserSelf);
// Bulk delete users (admin only)
router.delete("/bulk/delete", isAdmin, bulkDeleteUsers);

// OTP-based login / registration (a user is created on first successful verify-otp)
router.post("/send-otp", otpIpLimiter, sendOtp);
router.post("/retry-otp", otpIpLimiter, retryOtp);
router.post("/verify-otp", otpIpLimiter, verifyOtp);

// Phone number change (authenticated user)
router.post("/change-phone", userAuth, changePhone);
router.post("/verify-phone-change", userAuth, verifyPhoneChange);

// User profile (protected)
router.get("/profile", userAuth, getUserProfile);
router.get("/me", userAuth, getMe);
router.post("/logout", logoutUser);
// Full user profile (user info, last CIBIL, all loans)
router.get("/profile/full", userAuth, getFullUserProfile);

// Get user by id (keep parameterized routes last)
router.get("/:id", isAdmin, getUser);
router.put("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);

export default router;

