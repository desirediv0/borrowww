import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { encryptUserData, decryptUserData } from "../utils/encryption.js";
import { isValidIndianNumber } from "../utils/validation.js";
import axios from "axios";

// List users with pagination
export const listUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
        prisma.user.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
        prisma.user.count(),
    ]);

    // Decrypt user data for admin view (No masking, admin needs full details)
    const decryptedUsers = users.map(user => decryptUserData(user, false));

    res.json(new ApiResponsive(200, { users: decryptedUsers, total, page, limit }, "Users fetched"));
});

// Get user by id
export const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.id.trim();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError(404, "User not found");

    // Decrypt user data for admin view (No masking)
    const decryptedUser = decryptUserData(user, false);

    res.json(new ApiResponsive(200, { user: decryptedUser }, "User fetched"));
});

// User self-update (for user to update their own profile)
export const updateUserSelf = asyncHandler(async (req, res) => {
    const userId = req.user.id; // from userAuth
    let data = { ...req.body };

    // Trim string fields
    if (typeof data.firstName === 'string') data.firstName = data.firstName.trim();
    if (typeof data.middleName === 'string') data.middleName = data.middleName.trim();
    if (typeof data.lastName === 'string') data.lastName = data.lastName.trim();
    if (typeof data.phoneNumber === 'string') data.phoneNumber = data.phoneNumber.trim();
    if (typeof data.address === 'string') data.address = data.address.trim();
    if (typeof data.pincode === 'string') data.pincode = data.pincode.trim();
    if (typeof data.identityNumber === 'string') data.identityNumber = data.identityNumber.trim();
    if (typeof data.identityType === 'string') data.identityType = data.identityType.trim();
    if (typeof data.gender === 'string') data.gender = data.gender.trim();

    // Handle Enums & Optional Fields: Convert empty strings to null
    if (data.gender === "") data.gender = null;
    if (data.identityType === "") data.identityType = null;
    if (data.identityNumber === "") data.identityNumber = null;

    // Handle Date of Birth
    if (data.dateOfBirth) {
        const d = new Date(data.dateOfBirth);
        if (!isNaN(d.getTime())) {
            data.dateOfBirth = d;
        } else {
            // If date is invalid string, remove it or set to null? 
            // Better to delete if we don't know what it is, or null if it was meant to be cleared.
            // Safe bet for now:
            delete data.dateOfBirth;
        }
    } else {
        if (data.dateOfBirth === "") {
            data.dateOfBirth = null;
        } else {
            // undefined/null passed, do nothing (delete from data to avoid overwriting with undefined if that's an issue, though prisma handles undefined by ignoring)
            delete data.dateOfBirth;
        }
    }

    // Encrypt sensitive data before storing
    data = encryptUserData(data);

    const user = await prisma.user.update({ where: { id: userId }, data });

    // Decrypt for user response (full decryption for user)
    const decryptedUser = decryptUserData(user, false);

    res.json(new ApiResponsive(200, { user: decryptedUser }, "User updated"));
});

// Update user (admin)
export const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id.trim();
    let data = { ...req.body };

    // Trim string fields
    if (typeof data.firstName === 'string') data.firstName = data.firstName.trim();
    if (typeof data.middleName === 'string') data.middleName = data.middleName.trim();
    if (typeof data.lastName === 'string') data.lastName = data.lastName.trim();
    if (typeof data.phoneNumber === 'string') data.phoneNumber = data.phoneNumber.trim();
    if (typeof data.address === 'string') data.address = data.address.trim();
    if (typeof data.pincode === 'string') data.pincode = data.pincode.trim();
    if (typeof data.identityNumber === 'string') data.identityNumber = data.identityNumber.trim();
    if (typeof data.identityType === 'string') data.identityType = data.identityType.trim();
    if (typeof data.gender === 'string') data.gender = data.gender.trim();

    // Handle Enums & Optional Fields: Convert empty strings to null
    if (data.gender === "") data.gender = null;
    if (data.identityType === "") data.identityType = null;
    if (data.identityNumber === "") data.identityNumber = null;

    // Handle Date of Birth
    if (data.dateOfBirth) {
        const d = new Date(data.dateOfBirth);
        if (!isNaN(d.getTime())) {
            data.dateOfBirth = d;
        } else {
            delete data.dateOfBirth;
        }
    } else {
        if (data.dateOfBirth === "") {
            data.dateOfBirth = null;
        } else {
            delete data.dateOfBirth;
        }
    }

    // Encrypt sensitive data before storing
    data = encryptUserData(data);

    const user = await prisma.user.update({ where: { id: userId }, data });

    // Decrypt for admin view (No masking)
    const decryptedUser = decryptUserData(user, false);

    res.json(new ApiResponsive(200, { user: decryptedUser }, "User updated"));
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id.trim();
    await prisma.user.delete({ where: { id: userId } });
    res.json(new ApiResponsive(200, null, "User deleted"));
});

