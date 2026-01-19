import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { listUserLoans, createUserLoan } from "../controllers/userLoan.controller.js";

const router = express.Router();

// List user's own loans
router.get("/", userAuth, listUserLoans);
// User applies for a loan
router.post("/", userAuth, createUserLoan);

export default router;
