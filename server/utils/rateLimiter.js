/**
 * =============================================================
 * LIGHTWEIGHT IN-MEMORY RATE LIMITER
 * =============================================================
 *
 * No external dependency. Good enough for a single-instance API
 * to stop OTP brute-force and SMS-bombing abuse.
 *
 * If the API is ever scaled to multiple instances, swap the Map
 * for a shared store (Redis) — the interface stays the same.
 * =============================================================
 */

import ApiError from "./ApiError.js";

// key -> { count, resetAt }
const buckets = new Map();

// Periodic cleanup so the Map does not grow forever.
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of buckets.entries()) {
        if (entry.resetAt <= now) buckets.delete(key);
    }
}, 5 * 60 * 1000).unref?.();

/**
 * Consume one hit for `key`. Throws ApiError(429) when the limit is exceeded.
 *
 * @param {string} key           - unique bucket key (e.g. `otp-send:<phone>`)
 * @param {number} max           - allowed hits per window
 * @param {number} windowMs      - window length in ms
 * @param {string} [message]     - custom 429 message
 */
export function consumeRateLimit(key, max, windowMs, message) {
    const now = Date.now();
    let entry = buckets.get(key);

    if (!entry || entry.resetAt <= now) {
        entry = { count: 0, resetAt: now + windowMs };
        buckets.set(key, entry);
    }

    entry.count += 1;

    if (entry.count > max) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        throw new ApiError(
            429,
            message || `Too many requests. Please try again in ${retryAfter} seconds.`
        );
    }
}

/**
 * Express middleware factory. Limits by client IP.
 */
export function rateLimit({ max = 20, windowMs = 60 * 1000, keyPrefix = "ip", message } = {}) {
    return (req, res, next) => {
        try {
            const ip = req.ip || req.connection?.remoteAddress || "unknown";
            consumeRateLimit(`${keyPrefix}:${ip}`, max, windowMs, message);
            next();
        } catch (err) {
            next(err);
        }
    };
}
