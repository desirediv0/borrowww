/**
 * ================================================================================
 * ADMIN CONTROLLER - DECRYPTION ALLOWED HERE ONLY
 * ================================================================================
 * 
 * SECURITY ARCHITECTURE:
 * - ONLY this controller can decrypt sensitive data
 * - ALL routes must be protected by isAdmin middleware
 * - ALL data access is logged for audit compliance
 * - Session-based auth with HTTP-only cookies
 * 
 * AUDIT REQUIREMENTS:
 * - Every decrypt operation is logged
 * - Admin ID tracked for each access
 * - Timestamps for compliance reports
 * 
 * ================================================================================
 */

import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { ApiResponsive } from '../utils/ApiResponsive.js';
import {
    decryptFields,
    SENSITIVE_FIELDS,
    logDataAccess
} from '../utils/kms.util.js';
import { softDelete, softDeleteMany } from '../middlewares/prodSafety.js';

// ================================================================================
// ADMIN AUTHENTICATION - SESSION BASED
// ================================================================================

/**
 * Admin Login - Creates secure session
 * 
 * SECURITY:
 * - Password verified with bcrypt
 * - Session stored server-side in PostgreSQL
 * - HTTP-only cookie prevents XSS
 * - Secure cookie in production prevents MITM
 * 
 * @route POST /api/admin/login
 * @access Public
 */
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
    }

    if (!admin.isActive) {
        throw new ApiError(401, 'Account deactivated. Contact super admin.');
    }

    // SECURITY: Create session with admin info
    req.session.adminId = admin.id;
    req.session.email = admin.email;
    req.session.role = 'admin';
    req.session.loginAt = new Date().toISOString();

    // Update last login
    await prisma.admin.update({
        where: { id: admin.id },
        data: { lastLogin: new Date() },
    });

    // AUDIT: Log successful login
    logDataAccess('admin_login', 'Admin', admin.id, admin.id);

    // Save session before sending response so cookie is set and subsequent requests are authenticated
    req.session.save((err) => {
        if (err) {
            console.error('Session save error on login:', err);
            return res.status(500).json(
                new ApiResponsive(500, null, 'Session error. Please try again.')
            );
        }
        res.status(200).json(
            new ApiResponsive(200, {
                admin: { id: admin.id, email: admin.email, name: admin.name },
            }, 'Login successful')
        );
    });
});

/**
 * Admin Logout - Destroys session
 * 
 * @route POST /api/admin/logout
 * @access Protected
 */
export const logoutAdmin = asyncHandler(async (req, res) => {
    const adminId = req.session?.adminId;

    // AUDIT: Log logout
    if (adminId) {
        logDataAccess('admin_logout', 'Admin', adminId, adminId);
    }

    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
        }
        res.clearCookie('admin.sid'); // Session cookie name (see app.js session name)
        res.status(200).json(new ApiResponsive(200, null, 'Logged out successfully'));
    });
});

/**
 * Verify Admin Session
 * 
 * @route GET /api/admin/auth/verify
 * @access Protected
 */
export const verifyAdminSession = asyncHandler(async (req, res) => {
    // If we get here, isAdmin middleware already validated the session
    res.status(200).json(
        new ApiResponsive(200, {
            admin: { id: req.admin.id, email: req.admin.email, name: req.admin.name },
            sessionExpiresAt: req.session.cookie.expires,
        }, 'Session valid')
    );
});

/**
 * Admin Register
 * 
 * SECURITY: Should be restricted to super admin only in production
 * 
 * @route POST /api/admin/register
 * @access Protected (super admin only)
 */
export const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
    }

    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
        throw new ApiError(409, 'Admin already exists');
    }

    // SECURITY: Use bcrypt with cost factor 12 for better security
    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.admin.create({
        data: { email, password: hashedPassword, name },
    });

    // AUDIT: Log admin creation
    logDataAccess('admin_create', 'Admin', admin.id, req.admin?.id);

    res.status(201).json(
        new ApiResponsive(201, {
            id: admin.id,
            email: admin.email,
            name: admin.name,
        }, 'Admin registered successfully')
    );
});

/**
 * Get Admin Profile
 * 
 * @route GET /api/admin/profile
 * @access Protected
 */
export const getAdminProfile = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponsive(200, {
            id: req.admin.id,
            email: req.admin.email,
            name: req.admin.name,
        }, 'Profile fetched')
    );
});

// ================================================================================
// ADMIN DATA ACCESS - WITH DECRYPTION
// ================================================================================

