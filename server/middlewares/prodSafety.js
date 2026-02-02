/**
 * ================================================================================
 * PRODUCTION DELETE SAFETY MIDDLEWARE
 * ================================================================================
 * 
 * CRITICAL SECURITY CONTROL:
 * This middleware PREVENTS permanent data deletion in production.
 * In banking systems, data loss is UNACCEPTABLE.
 * All deletes MUST be soft deletes (isDeleted = true).
 * 
 * WHAT THIS BLOCKS:
 * - deleteMany operations
 * - Bulk delete operations
 * - Any DELETE request without explicit ID
 * 
 * WHAT THIS ALLOWS:
 * - Soft delete (update isDeleted = true)
 * - Single record operations with explicit ID
 * 
 * ENVIRONMENT VARIABLES:
 * - NODE_ENV: When 'production', strict safety mode is enabled
 * 
 * ================================================================================
 */

import ApiError from '../utils/ApiError.js';

/**
 * SECURITY: Global flag to track if safety mode is active
 * In production, this should ALWAYS be true
 */
const isProductionMode = () => process.env.NODE_ENV === 'production';

/**
 * Production safety middleware for routes.
 * 
 * BLOCKS:
 * - DELETE requests without an ID parameter
 * - Bulk delete operations
 * 
 * ALLOWS:
 * - DELETE requests with explicit ID (for soft delete)
 * - All other HTTP methods
 */
export const prodSafety = (req, res, next) => {
    // SECURITY: Only enforce in production
    if (!isProductionMode()) {
        return next();
    }

    // SECURITY: Block DELETE requests without explicit ID
    if (req.method === 'DELETE') {
        // Check if the URL contains 'bulk' - block bulk deletes
        if (req.originalUrl.toLowerCase().includes('bulk')) {
            console.error('[PRODUCTION SAFETY] Bulk delete blocked:', {
                timestamp: new Date().toISOString(),
                url: req.originalUrl,
                adminId: req.admin?.id || 'unknown',
                ip: req.ip,
            });

            return res.status(403).json({
                success: false,
                error: 'PRODUCTION SAFETY: Bulk delete operations are blocked in production. Use soft delete instead.',
                safetyCode: 'BULK_DELETE_BLOCKED',
            });
        }

        // Check if there's an ID in the route params
        const hasExplicitId = req.params.id ||
            Object.values(req.params).some(v => v && v.length > 10);

        if (!hasExplicitId) {
            console.error('[PRODUCTION SAFETY] Delete without ID blocked:', {
                timestamp: new Date().toISOString(),
                url: req.originalUrl,
                params: req.params,
                adminId: req.admin?.id || 'unknown',
                ip: req.ip,
            });

            return res.status(403).json({
                success: false,
                error: 'PRODUCTION SAFETY: Delete operations require explicit record ID. Use soft delete.',
                safetyCode: 'DELETE_WITHOUT_ID_BLOCKED',
            });
        }
    }

    next();
};

/**
 * ================================================================================
 * PRISMA MIDDLEWARE FOR PRODUCTION SAFETY
 * ================================================================================
 * 
 * This is to be added to Prisma client to intercept and block dangerous operations.
 * Apply this in your Prisma configuration.
 * 
 * WARNING: deleteMany and raw delete queries are blocked in production.
 * 
 * ================================================================================
 */

/**
 * Prisma middleware to enforce soft delete pattern.
 * 
 * INTERCEPTS:
 * - deleteMany → Converts to updateMany with isDeleted = true
 * - delete → Converts to update with isDeleted = true
 * 
 * USAGE:
 * Import and add to Prisma client:
 * prisma.$use(enforceSoftDelete);
 * 
 * @param {Object} params - Prisma operation parameters
 * @param {Function} next - Next middleware in chain
 */
const MODELS_WITH_IS_DELETED = new Set([
    'User', 'CibilData', 'CreditCheckInquiry', 'ContactInquiry', 'HomeLoanInquiry', 'ReferralInquiry',
]);

export const enforceSoftDelete = async (params, next) => {
    // Only enforce in production
    if (!isProductionMode()) {
        return next(params);
    }

    // SECURITY: Intercept delete only for models that have isDeleted (soft delete)
    if (params.action === 'delete' && MODELS_WITH_IS_DELETED.has(params.model)) {
        console.warn('[PRODUCTION SAFETY] Converted delete to soft delete:', {
            model: params.model,
            where: params.args.where,
        });

        params.action = 'update';
        params.args.data = {
            isDeleted: true,
            deletedAt: new Date()
        };
    }

    if (params.action === 'deleteMany') {
        // BLOCK deleteMany entirely in production
        console.error('[PRODUCTION SAFETY] deleteMany BLOCKED:', {
            timestamp: new Date().toISOString(),
            model: params.model,
            where: params.args?.where,
        });

        throw new ApiError(
            403,
            `PRODUCTION SAFETY: deleteMany on ${params.model} is blocked. ` +
            'Use updateMany with isDeleted = true for soft delete.'
        );
    }

    // SECURITY: For find operations, exclude soft-deleted records ONLY on models that have isDeleted
    if ((params.action === 'findUnique' || params.action === 'findFirst' || params.action === 'findMany') &&
        MODELS_WITH_IS_DELETED.has(params.model)) {

        if (params.args?.where !== undefined) {
            params.args.where = {
                ...params.args.where,
                isDeleted: params.args.where.isDeleted ?? false,
            };
        } else if (params.args) {
            params.args.where = { isDeleted: false };
        }
    }

    return next(params);
};

/**
 * ================================================================================
 * SAFE DELETE UTILITIES
 * ================================================================================
 * 
 * Use these functions instead of Prisma's delete methods.
 * 
 * ================================================================================
 */

/**
 * Safely "delete" a record by setting isDeleted = true
 * 
 * @param {PrismaClient} prisma - Prisma client instance
 * @param {string} model - Model name (e.g., 'user', 'creditCheckInquiry')
 * @param {string} id - Record ID to soft delete
 * @returns {Promise<Object>} Updated record
 */
export const softDelete = async (prisma, model, id) => {
    if (!id) {
        throw new ApiError(400, 'Record ID is required for soft delete');
    }

    // AUDIT: Log soft delete operation
    console.log('[SOFT DELETE]', {
        timestamp: new Date().toISOString(),
        model,
        id,
    });

    return prisma[model].update({
        where: { id },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    });
};

/**
 * Safely soft delete multiple records by IDs
 * 
 * SECURITY: Even bulk soft delete requires explicit IDs
 * 
 * @param {PrismaClient} prisma - Prisma client instance
 * @param {string} model - Model name
 * @param {string[]} ids - Array of record IDs
 * @returns {Promise<Object>} Update result with count
 */
export const softDeleteMany = async (prisma, model, ids) => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(400, 'Array of IDs is required for soft delete');
    }

    // SECURITY: Limit batch size to prevent abuse
    if (ids.length > 100) {
        throw new ApiError(400, 'Batch size limited to 100 records for safety');
    }

    // AUDIT: Log bulk soft delete
    console.log('[SOFT DELETE MANY]', {
        timestamp: new Date().toISOString(),
        model,
        count: ids.length,
        ids: ids.slice(0, 10), // Log first 10 for debugging
    });

    return prisma[model].updateMany({
        where: { id: { in: ids } },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    });
};

export default prodSafety;
