import React, { useEffect, useState, useCallback } from 'react';
import { AuthContext } from './AuthContextInstance';
import type { ReactNode } from 'react';

interface Admin {
  id: string;
  name: string;
  email: string;
  userType: string;
  lastLogin?: string;
}

export interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}



// Removed useAuth to a separate file for better modularity

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [checking, setChecking] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_APP_ENV === 'development' ? 'http://localhost:4000/api' : 'https://borrowww.com/api';

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new CustomError(data.message || 'Login failed', { data });
      }
      // Save token and set admin
      localStorage.setItem('admin_token', data.data.token);
      setAdmin(data.data.admin);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/admin/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('admin_token');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAdmin(null);
    }
  };

  const checkAuth = useCallback(async (): Promise<void> => {
    setChecking(true);
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        setAdmin(null);
        setChecking(false);
        return;
      }
      const response = await fetch(`${API_BASE_URL}/admin/auth/verify-token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setAdmin(null);
        setChecking(false);
        return;
      }
      const data = await response.json();
      setAdmin(data.data.admin);
    } catch (error) {
      setAdmin(null);
    } finally {
      setChecking(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value: AuthContextType = {
    admin,
    loading: checking,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

interface ErrorResponse {
  data: unknown; // Replace `unknown` with the actual data structure if known
}

class CustomError extends Error {
  response?: ErrorResponse;

  constructor(message: string, response?: ErrorResponse) {
    super(message);
    this.response = response;
  }
}


