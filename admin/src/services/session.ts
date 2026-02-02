/**
 * Session service for tracking API calls
 * 
 * SECURITY: Uses session cookies, no token parameter needed
 */

// In dev use relative /api so Vite proxy sends to backend → session cookie works (same origin)
const API_URL = import.meta.env.VITE_API_BASE_URL || ((import.meta.env.DEV ? '' : 'https://borrowww.com') + '/api');

/**
 * Fetch all sessions grouped by user/non-user
 * 
 * SECURITY: Uses credentials: 'include' for session cookie authentication
 */
export const fetchAllSessions = async () => {
    const response = await fetch(`${API_URL}/sessions/all/grouped`, {
        method: 'GET',
        credentials: 'include', // Include session cookie
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch sessions');
    }

    const data = await response.json();
    return data.data || data;
};
