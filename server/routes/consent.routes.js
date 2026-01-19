import express from "express";

const router = express.Router();

// Set consent cookie
router.post("/accept", (req, res) => {
    try {
        // Set consent cookie for 100 days
        res.cookie('trackingConsent', 'accepted', {
            maxAge: 100 * 24 * 60 * 60 * 1000, // 100 days
            httpOnly: false, // Allow client-side access for checking
            secure: process.env.NODE_ENV === 'production', // HTTPS in production
            sameSite: 'lax'
        });

        res.json({
            success: true,
            message: 'Consent accepted. Tracking is now enabled.',
            consent: 'accepted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to set consent',
            error: error.message
        });
    }
});

// Decline consent (explicit decline)
router.post("/decline", (req, res) => {
    try {
        // Set consent cookie to declined for 100 days
        res.cookie('trackingConsent', 'declined', {
            maxAge: 100 * 24 * 60 * 60 * 1000, // 100 days
            httpOnly: false, // Allow client-side access for checking
            secure: process.env.NODE_ENV === 'production', // HTTPS in production
            sameSite: 'lax'
        });

        res.json({
            success: true,
            message: 'Consent declined. Tracking is now disabled.',
            consent: 'declined'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to decline consent',
            error: error.message
        });
    }
});

// Revoke consent
router.post("/revoke", (req, res) => {
    try {
        // Set consent cookie to declined for 100 days
        res.cookie('trackingConsent', 'declined', {
            maxAge: 100 * 24 * 60 * 60 * 1000, // 100 days
            httpOnly: false, // Allow client-side access for checking
            secure: process.env.NODE_ENV === 'production', // HTTPS in production
            sameSite: 'lax'
        });

        res.json({
            success: true,
            message: 'Consent revoked. Tracking is now disabled.',
            consent: 'revoked'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to revoke consent',
            error: error.message
        });
    }
});

// Check consent status
router.get("/status", (req, res) => {
    try {
        const consent = req.cookies?.trackingConsent;
        const hasConsent = consent === 'accepted';

        res.json({
            success: true,
            hasConsent,
            consent: hasConsent ? 'accepted' : 'not-set',
            message: hasConsent ? 'Tracking consent is active' : 'No tracking consent given'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to check consent status',
            error: error.message
        });
    }
});

export default router;