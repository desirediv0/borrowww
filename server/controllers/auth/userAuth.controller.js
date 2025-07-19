import { prisma } from "../../config/db.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponsive } from "../../utils/ApiResponsive.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Generate JWT Access and Refresh Tokens
 */
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" }
  );

  return { accessToken, refreshToken };
};

/**
 * Register new user (Phone-based)
 * POST /api/auth/register
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;

  // Validation - only name and phone required for user registration
  if (!name || !phone) {
    throw new ApiError(400, "Name and phone number are required");
  }

  // Validate phone number format (basic validation)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    throw new ApiError(400, "Please enter a valid 10-digit phone number");
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { phone },
  });

  if (existingUser) {
    throw new ApiError(409, "User with this phone number already exists");
  }

  // Create user with phone number only
  const user = await prisma.user.create({
    data: {
      name,
      phone,
      userType: "USER",
      isVerified: false, // Will be verified via OTP
      cibilCheckCount: 0,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      userType: true,
      isVerified: true,
      createdAt: true,
    },
  });

  // TODO: Send OTP to phone number here
  // For now, we'll just return success message
  res.status(201).json(
    new ApiResponsive(
      201,
      {
        user,
        message:
          "Please verify your phone number with OTP to complete registration",
      },
      "User registered successfully. Please verify with OTP."
    )
  );
});

/**
 * Login user (Phone + OTP based)
 * POST /api/auth/login
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    throw new ApiError(400, "Phone number and OTP are required");
  }

  // Validate phone number format
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    throw new ApiError(400, "Please enter a valid 10-digit phone number");
  }

  // Find user by phone
  const user = await prisma.user.findUnique({
    where: { phone },
  });

  if (!user) {
    throw new ApiError(401, "User not found. Please register first.");
  }

  // TODO: Verify OTP here
  // For now, we'll assume OTP is valid (replace with actual OTP verification)
  const isOtpValid = await verifyOtp(phone, otp);
  if (!isOtpValid) {
    throw new ApiError(401, "Invalid OTP");
  }

  // Mark user as verified if not already
  if (!user.isVerified) {
    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  // Set secure cookies
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  const userResponse = {
    id: user.id,
    name: user.name,
    phone: user.phone,
    userType: user.userType,
    isVerified: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponsive(
        200,
        {
          user: userResponse,
          accessToken,
        },
        "Login successful"
      )
    );
});

/**
 * Send OTP for registration/login
 * POST /api/auth/send-otp
 */
export const sendOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    throw new ApiError(400, "Phone number is required");
  }

  // Validate phone number format
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    throw new ApiError(400, "Please enter a valid 10-digit phone number");
  }

  // TODO: Integrate with actual OTP service (like Twilio, MSG91, etc.)
  // For now, we'll just return success
  const otp = generateOtp(); // Generate 6-digit OTP

  // TODO: Send OTP via SMS service
  console.log(`OTP for ${phone}: ${otp}`);

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        message: "OTP sent successfully",
        phone: phone,
      },
      "OTP sent to your phone number"
    )
  );
});

/**
 * Verify OTP (Helper function)
 */
const verifyOtp = async (phone, otp) => {
  // TODO: Implement actual OTP verification logic
  // For now, return true (replace with actual verification)
  return true;
};

/**
 * Generate OTP (Helper function)
 */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * OTP-based login/register (Otpless integration)
 * POST /api/auth/otp-login
 */
export const otpLogin = asyncHandler(async (req, res) => {
  const { phone, otp, otpToken } = req.body;

  if (!phone || !otp || !otpToken) {
    throw new ApiError(400, "Phone, OTP, and OTP token are required");
  }

  try {
    // Verify OTP with Otpless (replace with actual Otpless verification)
    const otpVerificationResponse = await verifyOtpWithOtpless(
      phone,
      otp,
      otpToken
    );

    if (!otpVerificationResponse.success) {
      throw new ApiError(401, "Invalid OTP");
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      // Create new user with phone number
      user = await prisma.user.create({
        data: {
          phone,
          name: `User_${phone.slice(-4)}`, // Temporary name
          role: "USER",
          isVerified: true, // Since OTP is verified
          cibilCheckCount: 0,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isVerified: true,
        },
      });
    } else {
      // Update verification status
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          lastLogin: new Date(),
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isVerified: true,
        },
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Set secure cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponsive(
          200,
          {
            user,
            accessToken,
            isNewUser: !user.email, // Flag to indicate if user needs to complete profile
          },
          "OTP verification successful"
        )
      );
  } catch (error) {
    console.error("OTP Login Error:", error);
    throw new ApiError(500, "OTP verification failed");
  }
});

/**
 * Mock Otpless verification function
 * Replace with actual Otpless API integration
 */
const verifyOtpWithOtpless = async (phone, otp, otpToken) => {
  // Mock implementation - replace with actual Otpless API call
  // const response = await fetch(`${process.env.OTPLESS_API_URL}/verify`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${process.env.OTPLESS_API_KEY}`
  //   },
  //   body: JSON.stringify({ phone, otp, token: otpToken })
  // });

  // For development - accept any 6-digit OTP
  if (otp === "123456" || otp.length === 6) {
    return { success: true };
  }

  return { success: false };
};

/**
 * Refresh access token
 * POST /api/auth/refresh
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "Refresh token not found");
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, role: true },
    });

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // Generate new access token
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json(
        new ApiResponsive(200, { accessToken }, "Token refreshed successfully")
      );
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
});

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponsive(200, {}, "Logout successful"));
});

/**
 * Get current user profile
 * GET /api/auth/profile
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isVerified: true,
      cibilCheckCount: true,
      lastCibilCheck: true,
      lastLogin: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponsive(200, { user }, "User profile retrieved"));
});

/**
 * Update user profile
 * PUT /api/auth/profile
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  // Check if email is already taken by another user
  if (email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: { not: userId },
      },
    });

    if (existingUser) {
      throw new ApiError(409, "Email already in use");
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(name && { name }),
      ...(email && { email }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isVerified: true,
    },
  });

  res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        { user: updatedUser },
        "Profile updated successfully"
      )
    );
});

/**
 * Change password
 * PUT /api/auth/change-password
 */
export const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters");
  }

  // Get user with password
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.password) {
    throw new ApiError(404, "User not found or no password set");
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
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
    where: { id: userId },
    data: { password: hashedNewPassword },
  });

  res
    .status(200)
    .json(new ApiResponsive(200, {}, "Password changed successfully"));
});
