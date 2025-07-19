import express from "express";
import axios from "axios";
import { prisma } from "../../config/db.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponsive } from "../../utils/ApiResponsive.js";
import { isCibilDataValid, calculateCibilExpiry } from "../../utils/auth.js";
import {
  authenticate,
  adminOrUser,
  ownerOrAdmin,
  rateLimit,
} from "../../middleware/auth.js";

const router = express.Router();

// Apply rate limiting for CIBIL fetch (more restrictive)
router.use(rateLimit(5, 60 * 60 * 1000)); // 5 requests per hour

/**
 * Simulate third-party CIBIL API call
 * In production, replace with actual CIBIL API integration
 */
const fetchCibilFromThirdParty = async (panNumber) => {
  try {
    // This is a mock implementation
    // Replace with actual CIBIL API integration

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock response based on PAN pattern for demo
    const mockScore = Math.floor(Math.random() * (850 - 300) + 300);
    const mockData = {
      panNumber,
      score: mockScore,
      status: "SUCCESS",
      reportData: {
        personalInfo: {
          name: "Sample User",
          dateOfBirth: "1990-01-01",
          gender: "M",
          panNumber,
        },
        accounts: [
          {
            accountType: "Credit Card",
            bank: "Sample Bank",
            currentBalance: Math.floor(Math.random() * 100000),
            creditLimit: Math.floor(Math.random() * 500000),
            paymentHistory: "Regular",
          },
          {
            accountType: "Personal Loan",
            bank: "Another Bank",
            currentBalance: Math.floor(Math.random() * 200000),
            originalAmount: Math.floor(Math.random() * 500000),
            paymentHistory: "Regular",
          },
        ],
        inquiries: [
          {
            date: new Date().toISOString(),
            purpose: "Credit Card",
            inquiredBy: "Sample Bank",
          },
        ],
        summary: {
          totalAccounts: 2,
          activeAccounts: 2,
          totalCreditLimit: 500000,
          totalCurrentBalance: 50000,
          oldestAccount: "2018-01-01",
          creditUtilization: 10,
        },
      },
      fetchedAt: new Date().toISOString(),
    };

    return mockData;
  } catch (error) {
    throw new Error("Failed to fetch CIBIL data from third-party API");
  }
};

/**
 * @route POST /api/cibil/fetch
 * @desc Fetch CIBIL data for a user (with 28-day caching)
 * @access Private
 */
router.post(
  "/fetch",
  authenticate,
  adminOrUser,
  asyncHandler(async (req, res) => {
    const { panNumber, userId } = req.body;

    if (!panNumber) {
      throw new ApiError(400, "PAN number is required");
    }

    // Validate PAN format (basic validation)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNumber)) {
      throw new ApiError(400, "Invalid PAN number format");
    }

    // Determine user ID (admin can fetch for any user, user can only fetch for themselves)
    let targetUserId =
      req.user.userType === "ADMIN" ? userId || req.user.id : req.user.id;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    try {
      // Check for existing CIBIL data within 28 days
      const existingCibilData = await prisma.cibilData.findFirst({
        where: {
          userId: targetUserId,
          panNumber,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      // If valid cached data exists, return it
      if (existingCibilData && isCibilDataValid(existingCibilData)) {
        return res.status(200).json(
          new ApiResponsive(
            200,
            {
              cibilData: existingCibilData,
              cached: true,
              expiresAt: existingCibilData.expiresAt,
            },
            "CIBIL data retrieved from cache"
          )
        );
      }

      // Fetch fresh data from third-party API
      const thirdPartyData = await fetchCibilFromThirdParty(panNumber);

      // Calculate expiry date (28 days from now)
      const expiresAt = calculateCibilExpiry();

      // Save new CIBIL data
      const cibilData = await prisma.cibilData.create({
        data: {
          userId: targetUserId,
          panNumber,
          score: thirdPartyData.score,
          source: "Third Party API",
          reportData: thirdPartyData.reportData,
          status: "SUBMITTED",
          fetchedAt: new Date(),
          expiresAt,
        },
      });

      res.status(200).json(
        new ApiResponsive(
          200,
          {
            cibilData,
            cached: false,
            expiresAt,
          },
          "CIBIL data fetched successfully"
        )
      );
    } catch (error) {
      console.error("CIBIL fetch error:", error);

      // Create failed entry for tracking
      await prisma.cibilData.create({
        data: {
          userId: targetUserId,
          panNumber,
          source: "Third Party API",
          status: "FAILED",
          fetchedAt: new Date(),
        },
      });

      throw new ApiError(
        500,
        "Failed to fetch CIBIL data. Please try again later."
      );
    }
  })
);

/**
 * @route GET /api/cibil/user/:userId
 * @desc Get all CIBIL data for a specific user
 * @access Private (Admin or Owner)
 */
router.get(
  "/user/:userId",
  authenticate,
  ownerOrAdmin("userId"),
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { status, limit = 10, offset = 0 } = req.query;

    const whereClause = { userId };
    if (status) {
      whereClause.status = status;
    }

    const cibilData = await prisma.cibilData.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      take: parseInt(limit),
      skip: parseInt(offset),
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    const total = await prisma.cibilData.count({
      where: whereClause,
    });

    res.status(200).json(
      new ApiResponsive(
        200,
        {
          cibilData,
          pagination: {
            total,
            limit: parseInt(limit),
            offset: parseInt(offset),
            hasMore: parseInt(offset) + parseInt(limit) < total,
          },
        },
        "CIBIL data retrieved successfully"
      )
    );
  })
);

