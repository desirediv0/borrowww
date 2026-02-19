import axios from 'axios';

// Determine API URL (Force localhost backend if on localhost to fix cookie issues)
let API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    // Override env var to ensure we hit local backend for proper cookie handling (same-site)
    API_URL = 'http://localhost:4000/api';
}

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Send cookies with requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor to handle 401s universally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            // Optional: Dispatch event or handle logout if needed globaly
            // For now, let the caller or AuthContext handle it to avoid loops
        }
        return Promise.reject(error);
    }
);