/**
 * List all users with decrypted data
 * 
 * SECURITY:
 * - Protected by isAdmin middleware
 * - Decrypts sensitive fields for admin view
 * - Logs all data access for audit
 * 
 * @route GET /api/admin/users
 * @access Protected
 */
export const listUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where: { isDeleted: false }, // Exclude soft deleted
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.user.count({ where: { isDeleted: false } }),
    ]);

    // SECURITY: Decrypt sensitive fields for admin view
    const decryptedUsers = await Promise.all(
        users.map(async (user) => {
            const decrypted = await decryptFields(user, SENSITIVE_FIELDS.User);
            logDataAccess('decrypt', 'User', user.id, req.admin.id);
            return decrypted;
        })
    );

    res.json(new ApiResponsive(200, {
        users: decryptedUsers,
        total,
        page,
        limit,
    }, 'Users fetched'));
});

/**
 * Get single user with decrypted data
 * 
 * @route GET /api/admin/users/:id
 * @access Protected
 */
export const getUser = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.params.id },
    });

    if (!user || user.isDeleted) {
        throw new ApiError(404, 'User not found');
    }

    // SECURITY: Decrypt for admin view
    const decryptedUser = await decryptFields(user, SENSITIVE_FIELDS.User);
    logDataAccess('decrypt', 'User', user.id, req.admin.id);

    res.json(new ApiResponsive(200, { user: decryptedUser }, 'User fetched'));
});

/**
 * Update user
 * 
 * @route PUT /api/admin/users/:id
 * @access Protected
 */
export const updateUser = asyncHandler(async (req, res) => {
    // SECURITY: Should re-encrypt any sensitive fields being updated
    // For now, only allow non-sensitive field updates
    const { isActive, isVerified } = req.body;

    const user = await prisma.user.update({
        where: { id: req.params.id },
        data: { isActive, isVerified },
    });

    logDataAccess('update', 'User', user.id, req.admin.id);

    res.json(new ApiResponsive(200, { user }, 'User updated'));
});

/**
 * Soft delete user
 * 
 * SECURITY: Never permanently delete - only soft delete
 * 
 * @route DELETE /api/admin/users/:id
 * @access Protected
 */
export const deleteUser = asyncHandler(async (req, res) => {
    // SECURITY: Use soft delete, never permanent delete
    const user = await softDelete(prisma, 'user', req.params.id);

    logDataAccess('soft_delete', 'User', req.params.id, req.admin.id);

    res.json(new ApiResponsive(200, null, 'User soft deleted'));
});

/**
 * Bulk soft delete users
 *
 * @route POST /api/admin/users/soft-delete
 * @body { ids: string[] }
 * @access Protected
 */
export const softDeleteUsers = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(400, 'Array of IDs is required');
    }

    const result = await softDeleteMany(prisma, 'user', ids);
    logDataAccess('soft_delete_many', 'User', ids.join(','), req.admin.id);

    res.status(200).json(
        new ApiResponsive(200, { deletedCount: result.count }, `Soft deleted ${result.count} users`)
    );
});

// ================================================================================
// INQUIRY DATA ACCESS - WITH DECRYPTION
// ================================================================================

/**
 * Get all credit check inquiries with decrypted data
 * 
 * @route GET /api/admin/inquiries/credit-check
 * @access Protected
 */
export const getAllCreditCheckInquiries = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20, search, dateFrom, dateTo } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { isDeleted: false };
    if (status) where.status = status;
    if (dateFrom || dateTo) {
        where.createdAt = {};
        if (dateFrom) where.createdAt.gte = new Date(dateFrom);
        if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    const [inquiries, total] = await Promise.all([
        prisma.creditCheckInquiry.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: parseInt(limit),
        }),
        prisma.creditCheckInquiry.count({ where }),
    ]);

    // SECURITY: Decrypt for admin view
    const decrypted = await Promise.all(
        inquiries.map(async (inquiry) => {
            const dec = await decryptFields(inquiry, SENSITIVE_FIELDS.CreditCheckInquiry);
            logDataAccess('decrypt', 'CreditCheckInquiry', inquiry.id, req.admin.id);
            return dec;
        })
    );

    res.status(200).json(
        new ApiResponsive(200, {
            inquiries: decrypted,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        }, 'Credit check inquiries fetched')
    );
});

/**
 * Get all contact inquiries with decrypted data
 * 
 * @route GET /api/admin/inquiries/contact
 * @access Protected
 */
