import { prisma } from "../config/db.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// User: List own loans
export const listUserLoans = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const loans = await prisma.loan.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
    res.json(new ApiResponsive(200, { loans }, "User loans fetched"));
});

// User: Create loan
export const createUserLoan = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const loan = await prisma.loan.create({
        data: { ...req.body, userId },
    });
    res.status(201).json(new ApiResponsive(201, { loan }, "Loan application submitted"));
});
