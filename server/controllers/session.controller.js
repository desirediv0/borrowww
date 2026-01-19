


import { prisma } from "../config/db.js";
import {
    isTrackingAllowed,
    getClientIp,
    getUserAgent,
    parseDeviceInfo
} from "../middleware/consentMiddleware.js";

// Create a new session (called on login)
export const createSession = async (req, res) => {
    try {
        // Check if tracking is allowed
        if (!isTrackingAllowed(req)) {
            return res.status(403).json({
                error: 'Tracking consent required. Please accept cookies to enable session tracking.',
                requiresConsent: true
            });
        }

        const { sessionId, userId } = req.body;
        const ipAddress = getClientIp(req);
        const userAgent = getUserAgent(req);
        const deviceInfo = parseDeviceInfo(userAgent);

        const session = await prisma.userSession.create({
            data: {
                sessionId,
                userId,
                ipAddress,
                userAgent,
                deviceInfo,
                startTime: new Date(),
                lastActivity: new Date(),
                isActive: true,
                totalPageViews: 0,
                pagesVisited: [],
            },
        });
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// End a session (called on logout or timeout)
export const endSession = async (req, res) => {
    try {
        const { sessionId, pagesVisited } = req.body;
        const updateData = { isActive: false, endTime: new Date() };
        if (pagesVisited && Array.isArray(pagesVisited)) {
            updateData.pagesVisited = { set: pagesVisited };
        }
        const session = await prisma.userSession.updateMany({
            where: { sessionId, isActive: true },
            data: updateData,
        });
        res.json({ success: true, session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update session activity (page view, last activity)
export const updateSession = async (req, res) => {
    try {
        // Check if tracking is allowed
        if (!isTrackingAllowed(req)) {
            return res.status(403).json({
                error: 'Tracking consent required. Please accept cookies to enable session tracking.',
                requiresConsent: true
            });
        }

        const { sessionId, currentPage, url } = req.body;
        // Get the current session to read existing pagesVisited
        const existingSession = await prisma.userSession.findFirst({
            where: { sessionId, isActive: true },
        });
        if (!existingSession) {
            return res.status(404).json({ error: 'Session not found' });
        }
        let prevPages = Array.isArray(existingSession.pagesVisited) ? existingSession.pagesVisited : [];
        const now = new Date();
        // Only add a new page if it's different from the last one
        if (
            prevPages.length === 0 ||
            prevPages[prevPages.length - 1].page !== currentPage
        ) {
            // Set leftAt for the last page
            if (prevPages.length > 0 && !prevPages[prevPages.length - 1].leftAt) {
                prevPages[prevPages.length - 1].leftAt = now;
            }
            // Add new page entry
            prevPages.push({
                page: currentPage,
                url: url || '',
                enteredAt: now,
                leftAt: null,
            });
        } else {
            // If same page, just update leftAt to null (still active)
            prevPages[prevPages.length - 1].leftAt = null;
        }
        await prisma.userSession.update({
            where: { id: existingSession.id },
            data: {
                lastActivity: now,
                currentPage,
                totalPageViews: { increment: 1 },
                pagesVisited: { set: prevPages },
            },
        });
        // Fetch the session again to get the real array
        const session = await prisma.userSession.findUnique({
            where: { id: existingSession.id }
        });
        res.json({ success: true, session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get all sessions (admin)
export const getAllSessions = async (req, res) => {
    try {
        const sessions = await prisma.userSession.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        middleName: true,
                        lastName: true,
                        phoneNumber: true,
                    }
                }
            },
            orderBy: { lastActivity: 'desc' },
        });
        // Ensure pagesVisited is always an array and sorted by enteredAt
        const sessionsWithPages = sessions.map(s => {
            let pages = [];
            if (Array.isArray(s.pagesVisited)) {
                pages = s.pagesVisited;
            } else if (s.pagesVisited && typeof s.pagesVisited === 'object' && Array.isArray(s.pagesVisited.set)) {
                pages = s.pagesVisited.set;
            }
            // Sort and take last 4
            const sortedPages = pages.sort((a, b) => new Date(a.enteredAt || a.timestamp) - new Date(b.enteredAt || b.timestamp));
            const last4 = sortedPages.slice(-4);
            // Add userType for admin clarity
            let userType = 'non-user';
            if (s.userId && s.user) userType = 'user';
            else if (s.userId && !s.user) userType = 'user-deleted';
            return {
                ...s,
                pagesVisited: last4,
                userType,
            };
        });
        res.json(sessionsWithPages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get sessions for a user (user or admin)
export const getUserSessions = async (req, res) => {
    try {
        const userId = req.params.userId || req.user.id;
        const sessions = await prisma.userSession.findMany({
            where: { userId },
            orderBy: { lastActivity: 'desc' },
        });
        // Ensure pagesVisited is always an array and sorted by timestamp
        const sessionsWithPages = sessions.map(s => ({
            ...s,
            pagesVisited: Array.isArray(s.pagesVisited)
                ? [...s.pagesVisited].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                : [],
        }));
        res.json(sessionsWithPages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get current active session for a user
export const getActiveSession = async (req, res) => {
    try {
        const userId = req.user.id;
        const session = await prisma.userSession.findFirst({
            where: { userId, isActive: true },
            orderBy: { lastActivity: 'desc' },
        });
        res.json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Create a new anonymous session (no userId required)
export const createAnonSession = async (req, res) => {
    try {
        // Check if tracking is allowed
        if (!isTrackingAllowed(req)) {
            return res.status(403).json({
                error: 'Tracking consent required. Please accept cookies to enable session tracking.',
                requiresConsent: true
            });
        }

        const { sessionId, currentPage, referrer } = req.body;
        const ipAddress = getClientIp(req);
        const userAgent = getUserAgent(req);
        const deviceInfo = parseDeviceInfo(userAgent);

        const session = await prisma.userSession.create({
            data: {
                sessionId,
                userId: null,
                ipAddress,
                userAgent,
                deviceInfo,
                startTime: new Date(),
                lastActivity: new Date(),
                isActive: true,
                totalPageViews: 0,
                pagesVisited: [],
            },
        });
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// End an anonymous session
export const endAnonSession = async (req, res) => {
    try {
        // Check if tracking is allowed
        if (!isTrackingAllowed(req)) {
            return res.status(403).json({
                error: 'Tracking consent required. Please accept cookies to enable session tracking.',
                requiresConsent: true
            });
        }

        const { sessionId, pagesVisited } = req.body;
        const updateData = { isActive: false, endTime: new Date() };
        if (pagesVisited && Array.isArray(pagesVisited)) {
            updateData.pagesVisited = { set: pagesVisited };
        }
        const session = await prisma.userSession.updateMany({
            where: { sessionId, isActive: true, userId: null },
            data: updateData,
        });
        res.json({ success: true, session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update anonymous session activity
export const updateAnonSession = async (req, res) => {
    try {
        // Check if tracking is allowed
        if (!isTrackingAllowed(req)) {
            return res.status(403).json({
                error: 'Tracking consent required. Please accept cookies to enable session tracking.',
                requiresConsent: true
            });
        }

        const { sessionId, currentPage, url, userAgent, deviceInfo } = req.body;
        let existingSession = await prisma.userSession.findFirst({
            where: { sessionId, isActive: true, userId: null },
        });
        const now = new Date();
        if (!existingSession) {
            // Create anon session on-the-fly if not found
            const ipAddress = getClientIp(req);
            const serverUserAgent = getUserAgent(req);

            existingSession = await prisma.userSession.create({
                data: {
                    sessionId,
                    userId: null,
                    ipAddress,
                    userAgent: userAgent || serverUserAgent,
                    deviceInfo: deviceInfo || parseDeviceInfo(serverUserAgent),
                    startTime: now,
                    lastActivity: now,
                    isActive: true,
                    totalPageViews: 0,
                    pagesVisited: [],
                },
            });
        }
        let prevPages = Array.isArray(existingSession.pagesVisited) ? existingSession.pagesVisited : [];
        if (
            prevPages.length === 0 ||
            prevPages[prevPages.length - 1].page !== currentPage
        ) {
            prevPages.push({
                page: currentPage || '',
                url: url || '',
                enteredAt: now,
                leftAt: null,
            });
        } else {
            // Always ensure page and url are present in the last entry
            prevPages[prevPages.length - 1].page = currentPage || prevPages[prevPages.length - 1].page || '';
            prevPages[prevPages.length - 1].url = url || prevPages[prevPages.length - 1].url || '';
            prevPages[prevPages.length - 1].leftAt = now;
        }
        // Always update IP and user agent from current request
        const currentIpAddress = getClientIp(req);
        const currentUserAgent = getUserAgent(req);

        const session = await prisma.userSession.update({
            where: { id: existingSession.id },
            data: {
                lastActivity: now,
                currentPage,
                totalPageViews: existingSession.totalPageViews + 1,
                pagesVisited: { set: prevPages },
                // Update IP and user agent if they were missing or need refresh
                ipAddress: currentIpAddress,
                userAgent: currentUserAgent,
                deviceInfo: parseDeviceInfo(currentUserAgent),
            },
        });
        res.json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all sessions, grouped by user and non-user, for admin
export const getAllSessionsGrouped = async (req, res) => {
    try {
        const sessions = await prisma.userSession.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        middleName: true,
                        lastName: true,
                        phoneNumber: true,
                    }
                }
            },
            orderBy: { lastActivity: 'desc' },
        });
        // Group sessions
        const userSessions = [];
        const nonUserSessions = [];
        for (const s of sessions) {
            let pages = [];
            if (Array.isArray(s.pagesVisited)) {
                pages = s.pagesVisited;
            } else if (s.pagesVisited && typeof s.pagesVisited === 'object' && Array.isArray(s.pagesVisited.set)) {
                pages = s.pagesVisited.set;
            }
            const sortedPages = pages.sort((a, b) => new Date(a.enteredAt || a.timestamp) - new Date(b.enteredAt || b.timestamp));
            const last4 = sortedPages.slice(-4);
            const sessionObj = {
                ...s,
                pagesVisited: last4,
                userType: s.userId ? (s.user ? 'user' : 'user-deleted') : 'non-user',
            };
            if (s.userId) userSessions.push(sessionObj);
            else nonUserSessions.push(sessionObj);
        }
        res.json({ userSessions, nonUserSessions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Bulk delete sessions (admin)
export const bulkDeleteSessions = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                error: "Array of IDs is required",
            });
        }

        const result = await prisma.userSession.deleteMany({
            where: { id: { in: ids } },
        });

        return res.status(200).json({
            success: true,
            deletedCount: result.count,
            message: `Successfully deleted ${result.count} sessions`
        });
    } catch (error) {
        console.error("Error bulk deleting sessions:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to delete sessions",
        });
    }
};
