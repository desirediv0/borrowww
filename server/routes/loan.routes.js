import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import {
    listLoans,
    getLoan,
    createLoan,
    createLoanByUser,
    updateLoan,
    deleteLoan,
    updateLoanStatus,
    getLoanStats,
    createLoanByPublic
} from "../controllers/loan.controller.js";
import { userAuth } from "../middleware/userAuth.js";

const router = express.Router();


router.use("/public", createLoanByPublic);

// List loans (admin only)
router.get("/", adminAuth, listLoans);
// Loan status summary (admin only) - must be before /:id
router.get("/stats", adminAuth, getLoanStats);
// Get loan by id
router.get("/:id", adminAuth, getLoan);
// Create loan (admin)
router.post("/", adminAuth, createLoan);
// Create loan (user)
router.post("/user", userAuth, createLoanByUser);
// Update loan
router.put("/:id", adminAuth, updateLoan);
// Delete loan
router.delete("/:id", adminAuth, deleteLoan);

// Update loan status by id
router.patch("/:id/status", adminAuth, updateLoanStatus);
// Update loan status by id (support both PATCH and PUT)
router.patch("/:id/status", adminAuth, updateLoanStatus);
router.put("/:id/status", adminAuth, updateLoanStatus);


export default router;