// Bulk delete users (admin)
export const bulkDeleteUsers = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(400, "Array of IDs is required");
    }

    const result = await prisma.user.deleteMany({
        where: { id: { in: ids } },
    });

    res.json(new ApiResponsive(200, { deletedCount: result.count }, `Successfully deleted ${result.count} users`));
});

// Helper to generate JWT for user
const generateUserToken = (user) => {
    return jwt.sign({ id: user.id, phoneNumber: user.phoneNumber }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// User Register (phone/OTP)
export const registerUser = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) throw new ApiError(400, "Phone number required");
    if (!isValidIndianNumber(phoneNumber)) throw new ApiError(400, "Invalid or fake phone number");
    let user = await prisma.user.findUnique({ where: { phoneNumber } });
    if (user) throw new ApiError(400, "User already exists");

    user = await prisma.user.create({ data: { phoneNumber } });

    // Decrypt for user response (no masking for user)
    const decryptedUser = decryptUserData(user, false);

    // Link guest session if sessionId provided
    if (req.body.sessionId) {
        await prisma.userSession.update({
            where: { sessionId: req.body.sessionId },
            data: { userId: user.id }
        }).catch(() => {
            // Ignore if session not found or update fails (non-critical)
        });
    }

    res.status(201).json(new ApiResponsive(201, { user: decryptedUser }, "User registered"));
});

// Send OTP via MSG91 Flow API
export const sendOtp = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) throw new ApiError(400, "Phone number required");
    if (!isValidIndianNumber(phoneNumber)) throw new ApiError(400, "Invalid or fake phone number");

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // Save OTP to database
    await prisma.otpSession.create({
        data: { phoneNumber, otp, expiresAt },
    });

    const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
    const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;

    if (MSG91_AUTH_KEY && MSG91_TEMPLATE_ID) {
        try {
            // Format mobile number with country code
            const formattedMobile = phoneNumber && phoneNumber.length === 10
                ? `91${phoneNumber}`
                : phoneNumber;

            // MSG91 Flow API request body
            const requestBody = {
                template_id: MSG91_TEMPLATE_ID,
                short_url: "0",
                realTimeResponse: "1",
                recipients: [
                    {
                        mobiles: formattedMobile,
                        otp: otp
                    }
                ]
            };

            const url = 'https://control.msg91.com/api/v5/flow';
            const resp = await axios.post(url, requestBody, {
                headers: {
                    'accept': 'application/json',
                    'authkey': MSG91_AUTH_KEY,
                    'content-type': 'application/json'
                },
                timeout: 10000
            });

            const d = resp.data || {};
            console.log('MSG91 Flow API response:', d);

            // MSG91 success response has type: 'success'
            if (d.type === 'success') {
                return res.json(new ApiResponsive(200, null, 'OTP sent successfully'));
            } else {
                console.warn('MSG91 Flow API responded with unexpected body:', d);
                return res.status(502).json(new ApiResponsive(502, { provider: d }, 'MSG91 rejected OTP request'));
            }
        } catch (err) {
            console.error('MSG91 Flow API failed:', err.message || err, err.response && err.response.data ? err.response.data : '');
            const prov = err.response && err.response.data ? err.response.data : { message: err.message };
            return res.status(502).json(new ApiResponsive(502, { provider: prov }, 'MSG91 send failed'));
        }
    }
    // Production: MSG91 is required
    throw new ApiError(500, 'SMS service not configured. Please contact support.');
});

