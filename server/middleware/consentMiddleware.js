/**
 * Consent Middleware - Check if user has given consent for tracking
 * Only allows tracking if user has explicitly accepted cookies/tracking
 */

/**
 * Check if user has given consent for tracking via cookies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
export const checkConsent = (req, res, next) => {
    try {
        // Check for consent in cookies
        const consent = req.cookies?.trackingConsent;

        // Check for consent in headers (for mobile apps or alternative methods)
        const headerConsent = req.headers['x-tracking-consent'];

        // Check for consent in request body (for session APIs)
        const bodyConsent = req.body?.trackingConsent;

        // User has explicitly declined consent if any of these are true
        const hasDeclined = consent === 'declined' ||
            headerConsent === 'declined' ||
            bodyConsent === 'declined' ||
            bodyConsent === false;

        // User has given consent if any of these are true AND hasn't declined
        const hasConsent = !hasDeclined && (
            consent === 'accepted' ||
            headerConsent === 'accepted' ||
            bodyConsent === 'accepted' ||
            bodyConsent === true
        );

        // Add consent status to request object for controllers to use
        req.hasTrackingConsent = hasConsent;

        // Log consent status for debugging
        if (process.env.NODE_ENV !== 'production') {
            console.log(`Tracking consent: ${hasConsent ? 'GRANTED' : 'DENIED'} for IP: ${req.ip}`);
        }

        next();
    } catch (error) {
        console.error('Consent middleware error:', error);
        // Default to no consent if there's an error
        req.hasTrackingConsent = false;
        next();
    }
};

/**
 * Require consent for tracking - blocks request if no consent given
 * Use this for endpoints that absolutely need tracking consent
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const requireConsent = (req, res, next) => {
    checkConsent(req, res, () => {
        if (!req.hasTrackingConsent) {
            return res.status(403).json({
                success: false,
                message: 'Tracking consent required. Please accept cookies to use this feature.',
                code: 'CONSENT_REQUIRED'
            });
        }
        next();
    });
};

/**
 * Optional consent middleware - continues regardless of consent but marks the request
 * Use this for endpoints where tracking is optional
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
export const optionalConsent = (req, res, next) => {
    checkConsent(req, res, next);
};

/**
 * Helper function to check if tracking is allowed for current request
 * Use this in controllers to conditionally perform tracking
 * @param {Object} req - Express request object
 * @returns {boolean}
 */
export const isTrackingAllowed = (req) => {
    return req.hasTrackingConsent === true;
};

/**
 * Helper function to get client IP address respecting proxies
 * @param {Object} req - Express request object
 * @returns {string}
 */
export const getClientIp = (req) => {
    // Get the first IP from x-forwarded-for header (in case of multiple proxies)
    const forwardedFor = req.headers['x-forwarded-for'];
    if (forwardedFor) {
        const ips = forwardedFor.split(',').map(ip => ip.trim());
        return ips[0];
    }

    // Try other headers and properties
    return req.headers['x-real-ip'] ||
        req.headers['x-client-ip'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        (req.connection?.socket ? req.connection.socket.remoteAddress : null) ||
        req.ip ||
        'unknown';
};

/**
 * Helper function to get user agent
 * @param {Object} req - Express request object
 * @returns {string}
 */
export const getUserAgent = (req) => {
    return req.headers['user-agent'] || 'unknown';
};

/**
 * Helper function to extract device info from user agent
 * @param {string} userAgent 
 * @returns {Object}
 */
export const parseDeviceInfo = (userAgent) => {
    if (!userAgent) return { device: 'unknown', browser: 'unknown', os: 'unknown' };

    try {
        const device = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'mobile' : 'desktop';

        let browser = 'unknown';
        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';

        let os = 'unknown';
        if (userAgent.includes('Windows')) os = 'Windows';
        else if (userAgent.includes('Mac')) os = 'macOS';
        else if (userAgent.includes('Linux')) os = 'Linux';
        else if (userAgent.includes('Android')) os = 'Android';
        else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

        return { device, browser, os, userAgent };
    } catch (error) {
        console.error('Error parsing device info:', error);
        return { device: 'unknown', browser: 'unknown', os: 'unknown', userAgent };
    }
};

export default {
    checkConsent,
    requireConsent,
    optionalConsent,
    isTrackingAllowed,
    getClientIp,
    getUserAgent,
    parseDeviceInfo
};