import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";

/**
 * Simulate third-party CIBIL API call
 * Replace with actual CIBIL API integration in production
 */
const fetchCibilFromThirdParty = async (panNumber, phoneNumber) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock CIBIL score generation (300-850 range)
    const mockScore = Math.floor(Math.random() * (850 - 300) + 300);

    const mockData = {
      success: true,
      score: mockScore,
      reportData: {
        personalInfo: {
          panNumber: panNumber || "MOCK1234A",
          phoneNumber: phoneNumber || "+91XXXXXXXXXX",
          name: "Sample User",
          dateOfBirth: "1990-01-01",
        },
        creditSummary: {
          totalAccounts: Math.floor(Math.random() * 10) + 1,
          activeAccounts: Math.floor(Math.random() * 8) + 1,
          totalCreditLimit: Math.floor(Math.random() * 1000000) + 100000,
          totalCurrentBalance: Math.floor(Math.random() * 500000),
          paymentHistory:
            mockScore > 700 ? "Excellent" : mockScore > 600 ? "Good" : "Fair",
        },
        accounts: [
          {
            accountType: "Credit Card",
            bankName: "Sample Bank",
            accountStatus: "Active",
            currentBalance: Math.floor(Math.random() * 100000),
            creditLimit: Math.floor(Math.random() * 200000) + 50000,
          },
          {
            accountType: "Personal Loan",
            bankName: "Another Bank",
            accountStatus: "Closed",
            currentBalance: 0,
            originalAmount: Math.floor(Math.random() * 300000) + 100000,
          },
        ],
      },
    };

    return mockData;
  } catch (error) {
    console.error("CIBIL API Error:", error);
    throw new ApiError(500, "Failed to fetch CIBIL data from third-party API");
  }
};

/**
 * Check if cached CIBIL data exists and is still valid (within 28 days)
 */
const getCachedCibilData = async (userId) => {
  const cacheExpiryDays = parseInt(process.env.CIBIL_CACHE_DURATION_DAYS) || 28;
  const cacheExpiryDate = new Date();
  cacheExpiryDate.setDate(cacheExpiryDate.getDate() - cacheExpiryDays);

  const cachedData = await prisma.cibilData.findFirst({
    where: {
      userId: userId,
      isSubmitted: true,
      status: "SUBMITTED",
      createdAt: {
        gte: cacheExpiryDate,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return cachedData;
};

/**
 * CIBIL Check - Smart checking with tracking
 * POST /api/cibil/check
 */
export const checkCibil = asyncHandler(async (req, res) => {
  const { panNumber, phoneNumber, submitToApi = false } = req.body;
  const userId = req.user.id;

  // Validation
  if (!panNumber && !phoneNumber) {
    throw new ApiError(400, "PAN number or phone number is required");
  }

  if (panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
    throw new ApiError(400, "Invalid PAN number format");
  }

  if (phoneNumber && !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
    throw new ApiError(400, "Invalid phone number format");
  }

  try {
    // Step 1: Always track the input (for unsubmitted entries)
    const trackingEntry = await prisma.cibilData.create({
      data: {
        userId,
        panNumber: panNumber || null,
        phoneNumber: phoneNumber || null,
        isSubmitted: false,
        status: "UNSUBMITTED",
        cibilScore: null,
        reportData: {},
      },
    });

    // Step 2: If submitToApi is false, just return tracking confirmation
    if (!submitToApi) {
      // Update user's check count
      await prisma.user.update({
        where: { id: userId },
        data: {
          cibilCheckCount: {
            increment: 1,
          },
        },
      });

      return res.status(200).json(
        new ApiResponsive(
          200,
          {
            tracked: true,
            trackingId: trackingEntry.id,
            message:
              "Input tracked successfully. Click 'Get CIBIL Score' to submit.",
          },
          "Input tracked successfully"
        )
      );
    }

    // Step 3: Check for cached data (within 28 days)
    const cachedData = await getCachedCibilData(userId);
    if (cachedData) {
      // Update the tracking entry to submitted status
      await prisma.cibilData.update({
        where: { id: trackingEntry.id },
        data: {
          isSubmitted: true,
          status: "SUBMITTED",
          score: cachedData.score,
          reportData: cachedData.reportData,
        },
      });

      const cacheAge = Math.floor(
        (new Date() - new Date(cachedData.createdAt)) / (1000 * 60 * 60 * 24)
      );

      return res.status(200).json(
        new ApiResponsive(
          200,
          {
            cached: true,
            cacheAge,
            cibilScore: cachedData.score,
            reportData: cachedData.reportData,
            message: `Cached CIBIL data (${cacheAge} days old)`,
          },
          "Cached CIBIL data retrieved"
        )
      );
    }

    // Step 4: Fetch fresh data from third-party API
    const cibilResponse = await fetchCibilFromThirdParty(
      panNumber,
      phoneNumber
    );

    if (!cibilResponse.success) {
      // Update tracking entry with failed status
      await prisma.cibilData.update({
        where: { id: trackingEntry.id },
        data: {
          status: "FAILED",
          isSubmitted: true,
        },
      });

      throw new ApiError(500, "Failed to fetch CIBIL data");
    }

    // Step 5: Store the fresh data and update tracking entry
    const updatedEntry = await prisma.cibilData.update({
      where: { id: trackingEntry.id },
      data: {
        isSubmitted: true,
        status: "SUBMITTED",
        score: cibilResponse.score,
        reportData: cibilResponse.reportData,
      },
    });

    // Update user's check count and last check date
    await prisma.user.update({
      where: { id: userId },
      data: {
        cibilCheckCount: {
          increment: 1,
        },
        lastCibilCheck: new Date(),
      },
    });

    res.status(200).json(
      new ApiResponsive(
        200,
        {
          fresh: true,
          cibilScore: cibilResponse.score,
          reportData: cibilResponse.reportData,
          cacheValidUntil: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        },
        "Fresh CIBIL data retrieved successfully"
      )
    );
  } catch (error) {
    console.error("CIBIL check error:", error);
    throw new ApiError(500, error.message || "Failed to process CIBIL check");
  }
});

/**
 * Get cached CIBIL data for a user
 * GET /api/cibil/cached/:userId
 */
export const getCachedCibil = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const requestingUserId = req.user.id;
  const userRole = req.user.userType;

  // Security: Users can only access their own data, admins can access any
  if (userRole !== "ADMIN" && requestingUserId !== userId) {
    throw new ApiError(403, "Access denied");
  }

  const cachedData = await getCachedCibilData(userId);

  if (!cachedData) {
    throw new ApiError(404, "No cached CIBIL data found");
  }

  const cacheAge = Math.floor(
    (new Date() - new Date(cachedData.createdAt)) / (1000 * 60 * 60 * 24)
  );

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        cacheAge,
        cibilScore: cachedData.cibilScore,
        reportData: cachedData.reportData,
        createdAt: cachedData.createdAt,
      },
      "Cached CIBIL data retrieved"
    )
  );
});

