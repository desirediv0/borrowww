import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";
import { ApiError } from "../utils/ApiError.js";
import { deepVueService } from "../services/deepvue.service.js";
import { encryptCibilData, decryptCibilData } from "../services/encryption.service.js";

// User: Submit CIBIL data and create DeepVue session
export const userSummitCibil = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body || {};

    // Required fields for summit (simplified)
    const required = ["firstName", "mobileNumber"];
    for (const field of required) {
        if (!data[field]) {
            return res.status(400).json(new ApiResponsive(400, null, `Missing required field: ${field}`));
        }
    }

    // Check for valid cached data first (within 28 days)
    const cachedData = await prisma.cibilData.findFirst({
        where: {
            userId,
            mobileNumber: data.mobileNumber,
            isCached: true,
            cacheValidUntil: {
                gt: new Date() // Valid until future date
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    if (cachedData) {
        // Return cached data instead of making new API call
        const decryptedData = decryptCibilData(cachedData);
        return res.json(new ApiResponsive(200, {
            fromCache: true,
            score: decryptedData.score,
            cibilData: decryptedData,
            pdfUrl: cachedData.pdfUrl || null, // Use cached PDF URL if available
            validUntil: cachedData.cacheValidUntil,
            message: "Returning cached CIBIL data to save API costs"
        }, "CIBIL data retrieved from cache"));
    }

    try {
        // Create DeepVue session for fresh data
        const sessionResponse = await deepVueService.createCibilSession({
            firstName: data.firstName,
            lastName: data.lastName || data.middleName || "",
            mobileNumber: data.mobileNumber
        });

        if (!sessionResponse.success) {
            throw new ApiError(500, "Failed to create CIBIL check session");
        }

        // Prepare data for storage (simplified)
        let cibilDataToStore = {
            userId,
            firstName: data.firstName,
            middleName: data.middleName || "",
            lastName: data.lastName || "",
            gender: null, // Not required for simplified flow
            dateOfBirth: null,
            panNumber: null,
            identityNumber: data.mobileNumber,
            mobileNumber: data.mobileNumber,
            address: "",
            pincode: "",
            state: "",
            isSubmitted: true,
            status: "PROCESSING",
            transactionId: sessionResponse.transaction_id,
            sessionUrl: sessionResponse.redirect_url,
            lastApiCall: new Date(),
            isCached: false
        };

        // Encrypt sensitive data
        cibilDataToStore = encryptCibilData(cibilDataToStore);

        // Delete old unsubmitted records
        await prisma.cibilData.deleteMany({
            where: { userId, isSubmitted: false }
        });

        // Create new record
        const cibil = await prisma.cibilData.create({
            data: cibilDataToStore
        });

        res.json(new ApiResponsive(200, {
            id: cibil.id,
            redirectUrl: sessionResponse.redirect_url,
            transactionId: sessionResponse.transaction_id,
            status: "PROCESSING"
        }, "CIBIL session created successfully"));

    } catch (error) {
        console.error("CIBIL Summit Error:", error);
        throw new ApiError(500, error.message || "Failed to create CIBIL session");
    }
});

// User: Get user's submitted CIBIL data
export const userGetCibil = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const cibils = await prisma.cibilData.findMany({
        where: { userId, isSubmitted: true },
        orderBy: { createdAt: 'desc' }
    });
    res.json(new ApiResponsive(200, cibils, "CIBIL data fetched successfully"));
});

// User: Get CIBIL report after DeepVue completion
export const userGetCibilReport = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { transactionId } = req.params;

    if (!transactionId) {
        return res.status(400).json(new ApiResponsive(400, null, "Transaction ID is required"));
    }

    try {
        // Find the CIBIL record
        const cibilRecord = await prisma.cibilData.findFirst({
            where: {
                userId,
                transactionId,
                isSubmitted: true
            }
        });

        if (!cibilRecord) {
            return res.status(404).json(new ApiResponsive(404, null, "CIBIL record not found"));
        }

        // If already cached, return cached data
        if (cibilRecord.isCached && cibilRecord.cacheValidUntil > new Date()) {
            const decryptedData = decryptCibilData(cibilRecord);
            return res.json(new ApiResponsive(200, {
                cached: true,
                data: decryptedData,
                validUntil: cibilRecord.cacheValidUntil
            }, "CIBIL report retrieved from cache"));
        }

        // Fetch fresh report from DeepVue
        const reportResponse = await deepVueService.fetchCibilReport(transactionId);

        if (reportResponse.success) {
            // Calculate cache expiry (28 days from now)
            const cacheValidUntil = new Date();
            cacheValidUntil.setDate(cacheValidUntil.getDate() + 28);

            // Update record with fetched data and cache info
            let updateData = {
                score: reportResponse.credit_score || null,
                reportData: JSON.stringify(reportResponse),
                status: "COMPLETED",
                lastApiCall: new Date(),
                isCached: true,
                cacheValidUntil: cacheValidUntil
            };

            // Encrypt before storing
            updateData = encryptCibilData(updateData);

            const updatedRecord = await prisma.cibilData.update({
                where: { id: cibilRecord.id },
                data: updateData
            });

            // Decrypt for response
            const decryptedData = decryptCibilData(updatedRecord);

            return res.json(new ApiResponsive(200, {
                fromCache: false,
                score: decryptedData.score,
                data: decryptedData,
                pdfUrl: reportResponse.pdf_url || null,
                validUntil: cacheValidUntil
            }, "CIBIL report fetched and cached successfully"));
        } else {
            // Update status to failed
            await prisma.cibilData.update({
                where: { id: cibilRecord.id },
                data: {
                    status: "FAILED",
                    lastApiCall: new Date()
                }
            });

            return res.status(500).json(new ApiResponsive(500, null, "Failed to fetch CIBIL report"));
        }

    } catch (error) {
        console.error("Get CIBIL Report Error:", error);
        throw new ApiError(500, error.message || "Failed to retrieve CIBIL report");
    }
});

