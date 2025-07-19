import { prisma } from "../../config/db.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponsive } from "../../utils/ApiResponsive.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyAdminToken } from "../../utils/auth.js";

/**
 * Generate Admin JWT Token
 */
const generateAdminToken = (adminId) => {
  return jwt.sign(
    { id: adminId, userType: "ADMIN" },
    process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: process.env.ADMIN_SESSION_TIMEOUT
        ? `${process.env.ADMIN_SESSION_TIMEOUT}s`
        : "1h",
    }
  );
};

/**
 * Admin Login
 * POST /api/admin/auth/login
 */
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password, secretKey } = req.body;

  // Validation
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Check secret key for additional security
  if (
    process.env.ADMIN_SECRET_KEY &&
    secretKey !== process.env.ADMIN_SECRET_KEY
  ) {
    throw new ApiError(401, "Invalid admin access key");
  }

  // Find admin user
  const admin = await prisma.user.findFirst({
    where: {
      email,
      userType: "ADMIN",
    },
  });

  if (!admin) {
    throw new ApiError(401, "Invalid admin credentials");
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid admin credentials");
  }

  // Generate token
  const token = generateAdminToken(admin.id);

  // Update last login
  await prisma.user.update({
    where: { id: admin.id },
    data: { lastLogin: new Date() },
  });

  // Set secure cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: parseInt(process.env.ADMIN_SESSION_TIMEOUT) * 1000 || 3600000, // 1 hour default
  };

  const adminResponse = {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    userType: admin.userType,
    lastLogin: admin.lastLogin,
  };

  res
    .status(200)
    .cookie("adminToken", token, cookieOptions)
    .json(
      new ApiResponsive(
        200,
        {
          admin: adminResponse,
          token,
          expiresIn: parseInt(process.env.ADMIN_SESSION_TIMEOUT) || 3600,
        },
        "Admin login successful"
      )
    );
});

/**
 * Admin Logout
 * POST /api/admin/auth/logout
 */
export const adminLogout = asyncHandler(async (req, res) => {
  res
    .clearCookie("adminToken")
    .json(new ApiResponsive(200, {}, "Admin logout successful"));
});

/**
 * Get Admin Profile
 * GET /api/admin/auth/profile
 */
export const getAdminProfile = asyncHandler(async (req, res) => {
  const adminId = req.user.id;

  const admin = await prisma.user.findUnique({
    where: { id: adminId },
    select: {
      id: true,
      name: true,
      email: true,
      userType: true,
      lastLogin: true,
      createdAt: true,
    },
  });

  if (!admin || admin.userType !== "ADMIN") {
    throw new ApiError(404, "Admin not found");
  }

  res
    .status(200)
    .json(new ApiResponsive(200, { admin }, "Admin profile retrieved"));
});

/**
 * Refresh Admin Token
 * POST /api/admin/auth/refresh
 */
export const refreshAdminToken = asyncHandler(async (req, res) => {
  const { adminToken } = req.cookies;

  if (!adminToken) {
    throw new ApiError(401, "Admin token not found");
  }

  try {
    const decoded = verifyAdminToken(adminToken);

    // Check if admin exists
    const admin = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, userType: true },
    });

    if (!admin || admin.userType !== "ADMIN") {
      throw new ApiError(401, "Invalid admin token");
    }

    // Generate new token
    const newToken = generateAdminToken(admin.id);

    res
      .cookie("adminToken", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: parseInt(process.env.ADMIN_SESSION_TIMEOUT) * 1000 || 3600000,
      })
      .json(
        new ApiResponsive(
          200,
          {
            token: newToken,
            expiresIn: parseInt(process.env.ADMIN_SESSION_TIMEOUT) || 3600,
          },
          "Admin token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Invalid admin token");
  }
});

/**
 * Create Admin User (Super Admin only)
 * POST /api/admin/auth/create-admin
 */
export const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Admin password must be at least 8 characters");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please enter a valid email address");
  }

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.BCRYPT_ROUNDS) || 12
  );

  // Create admin
  const newAdmin = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      userType: "ADMIN",
      isVerified: true, // Admins are automatically verified
      cibilCheckCount: 0,
    },
    select: {
      id: true,
      name: true,
      email: true,
      userType: true,
      createdAt: true,
    },
  });

  res
    .status(201)
    .json(
      new ApiResponsive(201, { admin: newAdmin }, "Admin created successfully")
    );
});

/**
 * Get Admin Dashboard Stats
 * GET /api/admin/auth/dashboard-stats
 */
export const getAdminDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalAdmins,
    recentUsers,
    totalCibilChecks,
    recentCibilChecks,
  ] = await Promise.all([
    // Total users
    prisma.user.count({
      where: { userType: "USER" },
    }),

    // Total admins
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

    // Total CIBIL checks
    prisma.cibilData.count({
      where: { isSubmitted: true },
    }),

    // Recent CIBIL checks (last 7 days)
    prisma.cibilData.count({
      where: {
        isSubmitted: true,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        users: {
          total: totalUsers,
          recent: recentUsers,
        },
        admins: {
          total: totalAdmins,
        },
        cibilChecks: {
          total: totalCibilChecks,
          recent: recentCibilChecks,
        },
      },
      "Dashboard statistics retrieved"
    )
  );
});

/**
 * Update Admin Profile
 * PUT /api/admin/auth/profile
 */
export const updateAdminProfile = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const { name, email } = req.body;

  // Check if email is already taken
  if (email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: { not: adminId },
      },
    });

    if (existingUser) {
      throw new ApiError(409, "Email already in use");
    }
  }

  const updatedAdmin = await prisma.user.update({
    where: { id: adminId },
    data: {
      ...(name && { name }),
      ...(email && { email }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      userType: true,
      lastLogin: true,
    },
  });

  res
    .status(200)
    .json(
      new ApiResponsive(200, { admin: updatedAdmin }, "Admin profile updated")
    );
});

/**
 * Change Admin Password
 * PUT /api/admin/auth/change-password
 */
export const changeAdminPassword = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current and new passwords are required");
  }

  if (newPassword.length < 8) {
    throw new ApiError(400, "New password must be at least 8 characters");
  }

  // Get admin with password
  const admin = await prisma.user.findUnique({
    where: { id: adminId },
  });

  if (!admin || admin.userType !== "ADMIN") {
    throw new ApiError(404, "Admin not found");
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    admin.password
  );
  if (!isCurrentPasswordValid) {
    throw new ApiError(401, "Current password is incorrect");
  }

  // Hash new password
  const hashedNewPassword = await bcrypt.hash(
    newPassword,
    parseInt(process.env.BCRYPT_ROUNDS) || 12
  );

  // Update password
  await prisma.user.update({
    where: { id: adminId },
    data: { password: hashedNewPassword },
  });

  res
    .status(200)
    .json(new ApiResponsive(200, {}, "Admin password changed successfully"));
});

/**
 * Verify Admin Token
 * GET /api/admin/auth/verify-token
 */
export const verifyAdminTokenController = asyncHandler(async (req, res) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.cookies?.adminToken;

  if (!token) {
    throw new ApiError(401, "Admin token not found");
  }

  try {
    const decoded = verifyAdminToken(token);

    // Check if admin exists
    const admin = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    if (!admin || admin.userType !== "ADMIN") {
      throw new ApiError(401, "Invalid admin token");
    }

    res
      .status(200)
      .json(
        new ApiResponsive(200, { admin }, "Admin token verified successfully")
      );
  } catch (error) {
    throw new ApiError(401, "Invalid admin token");
  }
});
