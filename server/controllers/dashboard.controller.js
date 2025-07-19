import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";

/**
 * Get dashboard statistics (Admin only)
 * GET /api/dashboard/stats
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalCibilReports,
    totalLoans,
    pendingLoans,
    activeUsers,
    newUsersToday,
    cibilSubmissionsToday,
    loanApplicationsToday,
  ] = await Promise.all([
    // Total users
    prisma.user.count({ where: { userType: "USER" } }),

    // Total CIBIL reports
    prisma.cibilData.count(),

    // Total loans
    prisma.loan.count(),

    // Pending loans
    prisma.loan.count({ where: { status: "PENDING" } }),

    // Active users (logged in last 7 days)
    prisma.user.count({
      where: {
        userType: "USER",
        lastLogin: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),

    // New users today
    prisma.user.count({
      where: {
        userType: "USER",
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    // CIBIL submissions today
    prisma.cibilData.count({
      where: {
        isSubmitted: true,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    // Loan applications today
    prisma.loan.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
  ]);

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        totalUsers,
        totalCibilReports,
        totalLoans,
        pendingLoans,
        activeUsers,
        newUsersToday,
        cibilSubmissionsToday,
        loanApplicationsToday,
      },
      "Dashboard statistics retrieved successfully"
    )
  );
});

/**
 * Get activity overview for last 7 days (Admin only)
 * GET /api/dashboard/activity
 */
export const getActivityOverview = asyncHandler(async (req, res) => {
  const days = 7;
  const activityData = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const [users, cibilChecks, loanApplications] = await Promise.all([
      // New users on this day
      prisma.user.count({
        where: {
          userType: "USER",
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      }),

      // CIBIL checks on this day
      prisma.cibilData.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      }),

      // Loan applications on this day
      prisma.loan.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      }),
    ]);

    activityData.push({
      date: startOfDay.toISOString().split("T")[0],
      users,
      cibilChecks,
      loanApplications,
    });
  }

  res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        { activityData },
        "Activity overview retrieved successfully"
      )
    );
});

/**
 * Get recent users (Admin only)
 * GET /api/dashboard/recent-users
 */
export const getRecentUsers = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const recentUsers = await prisma.user.findMany({
    where: { userType: "USER" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      isVerified: true,
      cibilCheckCount: true,
      lastLogin: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: parseInt(limit),
  });

  res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        { users: recentUsers },
        "Recent users retrieved successfully"
      )
    );
});

/**
 * Get loan status distribution (Admin only)
 * GET /api/dashboard/loan-distribution
 */
export const getLoanDistribution = asyncHandler(async (req, res) => {
  const distribution = await prisma.loan.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        { distribution },
        "Loan distribution retrieved successfully"
      )
    );
});

/**
 * Get CIBIL status distribution (Admin only)
 * GET /api/dashboard/cibil-distribution
 */
export const getCibilDistribution = asyncHandler(async (req, res) => {
  const [submitted, unsubmitted] = await Promise.all([
    prisma.cibilData.count({ where: { isSubmitted: true } }),
    prisma.cibilData.count({ where: { isSubmitted: false } }),
  ]);

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        submitted,
        unsubmitted,
      },
      "CIBIL distribution retrieved successfully"
    )
  );
});

/**
 * Get comprehensive dashboard data (Admin only)
 * GET /api/dashboard/comprehensive
 */
export const getComprehensiveDashboard = asyncHandler(async (req, res) => {
  const [
    stats,
    activityData,
    recentUsers,
    loanDistribution,
    cibilDistribution,
  ] = await Promise.all([
    getDashboardStatsData(),
    getActivityData(),
    getRecentUsersData(),
    getLoanDistributionData(),
    getCibilDistributionData(),
  ]);

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        stats,
        activityData,
        recentUsers,
        loanDistribution,
        cibilDistribution,
      },
      "Comprehensive dashboard data retrieved successfully"
    )
  );
});

// Helper functions
async function getDashboardStatsData() {
  const [
    totalUsers,
    totalCibilReports,
    totalLoans,
    pendingLoans,
    activeUsers,
    newUsersToday,
    cibilSubmissionsToday,
    loanApplicationsToday,
  ] = await Promise.all([
    prisma.user.count({ where: { userType: "USER" } }),
    prisma.cibilData.count(),
    prisma.loan.count(),
    prisma.loan.count({ where: { status: "PENDING" } }),
    prisma.user.count({
      where: {
        userType: "USER",
        lastLogin: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    prisma.user.count({
      where: {
        userType: "USER",
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
    prisma.cibilData.count({
      where: {
        isSubmitted: true,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
    prisma.loan.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
  ]);

  return {
    totalUsers,
    totalCibilReports,
    totalLoans,
    pendingLoans,
    activeUsers,
    newUsersToday,
    cibilSubmissionsToday,
    loanApplicationsToday,
  };
}

async function getActivityData() {
  const days = 7;
  const activityData = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const [users, cibilChecks, loanApplications] = await Promise.all([
      prisma.user.count({
        where: {
          userType: "USER",
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      }),
      prisma.cibilData.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      }),
      prisma.loan.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      }),
    ]);

    activityData.push({
      date: startOfDay.toISOString().split("T")[0],
      users,
      cibilChecks,
      loanApplications,
    });
  }

  return activityData;
}

async function getRecentUsersData() {
  return await prisma.user.findMany({
    where: { userType: "USER" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      isVerified: true,
      cibilCheckCount: true,
      lastLogin: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
}

async function getLoanDistributionData() {
  return await prisma.loan.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });
}

async function getCibilDistributionData() {
  const [submitted, unsubmitted] = await Promise.all([
    prisma.cibilData.count({ where: { isSubmitted: true } }),
    prisma.cibilData.count({ where: { isSubmitted: false } }),
  ]);

  return { submitted, unsubmitted };
}
