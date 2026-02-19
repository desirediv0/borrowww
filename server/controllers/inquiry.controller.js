import { PrismaClient } from "@prisma/client";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { isValidIndianNumber } from "../utils/validation.js";
import { decryptFields, SENSITIVE_FIELDS } from "../utils/kms.util.js";

const prisma = new PrismaClient();

// ================== Credit Check Inquiry ==================

// Create credit check inquiry
export const createCreditCheckInquiry = async (req, res) => {
    try {
        const { firstName, mobileNumber, consent } = req.body;

        if (!firstName || !mobileNumber) {
            return res.status(400).json({
                success: false,
                error: "First name and mobile number are required",
            });
        }

        if (!isValidIndianNumber(mobileNumber)) {
            return res.status(400).json({ success: false, error: "Invalid mobile number" });
        }

        const inquiry = await prisma.creditCheckInquiry.create({
            data: {
                firstName,
                mobileNumber,
                consent: consent || true,
                ipAddress: req.ip || req.headers["x-forwarded-for"] || null,
                userAgent: req.headers["user-agent"] || null,
            },
        });

        return res.status(201).json(
            new ApiResponsive(201, inquiry, "Credit check inquiry created successfully")
        );
    } catch (error) {
        console.error("Error creating credit check inquiry:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to create credit check inquiry",
        });
    }
};

// Get all credit check inquiries (admin) - with search, date filters
export const getAllCreditCheckInquiries = async (req, res) => {
    try {
        const { status, page = 1, limit = 20, search, dateFrom, dateTo } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {};

        // Status filter
        if (status) where.status = status;

        // Search filter (name or phone)
        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { mobileNumber: { contains: search } },
            ];
        }

        // Date range filter
        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom) where.createdAt.gte = new Date(dateFrom);
            if (dateTo) where.createdAt.lte = new Date(dateTo);
        }

        const [inquiries, total] = await Promise.all([
            prisma.creditCheckInquiry.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: parseInt(limit),
            }),
            prisma.creditCheckInquiry.count({ where }),
        ]);

        const decryptedInquiries = await Promise.all(
            inquiries.map(item => decryptFields(item, SENSITIVE_FIELDS.CreditCheckInquiry))
        );

        return res.status(200).json(
            new ApiResponsive(200, {
                inquiries: decryptedInquiries,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            }, "Credit check inquiries fetched successfully")
        );
    } catch (error) {
        console.error("Error fetching credit check inquiries:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch credit check inquiries",
        });
    }
};

// Bulk delete credit check inquiries (admin)
export const bulkDeleteCreditCheckInquiries = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                error: "Array of IDs is required",
            });
        }

        const result = await prisma.creditCheckInquiry.deleteMany({
            where: { id: { in: ids } },
        });

        return res.status(200).json(
            new ApiResponsive(200, { deletedCount: result.count }, `Successfully deleted ${result.count} credit check inquiries`)
        );
    } catch (error) {
        console.error("Error bulk deleting credit check inquiries:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to delete credit check inquiries",
        });
    }
};

// ================== Contact Inquiry ==================

// Create contact inquiry
export const createContactInquiry = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: "Name, email, and message are required",
            });
        }

        if (phone && !isValidIndianNumber(phone)) {
            return res.status(400).json({ success: false, error: "Invalid phone number" });
        }

        const inquiry = await prisma.contactInquiry.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject: subject || null,
                message,
                ipAddress: req.ip || req.headers["x-forwarded-for"] || null,
                userAgent: req.headers["user-agent"] || null,
            },
        });

        return res.status(201).json(
            new ApiResponsive(201, inquiry, "Contact inquiry created successfully")
        );
    } catch (error) {
        console.error("Error creating contact inquiry:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to create contact inquiry",
        });
    }
};

// Get all contact inquiries (admin) - with search, date filters
export const getAllContactInquiries = async (req, res) => {
    try {
        const { status, page = 1, limit = 20, search, dateFrom, dateTo } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {};

        // Status filter
        if (status) where.status = status;

        // Search filter (name, email, or phone)
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search } },
            ];
        }

        // Date range filter
        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom) where.createdAt.gte = new Date(dateFrom);
            if (dateTo) where.createdAt.lte = new Date(dateTo);
        }

        const [inquiries, total] = await Promise.all([
            prisma.contactInquiry.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: parseInt(limit),
            }),
            prisma.contactInquiry.count({ where }),
        ]);

        const decryptedInquiries = await Promise.all(
            inquiries.map(item => decryptFields(item, SENSITIVE_FIELDS.ContactInquiry))
        );

        return res.status(200).json(
            new ApiResponsive(200, {
                inquiries: decryptedInquiries,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            }, "Contact inquiries fetched successfully")
        );
    } catch (error) {
        console.error("Error fetching contact inquiries:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch contact inquiries",
        });
    }
};

// Bulk delete contact inquiries (admin)
export const bulkDeleteContactInquiries = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                error: "Array of IDs is required",
            });
        }

        const result = await prisma.contactInquiry.deleteMany({
            where: { id: { in: ids } },
        });

        return res.status(200).json(
            new ApiResponsive(200, { deletedCount: result.count }, `Successfully deleted ${result.count} contact inquiries`)
        );
    } catch (error) {
        console.error("Error bulk deleting contact inquiries:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to delete contact inquiries",
        });
    }
};

// ================== Home Loan Inquiry ==================

