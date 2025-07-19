import {
  verifyToken,
  verifyAdminToken,
  validateSession,
} from "../utils/auth.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";

/**
 * Authentication Middleware - Verify JWT Token
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  try {
    // Get token from header or cookie
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Access token is required");
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id || decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        userType: true,
        isActive: true,
        lastLogin: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Account is deactivated");
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

/**
 * Session-based Authentication Middleware
 */
export const authenticateSession = asyncHandler(async (req, res, next) => {
  try {
    // Get session token from cookie
    const sessionToken = req.cookies?.sessionToken;

    if (!sessionToken) {
      throw new ApiError(401, "Session token is required");
    }

    // Validate session
    const session = await validateSession(sessionToken);

    if (!session.user.isActive) {
      throw new ApiError(403, "Account is deactivated");
    }

    // Attach user to request
    req.user = session.user;
    req.session = session;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid session");
  }
});

/**
 * Authorization Middleware - Check User Roles
 */
export const authorize = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (!roles.includes(req.user.userType)) {
      throw new ApiError(
        403,
        `Access denied. Required roles: ${roles.join(", ")}`
      );
    }

    next();
  });
};

/**
 * Admin Only Middleware
 */
export const adminOnly = authorize("ADMIN");

/**
 * User Only Middleware
 */
export const userOnly = authorize("USER");

/**
 * Admin or User Middleware (Both can access)
 */
export const adminOrUser = authorize("ADMIN", "USER");

/**
 * Optional Authentication - Don't throw error if no token
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.accessToken;

    if (token) {
      const decoded = verifyToken(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          userType: true,
          isActive: true,
        },
      });

      if (user && user.isActive) {
        req.user = user;
      }
    }
  } catch (error) {
    // Ignore errors in optional auth
  }

  next();
});

/**
 * Rate Limiting Middleware (Simple implementation)
 */
const rateLimitStore = new Map();

export const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  return asyncHandler(async (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old entries
    if (rateLimitStore.has(key)) {
      const requests = rateLimitStore
        .get(key)
        .filter((time) => time > windowStart);
      rateLimitStore.set(key, requests);
    }

    // Get current requests in window
    const requests = rateLimitStore.get(key) || [];

    if (requests.length >= maxRequests) {
      throw new ApiError(429, "Too many requests, please try again later");
    }

    // Add current request
    requests.push(now);
    rateLimitStore.set(key, requests);

    next();
  });
};

/**
 * Check if user owns resource or is admin
 */
export const ownerOrAdmin = (userIdField = "userId") => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    // Admin can access everything
    if (req.user.userType === "ADMIN") {
      return next();
    }

    // Check if user owns the resource
    const resourceUserId = req.params[userIdField] || req.body[userIdField];

    if (resourceUserId !== req.user.id) {
      throw new ApiError(
        403,
        "Access denied. You can only access your own data"
      );
    }

    next();
  });
};

/**
 * Admin Authentication Middleware - Verify Admin JWT Token
 */
export const authenticateAdmin = asyncHandler(async (req, res, next) => {
  try {
    // Get token from header or cookie
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.adminToken;

    if (!token) {
      throw new ApiError(401, "Admin token is required");
    }

    // Verify admin token
    const decoded = verifyAdminToken(token);

    // Get admin from database
    const admin = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        isActive: true,
        lastLogin: true,
      },
    });

    if (!admin || admin.userType !== "ADMIN") {
      throw new ApiError(401, "Invalid admin token");
    }

    if (!admin.isActive) {
      throw new ApiError(403, "Admin account is deactivated");
    }

    // Attach admin to request
    req.user = admin;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid admin token");
  }
});
