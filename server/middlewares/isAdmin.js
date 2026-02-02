/**
 * ================================================================================
 * ADMIN SESSION AUTHENTICATION MIDDLEWARE
 * ================================================================================
 * 
 * SECURITY ARCHITECTURE:
 * - Session-based authentication (NOT JWT in localStorage)
 * - HTTP-only cookies prevent XSS attacks
 * - Secure cookies in production prevent MITM
 * - Server-side session store (PostgreSQL) for session management
 * - Session expiry for automatic logout
 * 
 * WHY SESSION-BASED OVER JWT:
 * - Sessions can be invalidated server-side immediately
 * - No token exposure in client-side JavaScript
 * - Better for banking/compliance (revocation capability)
 * - Session data stays on server, not in client
 * 
 * ENVIRONMENT VARIABLES REQUIRED:
 * - ADMIN_SESSION_SECRET: Strong random string for session signing
 * - NODE_ENV: Must be 'production' for secure cookies
 * 
 * ================================================================================
 */

import { prisma } from '../config/db.js';
import ApiError from '../utils/ApiError.js';
import { logDataAccess } from '../utils/kms.util.js';

/**
 * Validate admin session and authorize request.
 * 
 * SECURITY CHECKS:
 * 1. Session exists and is valid
 * 2. Admin exists in database
 * 3. Admin account is active
 * 4. Session has admin role
 * 
 * @throws {ApiError} 401 if not authenticated or not admin
 */
export const isAdmin = async (req, res, next) => {
    try {
        // SECURITY: Check if session exists
        if (!req.session || !req.session.adminId) {
            throw new ApiError(401, 'Authentication required. Please login.');
        }

        // SECURITY: Verify session has admin role
        if (req.session.role !== 'admin') {
            // AUDIT: Log unauthorized access attempt
            console.error('[SECURITY ALERT] Non-admin session attempted admin access:', {
                timestamp: new Date().toISOString(),
                sessionId: req.session.id,
                attemptedRole: req.session.role,
                ip: req.ip,
            });
            throw new ApiError(403, 'Access denied. Admin privileges required.');
        }

        // SECURITY: Fetch admin from database to verify they still exist and are active
        // This prevents deleted/deactivated admins from using existing sessions
        const admin = await prisma.admin.findUnique({
            where: { id: req.session.adminId },
            select: {
                id: true,
                email: true,
                name: true,
                isActive: true,
            },
        });

        if (!admin) {
            // Admin was deleted but session still exists - destroy session
            req.session.destroy();
            throw new ApiError(401, 'Account not found. Session terminated.');
        }

        if (!admin.isActive) {
            // Admin was deactivated - destroy session
            req.session.destroy();
            throw new ApiError(401, 'Account deactivated. Contact super admin.');
        }

        // SECURITY: Attach admin to request for downstream use
        req.admin = admin;

        // AUDIT: Log successful admin access (for sensitive operations)
        // This creates an audit trail for compliance
        logDataAccess('admin_access', 'session', req.session.id, admin.id);

        next();
    } catch (error) {
        // Pass through ApiError, wrap others
        if (error instanceof ApiError) {
            next(error);
        } else {
            console.error('[ADMIN AUTH ERROR]', error);
            next(new ApiError(500, 'Authentication service error'));
        }
    }
};

/**
 * Optional: Check if admin has specific permissions
 * Use for role-based access control (RBAC) if needed in future
 * 
 * @param {string[]} requiredPermissions - Array of permission strings
 */
export const hasPermission = (requiredPermissions) => {
    return async (req, res, next) => {
        // Ensure isAdmin ran first
        if (!req.admin) {
            return next(new ApiError(401, 'Authentication required'));
        }

        // Future: Check req.admin.permissions against requiredPermissions
        // For now, all authenticated admins have full access
        next();
    };
};

export default isAdmin;