// Create home loan inquiry
export const createHomeLoanInquiry = async (req, res) => {
    try {
        const { name, phone, city, propertyType, loanAmount, duration, monthlyIncome, employmentType, remarks } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                error: "Name and phone are required",
            });
        }

        if (!isValidIndianNumber(phone)) {
            return res.status(400).json({ success: false, error: "Invalid phone number" });
        }

        const inquiry = await prisma.homeLoanInquiry.create({
            data: {
                name,
                phone,
                city: city || null,
                propertyType: propertyType || null,
                loanAmount: loanAmount || null,
                duration: duration || null,
                monthlyIncome: monthlyIncome || null,
                employmentType: employmentType || null,
                remarks: remarks || null,
                ipAddress: req.ip || req.headers["x-forwarded-for"] || null,
                userAgent: req.headers["user-agent"] || null,
            },
        });

        return res.status(201).json(
            new ApiResponsive(201, inquiry, "Home loan inquiry created successfully")
        );
    } catch (error) {
        console.error("Error creating home loan inquiry:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to create home loan inquiry",
        });
    }
};

// Get all home loan inquiries (admin) - with search, date filters
export const getAllHomeLoanInquiries = async (req, res) => {
    try {
        const { status, page = 1, limit = 20, search, dateFrom, dateTo } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {};

        // Status filter
        if (status) where.status = status;

        // Search filter (name, phone, or city)
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search } },
                { city: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Date range filter
        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom) where.createdAt.gte = new Date(dateFrom);
            if (dateTo) where.createdAt.lte = new Date(dateTo);
        }

        const [inquiries, total] = await Promise.all([
            prisma.homeLoanInquiry.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: parseInt(limit),
            }),
            prisma.homeLoanInquiry.count({ where }),
        ]);

        const decryptedInquiries = await Promise.all(
            inquiries.map(item => decryptFields(item, SENSITIVE_FIELDS.HomeLoanInquiry))
        );

        return res.status(200).json(
            new ApiResponsive(200, {
                inquiries: decryptedInquiries,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            }, "Home loan inquiries fetched successfully")
        );
    } catch (error) {
        console.error("Error fetching home loan inquiries:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch home loan inquiries",
        });
    }
};

// Bulk delete home loan inquiries (admin)
export const bulkDeleteHomeLoanInquiries = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                error: "Array of IDs is required",
            });
        }

        const result = await prisma.homeLoanInquiry.deleteMany({
            where: { id: { in: ids } },
        });

        return res.status(200).json(
            new ApiResponsive(200, { deletedCount: result.count }, `Successfully deleted ${result.count} home loan inquiries`)
        );
    } catch (error) {
        console.error("Error bulk deleting home loan inquiries:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to delete home loan inquiries",
        });
    }
};

// ================== Update Inquiry Status ==================

export const updateInquiryStatus = async (req, res) => {
    try {
        const { type, id } = req.params;
        const { status, notes } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                error: "Status is required",
            });
        }

        let inquiry;

        switch (type) {
            case "credit-check":
                inquiry = await prisma.creditCheckInquiry.update({
                    where: { id },
                    data: { status, notes: notes || undefined },
                });
                break;
            case "contact":
                inquiry = await prisma.contactInquiry.update({
                    where: { id },
                    data: { status, notes: notes || undefined },
                });
                break;
            case "home-loan":
                inquiry = await prisma.homeLoanInquiry.update({
                    where: { id },
                    data: { status, notes: notes || undefined },
                });
                break;
            default:
                return res.status(400).json({
                    success: false,
                    error: "Invalid inquiry type",
                });
        }

        return res.status(200).json(
            new ApiResponsive(200, inquiry, "Inquiry status updated successfully")
        );
    } catch (error) {
        console.error("Error updating inquiry status:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to update inquiry status",
        });
    }
};

// ================== Get Dashboard Stats ==================

// ================== Get Dashboard Stats ==================

export const getDashboardStats = async (req, res) => {
    try {
        const [
            creditCheckCount,
            contactCount,
            homeLoanCount,
            recentCreditCheck,
            recentContact,
            recentHomeLoan,
        ] = await Promise.all([
            prisma.creditCheckInquiry.count(),
            prisma.contactInquiry.count(),
            prisma.homeLoanInquiry.count(),
            prisma.creditCheckInquiry.findMany({
                orderBy: { createdAt: "desc" },
                take: 5,
            }),
            prisma.contactInquiry.findMany({
                orderBy: { createdAt: "desc" },
                take: 5,
            }),
            prisma.homeLoanInquiry.findMany({
                orderBy: { createdAt: "desc" },
                take: 5,
            }),
        ]);

        // Decrypt data for display
        const decryptedRecentCreditCheck = await Promise.all(
            recentCreditCheck.map(item => decryptFields(item, SENSITIVE_FIELDS.CreditCheckInquiry))
        );

        const decryptedRecentContact = await Promise.all(
            recentContact.map(item => decryptFields(item, SENSITIVE_FIELDS.ContactInquiry))
        );

        const decryptedRecentHomeLoan = await Promise.all(
            recentHomeLoan.map(item => decryptFields(item, SENSITIVE_FIELDS.HomeLoanInquiry))
        );

        return res.status(200).json(
            new ApiResponsive(200, {
                counts: {
                    creditCheck: creditCheckCount,
                    contact: contactCount,
                    homeLoan: homeLoanCount,
                    total: creditCheckCount + contactCount + homeLoanCount,
                },
                recentInquiries: {
                    creditCheck: decryptedRecentCreditCheck,
                    contact: decryptedRecentContact,
                    homeLoan: decryptedRecentHomeLoan,
                },
            }, "Dashboard stats fetched successfully")
        );
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch dashboard stats",
        });
    }
};
