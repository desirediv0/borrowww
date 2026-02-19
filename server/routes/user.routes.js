import express from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
    listUsers, getUser, updateUser, deleteUser, bulkDeleteUsers,
    registerUser, sendOtp, verifyOtp, getUserProfile, getFullUserProfile, updateUserSelf,
    changePhone, verifyPhoneChange, logoutUser, getMe
} from "../controllers/user.controller.js";
import { retryOtp } from "../controllers/user.controller.js";
import { userAuth } from "../middleware/userAuth.js";
import { getUserDetails } from "../controllers/user.controller.js";

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
router.get("/me", userAuth, getMe);
router.post("/logout", logoutUser);
// Full user profile (user info, last CIBIL, all loans)
router.get("/profile/full", userAuth, getFullUserProfile);

// Get user by id (keep parameterized routes last)
router.get("/:id", isAdmin, getUser);
router.put("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);

export default router;