export const getAllContactInquiries = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20, dateFrom, dateTo } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { isDeleted: false };
    if (status) where.status = status;
    if (dateFrom || dateTo) {
        where.createdAt = {};
        if (dateFrom) where.createdAt.gte = new Date(dateFrom);
        if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    const [inquiries, total] = await Promise.all([
        prisma.contactInquiry.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: parseInt(limit),
        }),
        prisma.contactInquiry.count({ where }),
    ]);

    const decrypted = await Promise.all(
        inquiries.map(async (inquiry) => {
            const dec = await decryptFields(inquiry, SENSITIVE_FIELDS.ContactInquiry);
            logDataAccess('decrypt', 'ContactInquiry', inquiry.id, req.admin.id);
            return dec;
        })
    );

    res.status(200).json(
        new ApiResponsive(200, {
            inquiries: decrypted,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        }, 'Contact inquiries fetched')
    );
});

/**
 * Get all home loan inquiries with decrypted data
 * 
 * @route GET /api/admin/inquiries/home-loan
 * @access Protected
 */
export const getAllHomeLoanInquiries = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20, dateFrom, dateTo } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { isDeleted: false };
    if (status) where.status = status;
    if (dateFrom || dateTo) {
        where.createdAt = {};
        if (dateFrom) where.createdAt.gte = new Date(dateFrom);
        if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    const [inquiries, total] = await Promise.all([
        prisma.homeLoanInquiry.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: parseInt(limit),
        }),
        prisma.homeLoanInquiry.count({ where }),
    ]);

    const decrypted = await Promise.all(
        inquiries.map(async (inquiry) => {
            const dec = await decryptFields(inquiry, SENSITIVE_FIELDS.HomeLoanInquiry);
            logDataAccess('decrypt', 'HomeLoanInquiry', inquiry.id, req.admin.id);
            return dec;
        })
    );

    res.status(200).json(
        new ApiResponsive(200, {
            inquiries: decrypted,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        }, 'Home loan inquiries fetched')
    );
});

/**
 * Get all referral inquiries with decrypted data
 * 
 * @route GET /api/admin/inquiries/referral
 * @access Protected
 */
export const getAllReferralInquiries = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20, dateFrom, dateTo } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { isDeleted: false };
    if (status) where.status = status;
    if (dateFrom || dateTo) {
        where.createdAt = {};
        if (dateFrom) where.createdAt.gte = new Date(dateFrom);
        if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    const [inquiries, total] = await Promise.all([
        prisma.referralInquiry.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: parseInt(limit),
        }),
        prisma.referralInquiry.count({ where }),
    ]);

    const decrypted = await Promise.all(
        inquiries.map(async (inquiry) => {
            const dec = await decryptFields(inquiry, SENSITIVE_FIELDS.ReferralInquiry);
            logDataAccess('decrypt', 'ReferralInquiry', inquiry.id, req.admin.id);
            return dec;
        })
    );

    res.status(200).json(
        new ApiResponsive(200, {
            inquiries: decrypted,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
        }, 'Referral inquiries fetched')
    );
});

// ================================================================================
// SOFT DELETE OPERATIONS
// ================================================================================

/**
 * Soft delete credit check inquiries
 * 
 * SECURITY: Uses soft delete, never permanent delete
 * 
 * @route POST /api/admin/inquiries/credit-check/soft-delete
 * @access Protected
 */
export const softDeleteCreditCheckInquiries = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(400, 'Array of IDs is required');
    }

    const result = await softDeleteMany(prisma, 'creditCheckInquiry', ids);
    logDataAccess('soft_delete_many', 'CreditCheckInquiry', ids.join(','), req.admin.id);

    res.status(200).json(
        new ApiResponsive(200, { deletedCount: result.count },
            `Soft deleted ${result.count} credit check inquiries`)
    );
});

/**
 * Soft delete contact inquiries
 */
export const softDeleteContactInquiries = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(400, 'Array of IDs is required');
    }

    const result = await softDeleteMany(prisma, 'contactInquiry', ids);
    logDataAccess('soft_delete_many', 'ContactInquiry', ids.join(','), req.admin.id);

    res.status(200).json(
        new ApiResponsive(200, { deletedCount: result.count },
            `Soft deleted ${result.count} contact inquiries`)
    );
});

/**
 * Soft delete home loan inquiries
 */