// Verify OTP and login (DB verification only)
export const verifyOtp = asyncHandler(async (req, res) => {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) throw new ApiError(400, "Phone number and OTP required");

    // Verify OTP from database
    const session = await prisma.otpSession.findFirst({
        where: { phoneNumber, otp, isVerified: false, expiresAt: { gt: new Date() } },
        orderBy: { createdAt: 'desc' },
    });

    if (!session) throw new ApiError(400, 'Invalid or expired OTP');

    // Mark OTP as verified
    await prisma.otpSession.update({ where: { id: session.id }, data: { isVerified: true } });

    // Find or create user
    let user = await prisma.user.findUnique({ where: { phoneNumber } });
    if (!user) {
        user = await prisma.user.create({ data: { phoneNumber } });
    }

    const token = generateUserToken(user);

    // Update user and capture the updated record
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { accessToken: token, lastLogin: new Date(), isVerified: true }
    });

    // Link guest session if sessionId provided
    if (req.body.sessionId) {
        await prisma.userSession.update({
            where: { sessionId: req.body.sessionId },
            data: { userId: user.id }
        }).catch(() => {
            // Ignore if session not found or update fails (non-critical)
        });
    }

    // Decrypt for user response
    const decryptedUser = decryptUserData(updatedUser, false);
    res.json(new ApiResponsive(200, { token, user: decryptedUser }, 'Login successful'));
});

// User Profile (protected)
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    const decryptedUser = decryptUserData(user, false);
    res.json(new ApiResponsive(200, { user: decryptedUser }, "Profile fetched"));
});

// Get user details (admin only)
export const getUserDetails = asyncHandler(async (req, res) => {
    const userId = req.params.id.trim();

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            cibilData: {
                orderBy: { createdAt: "desc" },
                take: 5
            },
            loans: {
                orderBy: { createdAt: "desc" },
                take: 5
            },
            userSessions: {
                where: { isActive: true },
                take: 3
            }
        }
    });

    if (!user) throw new ApiError(404, "User not found");

    // Decrypt user data for admin view (with masking)
    const decryptedUser = decryptUserData(user, true);

    res.json(new ApiResponsive(200, { user: decryptedUser }, "User details fetched"));
});

// Get full user profile: user info, last CIBIL, all loans
export const getFullUserProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    // Last submitted CIBIL (isSubmitted: true)
    const lastCibil = await prisma.cibilData.findFirst({
        where: { userId: user.id, isSubmitted: true },
        orderBy: { createdAt: 'desc' },
    });
    // All loans (latest first)
    const loans = await prisma.loan.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
    });

    // Decrypt for user response (full data for user)
    const decryptedUser = decryptUserData(user, false);

    res.json(new ApiResponsive(200, { user: decryptedUser, lastCibil, loans }, 'Full user profile fetched'));
});

