'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const CONSENT_KEY = 'borrowww_cookie_consent';
const SESSION_ID_KEY = 'borrowww_session_id';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Pages to exclude from tracking (admin pages, etc.)
const EXCLUDED_PATHS = ['/admin', '/login', '/api'];

export default function PageTracker() {
    const pathname = usePathname();

    const trackPageView = useCallback(async (pagePath) => {
        try {
            // Check if consent was given
            const consent = localStorage.getItem(CONSENT_KEY);
            if (consent !== 'accepted') return;

            // Check if path should be excluded
            if (EXCLUDED_PATHS.some(excluded => pagePath.startsWith(excluded))) return;

            let sessionId = localStorage.getItem(SESSION_ID_KEY);

            // Generate session ID if not exists
            if (!sessionId) {
                sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
                localStorage.setItem(SESSION_ID_KEY, sessionId);
            }

            // Call server tracking API directly (not Next.js API route)
            await fetch(`${API_URL}/tracking/page-view`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId,
                    page: pagePath,
                    timestamp: new Date().toISOString(),
                    referrer: typeof document !== 'undefined' ? document.referrer : null,
                }),
            });
        } catch (error) {
            console.error('Error tracking page view:', error);
        }
    }, []);

    useEffect(() => {
        if (pathname) {
            trackPageView(pathname);
        }
    }, [pathname, trackPageView]);

    return null;
}