export const softDeleteHomeLoanInquiries = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(400, 'Array of IDs is required');
    }

    const result = await softDeleteMany(prisma, 'homeLoanInquiry', ids);
    logDataAccess('soft_delete_many', 'HomeLoanInquiry', ids.join(','), req.admin.id);

    res.status(200).json(
        new ApiResponsive(200, { deletedCount: result.count },
            `Soft deleted ${result.count} home loan inquiries`)
    );
});

/**
 * Soft delete referral inquiries
 */
export const softDeleteReferralInquiries = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(400, 'Array of IDs is required');
    }

    const result = await softDeleteMany(prisma, 'referralInquiry', ids);
    logDataAccess('soft_delete_many', 'ReferralInquiry', ids.join(','), req.admin.id);

    res.status(200).json(
        new ApiResponsive(200, { deletedCount: result.count },
            `Soft deleted ${result.count} referral inquiries`)
    );
});

// ================================================================================
// UPDATE INQUIRY STATUS
// ================================================================================

/**
 * Update inquiry status
 * 
 * @route PATCH /api/admin/inquiries/:type/:id/status
 * @access Protected
 */
export const updateInquiryStatus = asyncHandler(async (req, res) => {
    const { type, id } = req.params;
    const { status, notes } = req.body;

    if (!status) {
        throw new ApiError(400, 'Status is required');
    }

    let inquiry;
    const updateData = { status, notes: notes || undefined };

    switch (type) {
        case 'credit-check':
            inquiry = await prisma.creditCheckInquiry.update({
                where: { id },
                data: updateData,
            });
            break;
        case 'contact':
            inquiry = await prisma.contactInquiry.update({
                where: { id },
                data: updateData,
            });
            break;
        case 'home-loan':
            inquiry = await prisma.homeLoanInquiry.update({
                where: { id },
                data: updateData,
            });
            break;
        case 'referral':
            inquiry = await prisma.referralInquiry.update({
                where: { id },
                data: updateData,
            });
            break;
        default:
            throw new ApiError(400, 'Invalid inquiry type');
    }

    logDataAccess('update_status', type, id, req.admin.id);

    res.status(200).json(
        new ApiResponsive(200, inquiry, 'Inquiry status updated')
    );
});

// ================================================================================
// DASHBOARD
// ================================================================================

/**
 * Get comprehensive dashboard stats
 * 
 * @route GET /api/admin/dashboard/comprehensive
 * @access Protected
 */
export const getComprehensiveDashboard = asyncHandler(async (req, res) => {
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
        prisma.user.count({ where: { isDeleted: false } }),
        prisma.cibilData.count({ where: { isDeleted: false } }),
        prisma.loan.count(),
        prisma.loan.count({ where: { status: 'PENDING' } }),
        prisma.user.count({ where: { isVerified: true, isDeleted: false } }),
        prisma.user.count({
            where: {
                createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
                isDeleted: false
            }
        }),
        prisma.cibilData.count({
            where: {
                isSubmitted: true,
                createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
                isDeleted: false
            }
        }),
        prisma.loan.count({
            where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } }
        })
    ]);

    // Recent users (last 5) - NO decryption for dashboard performance
    const recentUsers = await prisma.user.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
            id: true,
            phoneNumber: true,
            lastLogin: true,
            isVerified: true,
            createdAt: true,
        }
    });

    const loanDistribution = await prisma.loan.groupBy({
        by: ['status'],
        _count: { status: true }
    });

    const submitted = await prisma.cibilData.count({
        where: { isSubmitted: true, isDeleted: false }
    });
    const unsubmitted = await prisma.cibilData.count({
        where: { isSubmitted: false, isDeleted: false }
    });
    const cibilDistribution = { submitted, unsubmitted };

    const today = new Date();
    const days = 7;
    const activityData = [];

    for (let i = days - 1; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        const start = new Date(day.setHours(0, 0, 0, 0));
        const end = new Date(day.setHours(23, 59, 59, 999));

        const [users, cibilChecks, loans] = await Promise.all([
            prisma.user.count({
                where: { createdAt: { gte: start, lte: end }, isDeleted: false }
            }),
            prisma.cibilData.count({
                where: { createdAt: { gte: start, lte: end }, isDeleted: false }
            }),
            prisma.loan.count({ where: { createdAt: { gte: start, lte: end } } }),
        ]);

        activityData.push({ date: start, users, cibilChecks, loans });
    }

    logDataAccess('view_dashboard', 'Dashboard', 'comprehensive', req.admin.id);

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
    }, 'Comprehensive dashboard data fetched'));
});
