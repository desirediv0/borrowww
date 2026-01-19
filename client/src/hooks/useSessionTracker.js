// Track user page views and send to backend session API
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function useSessionTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        let sessionId = null;
        let endpoint = '';

        if (token) {
            sessionId = localStorage.getItem('sessionId');
            endpoint = '/sessions/update';
        } else {
            // Anonymous user: get or create anonSessionId (per tab)
            sessionId = sessionStorage.getItem('anonSessionId');
            if (!sessionId) {
                sessionId = 'sess_' + Math.random().toString(36).slice(2) + Date.now();
                sessionStorage.setItem('anonSessionId', sessionId);
                // Create anon session in backend
                const deviceInfo = typeof navigator !== 'undefined' ? navigator.userAgent : '';
                fetch(apiUrl + '/sessions/anon', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId, userAgent: deviceInfo }),
                });
            }
            endpoint = '/sessions/anon/update';
        }
        if (!sessionId) return;

        // Track page view on route change
        fetch(`${apiUrl}${endpoint}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ sessionId, currentPage: pathname, url: window?.location?.href || '' }),
        });

        // Track page left on unload
        const handleUnload = () => {
            navigator.sendBeacon(
                `${apiUrl}${endpoint}`,
                JSON.stringify({ sessionId, currentPage: pathname, url: window?.location?.href || '', leftAt: new Date().toISOString() })
            );
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [pathname]);
}
