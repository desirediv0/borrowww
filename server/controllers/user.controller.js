import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";

/**
 * Get all users (Admin only)
 * GET /api/users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "", role } = req.query;

  // Build where clause
  const where = {};

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        phone: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (role && ["USER", "ADMIN"].includes(role)) {
    where.userType = role;
  }

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        userType: true,
        isVerified: true,
        cibilCheckCount: true,
        lastCibilCheck: true,
        lastLogin: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    }),
    prisma.user.count({ where }),
  ]);

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / parseInt(limit)),
        },
      },
      "Users retrieved successfully"
    )
  );
});

/**
 * Get user by ID (Admin only)
 * GET /api/users/:id
 */
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      userType: true,
      isVerified: true,
      cibilCheckCount: true,
      lastCibilCheck: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Get user's CIBIL data summary
  const cibilSummary = await prisma.cibilData.findMany({
    where: { userId: id },
    select: {
      id: true,
      cibilScore: true,
      isSubmitted: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        user,
        cibilSummary,
      },
      "User details retrieved"
    )
  );
});

/**
 * Update user (Admin only)
 * PUT /api/users/:id
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, role, isVerified } = req.body;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  // Check if email is already taken by another user
  if (email && email !== existingUser.email) {
    const emailExists = await prisma.user.findFirst({
      where: {
        email,
        id: { not: id },
      },
    });

    if (emailExists) {
      throw new ApiError(409, "Email already in use");
    }
  }

  // Validate role
  if (role && !["USER", "ADMIN"].includes(role)) {
    throw new ApiError(400, "Invalid userType");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { userType: role }),
      ...(typeof isVerified === "boolean" && { isVerified }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      userType: true,
      isVerified: true,
      cibilCheckCount: true,
      lastCibilCheck: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res
    .status(200)
    .json(
      new ApiResponsive(200, { user: updatedUser }, "User updated successfully")
    );
});

/**
 * Delete user (Admin only)
 * DELETE /api/users/:id
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.user.id;

  // Prevent self-deletion
  if (id === currentUserId) {
    throw new ApiError(400, "Cannot delete your own account");
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Delete user and related data in transaction
  await prisma.$transaction(async (tx) => {
    // Delete user's CIBIL data
    await tx.cibilData.deleteMany({
      where: { userId: id },
    });

    // Delete the user
    await tx.user.delete({
      where: { id },
    });
  });

  res.status(200).json(new ApiResponsive(200, {}, "User deleted successfully"));
});

/**
 * Get user statistics (Admin only)
 * GET /api/users/stats
 */
export const getUserStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    verifiedUsers,
    unverifiedUsers,
    adminUsers,
    recentUsers,
    usersWithCibilChecks,
    topCibilUsers,
  ] = await Promise.all([
    // Total users
    prisma.user.count({
      where: { userType: "USER" },
    }),

    // Verified users
    prisma.user.count({
      where: {
        userType: "USER",
        isVerified: true,
      },
    }),

    // Unverified users
    prisma.user.count({
      where: {
        userType: "USER",
        isVerified: false,
      },
    }),

    // Admin users
    prisma.user.count({
      where: { userType: "ADMIN" },
    }),

    // Recent users (last 7 days)
    prisma.user.count({
      where: {
        userType: "USER",
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),

    // Users with CIBIL checks
    prisma.user.count({
      where: {
        userType: "USER",
        cibilCheckCount: {
          gt: 0,
        },
      },
    }),

    // Top users by CIBIL check count
    prisma.user.findMany({
      where: {
        userType: "USER",
        cibilCheckCount: {
          gt: 0,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        cibilCheckCount: true,
        lastCibilCheck: true,
      },
      orderBy: {
        cibilCheckCount: "desc",
      },
      take: 5,
    }),
  ]);

  // Calculate growth rate (compare with previous week)
  const previousWeekUsers = await prisma.user.count({
    where: {
      userType: "USER",
      createdAt: {
        gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });

  const growthRate =
    previousWeekUsers > 0
      ? ((recentUsers - previousWeekUsers) / previousWeekUsers) * 100
      : 0;

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        totalUsers,
        verifiedUsers,
        unverifiedUsers,
        adminUsers,
        recentUsers,
        usersWithCibilChecks,
        topCibilUsers,
        growthRate: Math.round(growthRate * 100) / 100,
        verificationRate:
          totalUsers > 0 ? Math.round((verifiedUsers / totalUsers) * 100) : 0,
        cibilAdoptionRate:
          totalUsers > 0
            ? Math.round((usersWithCibilChecks / totalUsers) * 100)
            : 0,
      },
      "User statistics retrieved"
    )
  );
});

/**
 * Bulk update users (Admin only)
 * PUT /api/users/bulk-update
 */
export const bulkUpdateUsers = asyncHandler(async (req, res) => {
  const { userIds, updates } = req.body;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    throw new ApiError(400, "User IDs array is required");
  }

  if (!updates || Object.keys(updates).length === 0) {
    throw new ApiError(400, "Updates object is required");
  }

  // Validate updates
  const allowedUpdates = ["isVerified", "role"];
  const invalidUpdates = Object.keys(updates).filter(
    (key) => !allowedUpdates.includes(key)
  );

  if (invalidUpdates.length > 0) {
    throw new ApiError(
      400,
      `Invalid update fields: ${invalidUpdates.join(", ")}`
    );
  }

  // Validate role if provided
  if (updates.role && !["USER", "ADMIN"].includes(updates.role)) {
    throw new ApiError(400, "Invalid role");
  }

  // Perform bulk update
  const result = await prisma.user.updateMany({
    where: {
      id: {
        in: userIds,
      },
    },
    data: updates,
  });

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        updatedCount: result.count,
        userIds,
        updates,
      },
      `${result.count} users updated successfully`
    )
  );
});

/**
 * Search users (Admin only)
 * GET /api/users/search
 */
export const searchUsers = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    throw new ApiError(400, "Search query must be at least 2 characters");
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      userType: true,
      isVerified: true,
      cibilCheckCount: true,
    },
    take: 20,
  });

  res
    .status(200)
    .json(new ApiResponsive(200, { users }, "User search completed"));
});
