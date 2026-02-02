
import express from "express";
import { createSession, endSession, updateSession, getAllSessions, getUserSessions, getActiveSession, createAnonSession, endAnonSession, updateAnonSession, getAllSessionsGrouped, bulkDeleteSessions } from "../controllers/session.controller.js";
import { userAuth } from "../middleware/userAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { optionalConsent } from "../middleware/consentMiddleware.js";

const router = express.Router();

// Create a new session (login) - requires consent
router.post('/', optionalConsent, userAuth, createSession);
// Create a new anonymous session (no auth) - requires consent
router.post('/anon', optionalConsent, createAnonSession);

// End a session (logout)
router.post('/end', userAuth, endSession);
// End an anonymous session 
router.post('/anon/end', endAnonSession);

// Update session activity (page view, last activity) - requires consent
router.post('/update', optionalConsent, userAuth, updateSession);
// Update anonymous session activity - requires consent
router.post('/anon/update', optionalConsent, updateAnonSession);

// Get all sessions (admin only)
router.get('/all', isAdmin, getAllSessions);
// Get all sessions grouped by user/non-user (admin only)
router.get('/all/grouped', isAdmin, getAllSessionsGrouped);

// Bulk delete sessions (admin only)
router.delete('/bulk', isAdmin, bulkDeleteSessions);
// Alias for admin app: POST /sessions/soft-delete (same as DELETE /bulk)
router.post('/soft-delete', isAdmin, bulkDeleteSessions);

// Get sessions for a user (user or admin)
router.get('/user/:userId?', userAuth, getUserSessions);

// Get current active session for logged-in user
router.get('/active', userAuth, getActiveSession);

export default router;
