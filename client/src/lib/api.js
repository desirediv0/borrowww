import axios from 'axios';

// Single source of truth for the API base URL.
// - Local dev: falls back to the local backend.
// - Deployed:  set NEXT_PUBLIC_API_URL (e.g. https://api.borrowww.com/api).
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // send the HTTP-only auth cookie with every request
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor — let each caller decide how to react to 401 so we don't
// trigger redirect loops. AuthContext + the credit-check page handle it.
api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);
