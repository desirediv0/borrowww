import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import {
    listUsers, getUser, updateUser, deleteUser, bulkDeleteUsers,
    registerUser, sendOtp, verifyOtp, getUserProfile, getFullUserProfile, updateUserSelf,
    changePhone, verifyPhoneChange
} from "../controllers/user.controller.js";
import { retryOtp } from "../controllers/user.controller.js";
import { userAuth } from "../middleware/userAuth.js";
import { getUserDetails } from "../controllers/user.controller.js";

const router = express.Router();

// List users (admin only)
router.get("/", adminAuth, listUsers);
// Get user by id
router.get("/:id", adminAuth, getUser);

// Get user details (admin only)


router.get("/:id/details", adminAuth, getUserDetails);
// User self-update (user can update their own profile)
router.put("/profile", userAuth, updateUserSelf);
router.patch("/profile", userAuth, updateUserSelf);
// Update user
router.put("/:id", adminAuth, updateUser);
// Delete user
router.delete("/:id", adminAuth, deleteUser);
// Bulk delete users (admin only)
router.delete("/bulk/delete", adminAuth, bulkDeleteUsers);

// User registration and OTP
router.post("/register", registerUser);
router.post("/send-otp", sendOtp);
router.post("/retry-otp", retryOtp);
router.post("/verify-otp", verifyOtp);

// Phone number change (authenticated user)
router.post("/change-phone", userAuth, changePhone);
router.post("/verify-phone-change", userAuth, verifyPhoneChange);

// User profile (protected)
router.get("/profile", userAuth, getUserProfile);
// Full user profile (user info, last CIBIL, all loans)
router.get("/profile/full", userAuth, getFullUserProfile);

export default router;