// Resend OTP via MSG91 Flow API
export const retryOtp = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) throw new ApiError(400, 'Phone number required');
    if (!isValidIndianNumber(phoneNumber)) throw new ApiError(400, "Invalid or fake phone number");

    // Generate new 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // Save new OTP to database
    await prisma.otpSession.create({ data: { phoneNumber, otp, expiresAt } });

    const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
    const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;

    if (MSG91_AUTH_KEY && MSG91_TEMPLATE_ID) {
        try {
            // Format mobile number with country code
            const formattedMobile = phoneNumber && phoneNumber.length === 10
                ? `91${phoneNumber}`
                : phoneNumber;

            // MSG91 Flow API request body
            const requestBody = {
                template_id: MSG91_TEMPLATE_ID,
                short_url: "0",
                realTimeResponse: "1",
                recipients: [
                    {
                        mobiles: formattedMobile,
                        otp: otp
                    }
                ]
            };

            const url = 'https://control.msg91.com/api/v5/flow';
            const resp = await axios.post(url, requestBody, {
                headers: {
                    'accept': 'application/json',
                    'authkey': MSG91_AUTH_KEY,
                    'content-type': 'application/json'
                },
                timeout: 10000
            });

            const d = resp.data || {};
            console.log('MSG91 Flow API resend response:', d);

            if (d.type === 'success') {
                return res.json(new ApiResponsive(200, null, 'OTP resent successfully'));
            }
            return res.status(502).json(new ApiResponsive(502, { provider: d }, 'MSG91 resend rejected'));
        } catch (err) {
            console.error('MSG91 Flow API resend failed:', err.message || err, err.response && err.response.data ? err.response.data : '');
            const prov = err.response && err.response.data ? err.response.data : { message: err.message };
            return res.status(502).json(new ApiResponsive(502, { provider: prov }, 'MSG91 resend failed'));
        }
    }
    // Production: MSG91 is required
    throw new ApiError(500, 'SMS service not configured. Please contact support.');
});

// Initiate phone number change (send OTP to new phone)
export const changePhone = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { newPhoneNumber } = req.body;

    if (!newPhoneNumber) throw new ApiError(400, "New phone number required");
    if (!isValidIndianNumber(newPhoneNumber)) throw new ApiError(400, "Invalid or fake phone number");

    // Check if new phone already exists
    const existingUser = await prisma.user.findUnique({ where: { phoneNumber: newPhoneNumber } });
    if (existingUser && existingUser.id !== userId) {
        throw new ApiError(400, "Phone number already in use by another account");
    }

    // Generate and store 6-digit OTP for new phone
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await prisma.otpSession.create({
        data: { phoneNumber: newPhoneNumber, otp, expiresAt },
    });

    // Send OTP via MSG91 Flow API
    const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
    const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;

    if (MSG91_AUTH_KEY && MSG91_TEMPLATE_ID) {
        try {
            const formattedMobile = newPhoneNumber.length === 10
                ? `91${newPhoneNumber}`
                : newPhoneNumber;

            const requestBody = {
                template_id: MSG91_TEMPLATE_ID,
                short_url: "0",
                realTimeResponse: "1",
                recipients: [
                    {
                        mobiles: formattedMobile,
                        otp: otp
                    }
                ]
            };

            const url = 'https://control.msg91.com/api/v5/flow';
            const resp = await axios.post(url, requestBody, {
                headers: {
                    'accept': 'application/json',
                    'authkey': MSG91_AUTH_KEY,
                    'content-type': 'application/json'
                },
                timeout: 10000
            });

            if (resp.data && resp.data.type === 'success') {
                return res.json(new ApiResponsive(200, null, 'OTP sent to new phone number'));
            }
        } catch (err) {
            console.error('Failed to send OTP for phone change:', err.message);
        }
    }
    // Production: MSG91 is required
    throw new ApiError(500, 'SMS service not configured. Please contact support.');
});

// Verify OTP and change phone number
export const verifyPhoneChange = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { newPhoneNumber, otp } = req.body;

    if (!newPhoneNumber || !otp) throw new ApiError(400, "Phone number and OTP required");

    // Verify OTP from DB
    const session = await prisma.otpSession.findFirst({
        where: { phoneNumber: newPhoneNumber, otp, isVerified: false, expiresAt: { gt: new Date() } },
        orderBy: { createdAt: 'desc' },
    });

    if (!session) throw new ApiError(400, 'Invalid or expired OTP');

    // Mark OTP as verified
    await prisma.otpSession.update({ where: { id: session.id }, data: { isVerified: true } });

    // Update user's phone number
    const user = await prisma.user.update({
        where: { id: userId },
        data: { phoneNumber: newPhoneNumber }
    });

    const decryptedUser = decryptUserData(user, false);
    res.json(new ApiResponsive(200, { user: decryptedUser }, 'Phone number updated successfully'));
});