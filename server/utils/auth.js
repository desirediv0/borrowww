import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

/**
 * Generate JWT Access Token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

/**
 * Generate JWT Refresh Token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

/**
 * Verify JWT Token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

/**
 * Verify Admin JWT Token
 */
export const verifyAdminToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired admin token");
  }
};

/**
 * Hash Password
 */
export const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare Password
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate Session Token
 */
export const generateSessionToken = () => {
  return jwt.sign(
    { sessionId: Date.now().toString() + Math.random().toString() },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

/**
 * Create User Session
 */
export const createSession = async (userId) => {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const session = await prisma.session.create({
    data: {
      token,
      expiresAt,
      userId,
    },
  });

  return session;
};

/**
 * Validate Session
 */
export const validateSession = async (token) => {
  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) {
      throw new Error("Session not found");
    }

    if (session.expiresAt < new Date()) {
      // Delete expired session
      await prisma.session.delete({
        where: { id: session.id },
      });
      throw new Error("Session expired");
    }

    return session;
  } catch (error) {
    throw new Error("Invalid session");
  }
};

/**
 * Delete Session
 */
export const deleteSession = async (token) => {
  try {
    await prisma.session.delete({
      where: { token },
    });
  } catch (error) {
    // Session might not exist, ignore error
  }
};

/**
 * Clean Expired Sessions
 */
export const cleanExpiredSessions = async () => {
  try {
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  } catch (error) {
    console.error("Error cleaning expired sessions:", error);
  }
};

/**
 * Validate CIBIL Cache (28-day rule)
 */
export const isCibilDataValid = (cibilData) => {
  if (!cibilData || !cibilData.expiresAt) return false;
  return new Date() < new Date(cibilData.expiresAt);
};

/**
 * Calculate CIBIL Cache Expiry (28 days from now)
 */
export const calculateCibilExpiry = () => {
  return new Date(Date.now() + 28 * 24 * 60 * 60 * 1000);
};
