import { PrismaClient } from "@prisma/client";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { isValidIndianNumber } from "../utils/validation.js";

const prisma = new PrismaClient();

// ================== Create Referral Inquiry ==================

export const createReferralInquiry = async (req, res) => {
    try {
        const {
            referrerName, referrerPhone, referrerEmail,
            refereeName, refereePhone, refereeEmail,
            relationship, loanType, remarks
        } = req.body;

        // Validate required fields
        if (!referrerName || !referrerPhone || !refereeName || !refereePhone) {
            return res.status(400).json({
                success: false,
                error: "Referrer name, phone and referee name, phone are required",
            });
        }

        if (!isValidIndianNumber(referrerPhone)) {
            return res.status(400).json({ success: false, error: "Invalid referrer phone number" });
        }
        if (!isValidIndianNumber(refereePhone)) {
            return res.status(400).json({ success: false, error: "Invalid referee phone number" });
        }

        const inquiry = await prisma.referralInquiry.create({
            data: {
                referrerName,
                referrerPhone,
                referrerEmail: referrerEmail || null,
                refereeName,
                refereePhone,
                refereeEmail: refereeEmail || null,
                relationship: relationship || null,
                loanType: loanType || null,
                remarks: remarks || null,
                ipAddress: req.ip || req.headers["x-forwarded-for"] || null,
                userAgent: req.headers["user-agent"] || null,
            },
        });

        return res.status(201).json(
            new ApiResponsive(201, inquiry, "Referral inquiry created successfully")
        );
    } catch (error) {
        console.error("Error creating referral inquiry:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to create referral inquiry",
        });
    }
};

// ================== Get All Referral Inquiries (Admin) ==================

export const getAllReferralInquiries = async (req, res) => {
    try {
        const { status, page = 1, limit = 20, search, dateFrom, dateTo } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {};

        // Status filter
        if (status) where.status = status;

        // Search filter (referrer/referee name or phone)
        if (search) {
            where.OR = [
                { referrerName: { contains: search, mode: 'insensitive' } },
                { referrerPhone: { contains: search } },
                { refereeName: { contains: search, mode: 'insensitive' } },
                { refereePhone: { contains: search } },
            ];
        }

        // Date range filter
        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom) where.createdAt.gte = new Date(dateFrom);
            if (dateTo) where.createdAt.lte = new Date(dateTo);
        }

        const [inquiries, total] = await Promise.all([
            prisma.referralInquiry.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: parseInt(limit),
            }),
            prisma.referralInquiry.count({ where }),
        ]);

        return res.status(200).json(
            new ApiResponsive(200, {
                inquiries,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            }, "Referral inquiries fetched successfully")
        );
    } catch (error) {
        console.error("Error fetching referral inquiries:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch referral inquiries",
        });
    }
};

// ================== Bulk Delete Referral Inquiries (Admin) ==================

export const bulkDeleteReferralInquiries = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                error: "Array of IDs is required",
            });
        }

        const result = await prisma.referralInquiry.deleteMany({
            where: { id: { in: ids } },
        });

        return res.status(200).json(
            new ApiResponsive(200, { deletedCount: result.count }, `Successfully deleted ${result.count} referral inquiries`)
        );
    } catch (error) {
        console.error("Error bulk deleting referral inquiries:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to delete referral inquiries",
        });
    }
};

// ================== Update Referral Status (Admin) ==================

export const updateReferralStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                error: "Status is required",
            });
        }

        const inquiry = await prisma.referralInquiry.update({
            where: { id },
            data: {
                status,
                notes: notes || undefined
            },
        });

        return res.status(200).json(
            new ApiResponsive(200, inquiry, "Referral status updated successfully")
        );
    } catch (error) {
        console.error("Error updating referral status:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to update referral status",
        });
    }
};

// ================== Get Referral Stats (Admin) ==================

export const getReferralStats = async (req, res) => {
    try {
        const [total, pending, contacted, completed] = await Promise.all([
            prisma.referralInquiry.count(),
            prisma.referralInquiry.count({ where: { status: "PENDING" } }),
            prisma.referralInquiry.count({ where: { status: "CONTACTED" } }),
            prisma.referralInquiry.count({ where: { status: "COMPLETED" } }),
        ]);

        return res.status(200).json(
            new ApiResponsive(200, {
                total,
                pending,
                contacted,
                completed,
            }, "Referral stats fetched successfully")
        );
    } catch (error) {
        console.error("Error fetching referral stats:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch referral stats",
        });
    }
};
