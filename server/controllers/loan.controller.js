
import { prisma } from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { asyncHandler } from "../utils/asyncHandler.js";






export const createLoanByPublic = asyncHandler(async (req, res) => {
    const loan = await prisma.loan.create({ data: req.body });
    res.status(201).json(new ApiResponsive(201, { loan }, "Loan created"));
});


// List loans with pagination
export const listLoans = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter
    const where = {};
    if (req.query.status && req.query.status.toLowerCase() !== 'all') {
        where.status = req.query.status.toUpperCase();
    }
    if (req.query.type && req.query.type.toLowerCase() !== 'all') {
        where.type = req.query.type.toUpperCase();
    }
    if (req.query.purpose && req.query.purpose.toLowerCase() !== 'all') {
        where.purpose = req.query.purpose;
    }




    const [loans, total] = await Promise.all([
        prisma.loan.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
        prisma.loan.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json(new ApiResponsive(200, {
        loans,
        total,
        page,
        limit,
        pagination: {
            total,
            page,
            limit,
            pages: totalPages,
        }
    }, "Loans fetched"));
});

// Get loan by id
export const getLoan = asyncHandler(async (req, res) => {
    const loan = await prisma.loan.findUnique({ where: { id: req.params.id } });
    if (!loan) throw new ApiError(404, "Loan not found");
    res.json(new ApiResponsive(200, { loan }, "Loan fetched"));
});

// Create loan (admin)
export const createLoan = asyncHandler(async (req, res) => {
    const loan = await prisma.loan.create({ data: req.body });
    res.status(201).json(new ApiResponsive(201, { loan }, "Loan created"));
});

// Create loan (user)
export const createLoanByUser = asyncHandler(async (req, res) => {
    // req.user is set by userAuth middleware
    if (!req.user || !req.user.id) throw new ApiError(401, "Not authorized");
    const data = { ...req.body, userId: req.user.id };
    const loan = await prisma.loan.create({ data });
    res.status(201).json(new ApiResponsive(201, { loan }, "Loan created"));
});

// Update loan
export const updateLoan = asyncHandler(async (req, res) => {
    const loan = await prisma.loan.update({ where: { id: req.params.id }, data: req.body });
    res.json(new ApiResponsive(200, { loan }, "Loan updated"));
});

// Delete loan
export const deleteLoan = asyncHandler(async (req, res) => {
    await prisma.loan.delete({ where: { id: req.params.id } });
    res.json(new ApiResponsive(200, {}, "Loan deleted"));
});


// Update loan status by id
export const updateLoanStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    if (!status) throw new ApiError(400, "Status is required");
    const loan = await prisma.loan.update({
        where: { id: req.params.id },
        data: { status },
    });
    res.json(new ApiResponsive(200, { loan }, "Loan status updated"));
});

// Loan status summary API
export const getLoanStats = asyncHandler(async (req, res) => {
    const statuses = ['PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW', 'DISBURSED', 'CLOSED'];
    const counts = {};
    for (const status of statuses) {
        counts[status] = await prisma.loan.count({ where: { status } });
    }
    const total = await prisma.loan.count();
    res.json(new ApiResponsive(200, { total, ...counts }, "Loan status summary"));
});