// Admin functions
export const listCibilData = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const [cibils, total] = await Promise.all([
        prisma.cibilData.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
        prisma.cibilData.count(),
    ]);



    res.json(new ApiResponsive(200, { cibils, total, page, limit }, "CIBIL data fetched successfully"));
});

export const cibilStats = asyncHandler(async (req, res) => {
    const stats = await prisma.cibilData.groupBy({
        by: ['status'],
        _count: { status: true }
    });

    res.json(new ApiResponsive(200, stats, "CIBIL stats fetched successfully"));
});

export const listSubmittedCibil = asyncHandler(async (req, res) => {
    const cibils = await prisma.cibilData.findMany({
        where: { isSubmitted: true },
        orderBy: { createdAt: 'desc' }
    });
    res.json(new ApiResponsive(200, cibils, "Submitted CIBIL data fetched"));
});

export const listUnsubmittedCibil = asyncHandler(async (req, res) => {
    const cibils = await prisma.cibilData.findMany({
        where: { isSubmitted: false },
        orderBy: { createdAt: 'desc' }
    });
    res.json(new ApiResponsive(200, cibils, "Unsubmitted CIBIL data fetched"));
});

export const updateCibilData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedCibil = await prisma.cibilData.update({
        where: { id },
        data: req.body
    });
    res.json(new ApiResponsive(200, updatedCibil, "CIBIL data updated"));
});

export const deleteCibilData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.cibilData.delete({ where: { id } });
    res.json(new ApiResponsive(200, null, "CIBIL data deleted"));
});

export const getUserCibilData = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const cibils = await prisma.cibilData.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
    res.json(new ApiResponsive(200, cibils, "User CIBIL data fetched"));
});

export const createCibilData = asyncHandler(async (req, res) => {
    const cibil = await prisma.cibilData.create({ data: req.body });
    res.json(new ApiResponsive(201, cibil, "CIBIL data created"));
});

export const seedCibilData = asyncHandler(async (req, res) => {
    // Mock seed data functionality
    res.json(new ApiResponsive(200, null, "CIBIL seed completed"));
});

export const getCibilDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cibil = await prisma.cibilData.findUnique({ where: { id } });
    if (!cibil) {
        return res.status(404).json(new ApiResponsive(404, null, "CIBIL data not found"));
    }
    res.json(new ApiResponsive(200, cibil, "CIBIL details fetched"));
});

export const downloadCibilPdf = asyncHandler(async (req, res) => {
    const { transactionId } = req.params;

    try {
        const pdfResult = await deepVueService.downloadCibilPdf(transactionId);

        res.setHeader('Content-Type', pdfResult.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="cibil-report-${transactionId}.pdf"`);
        res.send(pdfResult.pdfBuffer);
    } catch (error) {
        console.error("PDF Download Error:", error);
        res.status(500).json(new ApiResponsive(500, null, "Failed to download PDF"));
    }
});

// Additional user functions
export const userUnsummitCibil = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const cibils = await prisma.cibilData.findMany({
        where: { userId, isSubmitted: false },
        orderBy: { createdAt: 'desc' }
    });
    res.json(new ApiResponsive(200, cibils, "Unsubmitted CIBIL data fetched"));
});

export const fetchCibilResult = asyncHandler(async (req, res, next) => {
    const { transactionId } = req.body;

    if (!transactionId) {
        return res.status(400).json(new ApiResponsive(400, null, "Transaction ID is required"));
    }

    // Set transactionId in params for userGetCibilReport
    req.params.transactionId = transactionId;
    return userGetCibilReport(req, res, next);
});

export const userDeleteUnsummitCibil = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    const cibil = await prisma.cibilData.findFirst({
        where: { id, userId, isSubmitted: false }
    });

    if (!cibil) {
        return res.status(404).json(new ApiResponsive(404, null, "Unsubmitted CIBIL data not found"));
    }

    await prisma.cibilData.delete({ where: { id } });
    res.json(new ApiResponsive(200, null, "Unsubmitted CIBIL data deleted"));
});