import express from "express";
import { prisma } from "../config/db.js";


const router = express.Router();

import {
    getClientIp,
    getUserAgent,
    parseDeviceInfo
} from "../middleware/consentMiddleware.js";

// Track page view - Public endpoint
router.post("/page-view", async (req, res) => {
    try {
        const { sessionId, page, timestamp, referrer } = req.body;

        if (!sessionId || !page) {
            return res.status(400).json({
                success: false,
                error: "sessionId and page are required"
            });
        }

        const ipAddress = getClientIp(req);
        const userAgent = getUserAgent(req);
        const deviceInfo = parseDeviceInfo(userAgent);
        const now = new Date(timestamp || Date.now());

        // Find or create anonymous session (handle race: another request may create same sessionId)
        let session = await prisma.userSession.findFirst({
            where: { sessionId }
        });

        let createdNew = false;
        if (!session) {
            try {
                session = await prisma.userSession.create({
                    data: {
                        sessionId,
                        ipAddress,
                        userAgent,
                        deviceInfo: JSON.stringify(deviceInfo),
                        startTime: now,
                        lastActivity: now,
                        isActive: true,
                        totalPageViews: 1,
                        pagesVisited: [{
                            page,
                            enteredAt: now,
                            referrer: referrer || null,
                        }],
                    },
                });
                createdNew = true;
            } catch (createErr) {
                if (createErr.code === 'P2002' && createErr.meta?.target?.includes('sessionId')) {
                    session = await prisma.userSession.findFirst({ where: { sessionId } });
                    if (!session) throw createErr;
                } else {
                    throw createErr;
                }
            }
        }

        if (session && !createdNew) {
            // Update existing session
            let pagesVisited = Array.isArray(session.pagesVisited)
                ? session.pagesVisited
                : [];

            if (pagesVisited.length > 0 && !pagesVisited[pagesVisited.length - 1].leftAt) {
                pagesVisited[pagesVisited.length - 1].leftAt = now;
            }

            pagesVisited.push({
                page,
                enteredAt: now,
                referrer: referrer || null,
            });

            session = await prisma.userSession.update({
                where: { id: session.id },
                data: {
                    lastActivity: now,
                    totalPageViews: { increment: 1 },
                    pagesVisited: pagesVisited,
                    ipAddress,
                    deviceInfo: JSON.stringify(deviceInfo),
                },
            });
        }

        return res.status(200).json({
            success: true,
            message: "Page view tracked",
            data: {
                sessionId: session.sessionId,
                page,
                deviceInfo,
            }
        });
    } catch (error) {
        console.error("Tracking error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to track page view"
        });
    }
});

// Get session details - Admin endpoint (optional)
router.get("/sessions", async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [sessions, total] = await Promise.all([
            prisma.userSession.findMany({
                orderBy: { lastActivity: 'desc' },
                skip,
                take: parseInt(limit),
            }),
            prisma.userSession.count(),
        ]);

        return res.status(200).json({
            success: true,
            data: {
                sessions,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            }
        });
    } catch (error) {
        console.error("Error fetching sessions:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to fetch sessions"
        });
    }
});

export default router;
