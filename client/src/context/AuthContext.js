'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async () => {
        try {
            const res = await api.get('/users/me');
            setUser(res.data.data.user);
        } catch (error) {
            const status = error?.response?.status;

            // Only a real auth failure (401/403) means "not logged in".
            // Network errors / 5xx: keep whatever we had so a blip doesn't
            // flash the user as logged out.
            if (status === 401 || status === 403) {
                setUser(null);
                Cookies.remove('user_token');
            } else if (!user) {
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Login: server already set the cookie. If the caller passes the user
    // object (from verify-otp / profile update) use it directly; otherwise refetch.
    const login = async (userData) => {
        if (userData) {
            setUser(userData);
        } else {
            await fetchUser();
        }
    };

    const logout = async () => {
        try {
            await api.post('/users/logout');
        } catch (e) {
            console.error('Logout failed', e);
        } finally {
            setUser(null);
            Cookies.remove('user_token');
            router.push('/');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshUser: fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
