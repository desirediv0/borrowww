import express from "express";
import { authenticateAdmin } from "../middleware/auth.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
  bulkUpdateUsers,
  searchUsers,
  getUserDetails,
  getUserActivity,
} from "../controllers/user.controller.js";

const router = express.Router();

/**
 * User Management Routes (Admin Only)
 */

// Get all users with pagination and search
router.get("/", authenticateAdmin, getAllUsers);

// Get user statistics
router.get("/stats", authenticateAdmin, getUserStats);

// Search users
router.get("/search", authenticateAdmin, searchUsers);

// Get specific user by ID
router.get("/:id", authenticateAdmin, getUserById);

// Get user details with CIBIL and loan summary
router.get("/:id/details", authenticateAdmin, getUserDetails);

// Get user activity
router.get("/:id/activity", authenticateAdmin, getUserActivity);

// Update user
router.put("/:id", authenticateAdmin, updateUser);

// Delete user
router.delete("/:id", authenticateAdmin, deleteUser);

// Bulk update users
router.put("/bulk-update", authenticateAdmin, bulkUpdateUsers);

export default router;
