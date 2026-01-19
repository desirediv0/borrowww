

import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";

const generateToken = (admin) => {
    return jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// Admin Register
export const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
        throw new ApiError(409, "Admin already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
        data: { email, password: hashedPassword, name },
    });
    res.status(201).json(new ApiResponsive(201, { id: admin.id, email: admin.email, name: admin.name }, "Admin registered successfully"));
});

// Admin Login
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
        throw new ApiError(401, "Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }
    const token = generateToken(admin);
    await prisma.admin.update({ where: { id: admin.id }, data: { lastLogin: new Date(), accessToken: token } });
    res.status(200).json(new ApiResponsive(200, { token, admin: { id: admin.id, email: admin.email, name: admin.name } }, "Login successful"));
});

// Admin Profile
export const getAdminProfile = asyncHandler(async (req, res) => {
    const admin = req.admin;
    res.status(200).json(new ApiResponsive(200, { id: admin.id, email: admin.email, name: admin.name }, "Profile fetched"));
});

// Verify Admin Token (for frontend auth check)
export const verifyAdminToken = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "No token provided");
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid or expired token");
    }
    const admin = await prisma.admin.findUnique({ where: { id: decoded.id } });
    if (!admin || !admin.isActive) {
        throw new ApiError(401, "Not authorized as admin");
    }
    res.status(200).json(new ApiResponsive(200, { admin: { id: admin.id, email: admin.email, name: admin.name } }, "Token valid"));
});


// --- Admin User Management ---
export const listUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
        prisma.user.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
        prisma.user.count(),
    ]);
    res.json(new ApiResponsive(200, { users, total, page, limit }, "Users fetched"));
});

export const getUser = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) throw new ApiError(404, "User not found");
    res.json(new ApiResponsive(200, { user }, "User fetched"));
});

export const updateUser = asyncHandler(async (req, res) => {
    const user = await prisma.user.update({ where: { id: req.params.id }, data: req.body });
    res.json(new ApiResponsive(200, { user }, "User updated"));
});

export const deleteUser = asyncHandler(async (req, res) => {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json(new ApiResponsive(200, null, "User deleted"));
});

// Admin Dashboard: Comprehensive stats and data
export const getComprehensiveDashboard = asyncHandler(async (req, res) => {
    // Stats
    const [
        totalUsers,
        totalCibilReports,
        totalLoans,
        pendingLoans,
        activeUsers,
        newUsersToday,
        cibilSubmissionsToday,
        loanApplicationsToday
    ] = await Promise.all([
        prisma.user.count(),
        prisma.cibilData.count(),
        prisma.loan.count(),
        prisma.loan.count({ where: { status: 'PENDING' } }),
        prisma.user.count({ where: { isVerified: true } }),
        prisma.user.count({ where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
        prisma.cibilData.count({ where: { isSubmitted: true, createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
        prisma.loan.count({ where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } })
    ]);

    // Recent users (last 5)
    const recentUsers = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
            id: true,
            phoneNumber: true,
            firstName: true,
            lastName: true,
            lastLogin: true,
            isVerified: true,
            createdAt: true,
        }
    });

    // Loan distribution by status
    const loanDistribution = await prisma.loan.groupBy({
        by: ['status'],
        _count: { status: true }
    });

    // CIBIL distribution
    const submitted = await prisma.cibilData.count({ where: { isSubmitted: true } });
    const unsubmitted = await prisma.cibilData.count({ where: { isSubmitted: false } });
    const cibilDistribution = { submitted, unsubmitted };

    // Activity data for last 7 days
    const today = new Date();
    const days = 7;
    const activityData = [];
    for (let i = days - 1; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        const start = new Date(day.setHours(0, 0, 0, 0));
        const end = new Date(day.setHours(23, 59, 59, 999));
        const users = await prisma.user.count({ where: { createdAt: { gte: start, lte: end } } });
        const cibilChecks = await prisma.cibilData.count({ where: { createdAt: { gte: start, lte: end } } });
        const loans = await prisma.loan.count({ where: { createdAt: { gte: start, lte: end } } });
        activityData.push({ date: start, users, cibilChecks, loans });
    }

    res.json(new ApiResponsive(200, {
        stats: {
            totalUsers,
            totalCibilReports,
            totalLoans,
            pendingLoans,
            activeUsers,
            newUsersToday,
            cibilSubmissionsToday,
            loanApplicationsToday
        },
        recentUsers,
        loanDistribution,
        cibilDistribution,
        activityData
    }, "Comprehensive dashboard data fetched"));
});