/**
 * @route GET /api/cibil/:id
 * @desc Get specific CIBIL data by ID
 * @access Private
 */
router.get(
  "/:id",
  authenticate,
  adminOrUser,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const cibilData = await prisma.cibilData.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    if (!cibilData) {
      throw new ApiError(404, "CIBIL data not found");
    }

    // Check if user can access this data
    if (req.user.userType !== "ADMIN" && cibilData.userId !== req.user.id) {
      throw new ApiError(403, "Access denied");
    }

    res
      .status(200)
      .json(
        new ApiResponsive(
          200,
          { cibilData },
          "CIBIL data retrieved successfully"
        )
      );
  })
);

/**
 * @route PUT /api/cibil/:id/status
 * @desc Update CIBIL data status (Admin only)
 * @access Private/Admin
 */
router.put(
  "/:id/status",
  authenticate,
  asyncHandler(async (req, res) => {
    if (req.user.userType !== "ADMIN") {
      throw new ApiError(403, "Only admins can update CIBIL data status");
    }

    const { id } = req.params;
    const { status } = req.body;

    if (
      !status ||
      !["SUBMITTED", "UNSUBMITTED", "PROCESSING", "FAILED"].includes(status)
    ) {
      throw new ApiError(400, "Valid status is required");
    }

    const cibilData = await prisma.cibilData.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    res
      .status(200)
      .json(
        new ApiResponsive(
          200,
          { cibilData },
          "CIBIL data status updated successfully"
        )
      );
  })
);

/**
 * @route GET /api/cibil/search
 * @desc Search CIBIL data (Admin only)
 * @access Private/Admin
 */
router.get(
  "/search",
  authenticate,
  asyncHandler(async (req, res) => {
    if (req.user.userType !== "ADMIN") {
      throw new ApiError(403, "Only admins can search CIBIL data");
    }

    const {
      panNumber,
      phone,
      email,
      status,
      minScore,
      maxScore,
      limit = 20,
      offset = 0,
    } = req.query;

    const whereClause = {};

    if (panNumber) {
      whereClause.panNumber = { contains: panNumber, mode: "insensitive" };
    }

    if (status) {
      whereClause.status = status;
    }

    if (minScore || maxScore) {
      whereClause.score = {};
      if (minScore) whereClause.score.gte = parseInt(minScore);
      if (maxScore) whereClause.score.lte = parseInt(maxScore);
    }

    if (phone || email) {
      whereClause.user = {};
      if (phone)
        whereClause.user.phone = { contains: phone, mode: "insensitive" };
      if (email)
        whereClause.user.email = { contains: email, mode: "insensitive" };
    }

    const cibilData = await prisma.cibilData.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      take: parseInt(limit),
      skip: parseInt(offset),
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    const total = await prisma.cibilData.count({
      where: whereClause,
    });

    res.status(200).json(
      new ApiResponsive(
        200,
        {
          cibilData,
          pagination: {
            total,
            limit: parseInt(limit),
            offset: parseInt(offset),
            hasMore: parseInt(offset) + parseInt(limit) < total,
          },
        },
        "CIBIL data search completed"
      )
    );
  })
);

/**
 * @route DELETE /api/cibil/:id
 * @desc Delete CIBIL data (Admin only)
 * @access Private/Admin
 */
router.delete(
  "/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    if (req.user.userType !== "ADMIN") {
      throw new ApiError(403, "Only admins can delete CIBIL data");
    }

    const { id } = req.params;

    const cibilData = await prisma.cibilData.findUnique({
      where: { id },
    });

    if (!cibilData) {
      throw new ApiError(404, "CIBIL data not found");
    }

    await prisma.cibilData.delete({
      where: { id },
    });

    res
      .status(200)
      .json(new ApiResponsive(200, null, "CIBIL data deleted successfully"));
  })
);

export default router;
