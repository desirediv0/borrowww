import express from "express";

const router = express.Router();

// Shared cookie options for the tracking-consent cookie.
// - httpOnly:false so the client banner can read the current choice.
// - In production, if the client and API are on different sub-domains the
//   request is cross-site, so SameSite must be 'none' + Secure, and an
//   optional parent COOKIE_DOMAIN (e.g. ".borrowww.com") lets the cookie
//   reach the API host.
const CONSENT_COOKIE_OPTIONS = {
    maxAge: 100 * 24 * 60 * 60 * 1000, // 100 days
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    ...(process.env.NODE_ENV === "production" && process.env.COOKIE_DOMAIN
        ? { domain: process.env.COOKIE_DOMAIN }
        : {}),
};

// Accept tracking
router.post("/accept", (req, res) => {
    try {
        res.cookie("trackingConsent", "accepted", CONSENT_COOKIE_OPTIONS);
        res.json({
            success: true,
            message: "Consent accepted. Tracking is now enabled.",
            consent: "accepted",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to set consent", error: error.message });
    }
});

// Decline / revoke tracking (same effect: store an explicit 'declined')
function declineHandler(req, res, label) {
    try {
        res.cookie("trackingConsent", "declined", CONSENT_COOKIE_OPTIONS);
        res.json({
            success: true,
            message: `Consent ${label}. Tracking is now disabled.`,
            consent: "declined",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Failed to ${label} consent`, error: error.message });
    }
}

router.post("/decline", (req, res) => declineHandler(req, res, "declined"));
router.post("/revoke", (req, res) => declineHandler(req, res, "revoked"));

// Check consent status
router.get("/status", (req, res) => {
    try {
        const consent = req.cookies?.trackingConsent;
        const hasConsent = consent === "accepted";
        res.json({
            success: true,
            hasConsent,
            consent: consent || "not-set",
            message: hasConsent ? "Tracking consent is active" : "No tracking consent given",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to check consent status", error: error.message });
    }
});

export default router;