/**
 * Get submitted CIBIL data (Admin only)
 * GET /api/cibil/submitted
 */
export const getSubmittedCibilData = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "", minScore, maxScore } = req.query;

  // Build search filters
  const where = {
    isSubmitted: true,
    status: "SUBMITTED",
    score: {
      not: null,
    },
  };

  // Add score range filters
  if (minScore) {
    where.score.gte = parseInt(minScore);
  }
  if (maxScore) {
    where.score.lte = parseInt(maxScore);
  }

  // Add search filters
  if (search) {
    where.OR = [
      {
        panNumber: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        phoneNumber: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        user: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  const [cibilData, totalCount] = await Promise.all([
    prisma.cibilData.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    }),
    prisma.cibilData.count({ where }),
  ]);

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        data: cibilData,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / parseInt(limit)),
        },
      },
      "Submitted CIBIL data retrieved"
    )
  );
});

/**
 * Get unsubmitted CIBIL data (Admin only)
 * GET /api/cibil/unsubmitted
 */
export const getUnsubmittedCibilData = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const where = {
    isSubmitted: false,
    status: "UNSUBMITTED",
  };

  if (search) {
    where.OR = [
      {
        panNumber: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        phoneNumber: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        user: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  const [cibilData, totalCount] = await Promise.all([
    prisma.cibilData.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    }),
    prisma.cibilData.count({ where }),
  ]);

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        data: cibilData,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / parseInt(limit)),
        },
      },
      "Unsubmitted CIBIL data retrieved"
    )
  );
});

/**
 * Get CIBIL statistics (Admin only)
 * GET /api/cibil/stats
 */
export const getCibilStats = asyncHandler(async (req, res) => {
  try {
    const [
      totalSubmitted,
      totalUnsubmitted,
      totalFailed,
      avgCibilScore,
      scoreDistribution,
      recentChecks,
    ] = await Promise.all([
      // Total submitted
      prisma.cibilData.count({
        where: { isSubmitted: true, status: "SUBMITTED" },
      }),

      // Total unsubmitted
      prisma.cibilData.count({
        where: { isSubmitted: false, status: "UNSUBMITTED" },
      }),

      // Total failed
      prisma.cibilData.count({
        where: { status: "FAILED" },
      }),

      // Average CIBIL score
      prisma.cibilData.aggregate({
        where: {
          isSubmitted: true,
          status: "SUBMITTED",
          score: { not: null },
        },
        _avg: { score: true },
      }),

      // Score distribution - using Prisma instead of raw SQL
      prisma.cibilData.groupBy({
        by: ["score"],
        where: {
          isSubmitted: true,
          status: "SUBMITTED",
          score: { not: null },
        },
        _count: {
          score: true,
        },
      }),

      // Recent checks (last 7 days)
      prisma.cibilData.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    // Process score distribution manually
    const scoreRanges = {
      Excellent: 0,
      Good: 0,
      Fair: 0,
      Poor: 0,
    };

    scoreDistribution.forEach((item) => {
      const score = item.score;
      if (score >= 750) scoreRanges.Excellent += item._count.score;
      else if (score >= 700) scoreRanges.Good += item._count.score;
      else if (score >= 600) scoreRanges.Fair += item._count.score;
      else scoreRanges.Poor += item._count.score;
    });

    const processedScoreDistribution = Object.entries(scoreRanges).map(
      ([range, count]) => ({
        score_range: range,
        count,
      })
    );

    res.status(200).json(
      new ApiResponsive(
        200,
        {
          totalSubmitted,
          totalUnsubmitted,
          totalFailed,
          averageScore: Math.round(avgCibilScore._avg.score || 0),
          scoreDistribution: processedScoreDistribution,
          recentChecks,
          totalUsers: await prisma.user.count(),
        },
        "CIBIL statistics retrieved"
      )
    );
  } catch (error) {
    console.error("Error in getCibilStats:", error);
    throw new ApiError(
      500,
      `Failed to fetch CIBIL statistics: ${error.message}`
    );
  }
});
