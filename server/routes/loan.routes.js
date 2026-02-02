import express from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
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
router.get("/", isAdmin, listLoans);
// Loan status summary (admin only) - must be before /:id
router.get("/stats", isAdmin, getLoanStats);
// Get loan by id
router.get("/:id", isAdmin, getLoan);
// Create loan (admin)
router.post("/", isAdmin, createLoan);
// Create loan (user)
router.post("/user", userAuth, createLoanByUser);
// Update loan
router.put("/:id", isAdmin, updateLoan);
// Delete loan
router.delete("/:id", isAdmin, deleteLoan);

// Update loan status by id
router.patch("/:id/status", isAdmin, updateLoanStatus);
// Update loan status by id (support both PATCH and PUT)
router.patch("/:id/status", isAdmin, updateLoanStatus);
router.put("/:id/status", isAdmin, updateLoanStatus);


export default router;
