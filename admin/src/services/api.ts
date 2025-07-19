/**
 * API Service for Admin Application
 * Handles all API calls to the backend server with TypeScript support
 */

// Types
interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  isVerified: boolean;
  cibilCheckCount: number;
  lastCibilCheck?: Date;
  lastLogin?: Date;
  createdAt: Date;
}

interface CibilData {
  id: string;
  userId: string;
  panNumber?: string;
  phoneNumber?: string;
  cibilScore?: number;
  isSubmitted: boolean;
  status: 'SUBMITTED' | 'UNSUBMITTED' | 'PROCESSING' | 'FAILED';
  reportData: any;
  createdAt: Date;
  user?: User;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// API Response handler
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Base fetch with default options
const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get auth token from localStorage
  const token = localStorage.getItem('adminToken');

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: 'include', // Include cookies for authentication
  };

  const finalOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);
    return await handleResponse<T>(response);
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

// Admin Authentication Services
export const adminAuthService = {
  // Admin login
  login: async (credentials: { email: string; password: string; secretKey?: string }) => {
    return apiFetch<{ admin: User; token: string; expiresIn: number }>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get admin profile
  getProfile: async () => {
    return apiFetch<{ admin: User }>('/admin/auth/profile');
  },

  // Update admin profile
  updateProfile: async (profileData: { name?: string; email?: string }) => {
    return apiFetch<{ admin: User }>('/admin/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Change admin password
  changePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
    return apiFetch('/admin/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  },

  // Refresh admin token
  refreshToken: async () => {
    return apiFetch<{ token: string; expiresIn: number }>('/admin/auth/refresh', {
      method: 'POST',
    });
  },

  // Admin logout
  logout: async () => {
    return apiFetch('/admin/auth/logout', {
      method: 'POST',
    });
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    return apiFetch('/dashboard/stats');
  },

  // Get comprehensive dashboard data
  getComprehensiveDashboard: async () => {
    return apiFetch('/dashboard/comprehensive');
  },

  // Get activity overview
  getActivityOverview: async () => {
    return apiFetch('/dashboard/activity');
  },

  // Create new admin
  createAdmin: async (adminData: { name: string; email: string; password: string }) => {
    return apiFetch<{ admin: User }>('/admin/auth/create-admin', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  },
};

// User Management Services
export const userService = {
  // Get all users
  getAllUsers: async (params: PaginationParams & { role?: string } = {}) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiFetch<{ users: User[]; pagination: any }>(`/users?${queryString}`);
  },

  // Get user by ID
  getUserById: async (userId: string) => {
    return apiFetch<{ user: User; cibilSummary: CibilData[] }>(`/users/${userId}`);
  },

  // Update user
  updateUser: async (userId: string, userData: Partial<User>) => {
    return apiFetch<{ user: User }>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Delete user
  deleteUser: async (userId: string) => {
    return apiFetch(`/users/${userId}`, {
      method: 'DELETE',
    });
  },

  // Get user statistics
  getUserStats: async () => {
    return apiFetch('/users/stats');
  },

  // Bulk update users
  bulkUpdateUsers: async (userIds: string[], updates: Partial<User>) => {
    return apiFetch('/users/bulk-update', {
      method: 'PUT',
      body: JSON.stringify({ userIds, updates }),
    });
  },

  // Search users
  searchUsers: async (query: string) => {
    return apiFetch<{ users: User[] }>(`/users/search?q=${encodeURIComponent(query)}`);
  },
};

// CIBIL Management Services
export const cibilService = {
  // Get submitted CIBIL data
  getSubmittedCibilData: async (
    params: PaginationParams & { minScore?: number; maxScore?: number } = {}
  ) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiFetch<{ data: CibilData[]; pagination: any }>(`/cibil/submitted?${queryString}`);
  },

  // Get unsubmitted CIBIL data
  getUnsubmittedCibilData: async (params: PaginationParams = {}) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiFetch<{ data: CibilData[]; pagination: any }>(`/cibil/unsubmitted?${queryString}`);
  },

  // Get CIBIL statistics
  getCibilStats: async () => {
    return apiFetch('/cibil/stats');
  },

  // Get cached CIBIL data for user
  getCachedCibil: async (userId: string) => {
    return apiFetch(`/cibil/cached/${userId}`);
  },
};

// Loan Management Services (Placeholder)
export const loanService = {
  // Get all loans
  getAllLoans: async (params: PaginationParams = {}) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiFetch(`/loans?${queryString}`);
  },

  // Update loan status
  updateLoanStatus: async (loanId: string, status: string) => {
    return apiFetch(`/loans/${loanId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Get loan statistics
  getLoanStats: async () => {
    return apiFetch('/loans/stats');
  },
};

// Utility Services
export const utilService = {
  // Health check
  healthCheck: async () => {
    return apiFetch('/health');
  },

  // Upload file
  uploadFile: async (file: File, type: string = 'document') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return apiFetch('/upload', {
      method: 'POST',
      headers: {}, // Let browser set content-type for FormData
      body: formData,
    });
  },

  // Export data
  exportData: async (dataType: string, format: string = 'csv') => {
    return apiFetch(`/export/${dataType}?format=${format}`, {
      method: 'GET',
    });
  },
};

// Error handling utility
export const handleApiError = (error: Error): string => {
  console.error('API Error:', error);

  // Common error scenarios
  if (error.message.includes('401') || error.message.includes('Unauthorized')) {
    // Redirect to admin login
    window.location.href = '/admin/login';
    return 'Session expired. Please login again.';
  }

  if (error.message.includes('403') || error.message.includes('Forbidden')) {
    return 'You do not have permission to perform this action.';
  }

  if (error.message.includes('404') || error.message.includes('Not Found')) {
    return 'The requested resource was not found.';
  }

  if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
    return 'Server error. Please try again later.';
  }

  return error.message || 'An unexpected error occurred.';
};

// Request interceptor for adding auth token if needed
export const setAuthToken = (token: string): void => {
  localStorage.setItem('adminToken', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('adminToken');
};

// Get stored auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

// Export default API object
const api = {
  adminAuth: adminAuthService,
  users: userService,
  cibil: cibilService,
  loans: loanService,
  util: utilService,
  handleError: handleApiError,
  setAuthToken,
  removeAuthToken,
  getAuthToken,
};

export default api;
