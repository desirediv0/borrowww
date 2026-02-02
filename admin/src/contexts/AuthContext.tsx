/**
 * ================================================================================
 * AUTH CONTEXT - SESSION-BASED AUTHENTICATION
 * ================================================================================
 * 
 * SECURITY:
 * - NO token storage in localStorage (prevents XSS)
 * - Server manages session via HTTP-only cookies
 * - Session verified on app load and after actions
 * - Automatic logout on session expiry
 * 
 * ================================================================================
 */

import React, { useEffect, useState, useCallback } from 'react';
import { AuthContext } from './AuthContextInstance';
import type { ReactNode } from 'react';

interface Admin {
  id: string;
  name: string;
  email: string;
  userType?: string;
  lastLogin?: string;
}

export interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [checking, setChecking] = useState(true);

  // In dev use relative /api so Vite proxy sends to backend → session cookie works (same origin)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ((import.meta.env.DEV ? '' : 'https://borrowww.com') + '/api');

  /**
   * Login - Server creates session, sets HTTP-only cookie
   * 
   * SECURITY: No token stored in localStorage
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // CRITICAL: Include credentials for cookie to be set
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new CustomError(data.message || data.error || 'Login failed', { data });
      }

      // SECURITY: No token storage - session is in HTTP-only cookie
      // Server response contains admin info only
      if (data.data?.admin) {
        setAdmin(data.data.admin);
      } else if (data.admin) {
        setAdmin(data.admin);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  /**
   * Logout - Server destroys session and clears cookie
   */
  const logout = async (): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/admin/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAdmin(null);
    }
  };

  /**
   * Check if session is valid
   * 
   * SECURITY: Server validates cookie, returns admin info if valid
   */
  const checkAuth = useCallback(async (): Promise<void> => {
    setChecking(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/auth/verify`, {
        method: 'GET',
        credentials: 'include', // Include session cookie
      });

      if (!response.ok) {
        setAdmin(null);
        setChecking(false);
        return;
      }

      const data = await response.json();

      // Extract admin from response
      if (data.data?.admin) {
        setAdmin(data.data.admin);
      } else if (data.admin) {
        setAdmin(data.admin);
      } else {
        setAdmin(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setAdmin(null);
    } finally {
      setChecking(false);
    }
  }, [API_BASE_URL]);

  /**
   * Listen for session expiry events from API service
   */
  useEffect(() => {
    const handleSessionExpiry = () => {
      setAdmin(null);
    };

    window.addEventListener('session-expired', handleSessionExpiry);
    return () => {
      window.removeEventListener('session-expired', handleSessionExpiry);
    };
  }, []);

  /**
   * Check auth on mount
   */
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

// ================================================================================
// CUSTOM ERROR CLASS
// ================================================================================

interface ErrorResponse {
  data: unknown;
}

class CustomError extends Error {
  response?: ErrorResponse;

  constructor(message: string, response?: ErrorResponse) {
    super(message);
    this.response = response;
  }
}
