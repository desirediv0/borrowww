'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const fetchUser = async () => {
        try {
            // Try to get user from backend (cookie)
            const res = await api.get('/users/me');
            setUser(res.data.data.user);
        } catch (error) {
            // If 401 or fail, user is not logged in
            setUser(null);
            // Optional: Clear client-side artifacts if any exist
            Cookies.remove('user_token');
            localStorage.removeItem('user_token');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Login: Just refresh user state (api sets cookie)
    const login = async (userData) => {
        // If userData passed (from register/otp response), set it directly to avoid extra call
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
            Cookies.remove('user');
            localStorage.removeItem('user_token');
            localStorage.removeItem('user');
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
