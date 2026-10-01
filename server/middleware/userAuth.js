import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

// Same options as the login controller so re-issued cookies match.
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
    ...(process.env.NODE_ENV === "production" && process.env.COOKIE_DOMAIN
        ? { domain: process.env.COOKIE_DOMAIN }
        : {}),
};

// When a still-valid token has less than this much life left, silently
// re-issue a fresh 7-day token so an active user is never forced to log in again.
const RENEW_WHEN_REMAINING_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

export const userAuth = async (req, res, next) => {
    try {
        let token;
        if (req.cookies && req.cookies.user_token) {
            token = req.cookies.user_token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new ApiError(401, "No token provided");
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            throw new ApiError(401, "Session expired. Please login again.");
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user || !user.isActive) {
            throw new ApiError(401, "Not authorized as user");
        }

        // Enforce verification status - logs out user if admin un-verifies them
        if (!user.isVerified) {
            throw new ApiError(401, "Account unverified. Please login again.");
        }

        // SECURITY: bind the token to the one stored on the user record. This lets
        // logout / phone-change / forced-logout invalidate every old token
        // immediately, instead of it staying valid for the full 7 days.
        if (!user.accessToken || user.accessToken !== token) {
            throw new ApiError(401, "Session is no longer valid. Please login again.");
        }

        req.user = user;

        // ── Sliding session: keep active users logged in ─────────────────────────
        // If the token is still valid but close to expiry, mint a new one and
        // refresh the cookie so the user does not get logged out mid-use.
        try {
            const expMs = (decoded.exp || 0) * 1000;
            if (expMs && expMs - Date.now() < RENEW_WHEN_REMAINING_MS) {
                const fresh = jwt.sign(
                    { id: user.id, phoneNumber: user.phoneNumber },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );
                await prisma.user.update({
                    where: { id: user.id },
                    data: { accessToken: fresh },
                });
                res.cookie("user_token", fresh, COOKIE_OPTIONS);
                res.cookie("logged_in", "1", { ...COOKIE_OPTIONS, httpOnly: false });
            }
        } catch (renewErr) {
            // Non-fatal — the request still proceeds with the current valid token.
            console.error("[userAuth] token renewal failed:", renewErr.message);
        }

        next();
    } catch (err) {
        next(err);
    }
};
