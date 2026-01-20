import { processUsersArrayForAdmin, processCibilArrayForAdmin, processUserDataForAdmin, processCibilDataForAdmin } from '../utils/dataMasking';
import type { User, PaginationParams } from '../types';

// Define AdminLoginCredentials interface
interface AdminLoginCredentials {
  email: string;
  password: string;
}

// Define AdminLoginResponse interface
interface AdminLoginResponse {
  token: string;
  expiresIn: number;
}

// ...existing code...
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_APP_ENV === 'development' ? 'http://localhost:4000/api' : 'https://borrowww.com/api';

// API Response handler

interface ApiError {
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const error: ApiError = await response.json().catch((): ApiError => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Base fetch with default options
const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  // Get auth token from localStorage
  const token = localStorage.getItem('admin_token');
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: 'include' as RequestCredentials,
  };
  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  try {
    const response = await fetch(url, finalOptions);
    return await handleResponse(response);
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

// Admin Authentication Services
export const adminAuthService = {
  // Admin login
  login: async (credentials: AdminLoginCredentials): Promise<AdminLoginResponse> => {
    return apiFetch('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get admin profile
  getProfile: async () => {
    return apiFetch('/admin/auth/profile');
  },

  // Update admin profile
  updateProfile: async (profileData: { name: string; email: string; phone?: string }) => {
    return apiFetch('/admin/auth/profile', {
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
    return apiFetch('/admin/auth/refresh', {
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
    return apiFetch('/admin/dashboard/comprehensive');
  },

  // Get activity overview
  getActivityOverview: async () => {
    return apiFetch('/dashboard/activity');
  },

  // Create new admin
  createAdmin: async (adminData: { name: string; email: string; password: string }) => {
    return apiFetch('/admin/auth/create-admin', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  },
};

// User Management Services
export const userService = {
  // Get all users
  getAllUsers: async (params: PaginationParams & { role?: string } = {}) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const response = await apiFetch(`/users?${queryString}`);

    // Apply data masking for admin view
    if (response.users) {
      response.users = processUsersArrayForAdmin(response.users);
    }

    return response;
  },

  // Get user by ID
  getUserById: async (userId: string) => {
    const response = await apiFetch(`/users/${userId}`);

    // Apply data masking for admin view
    if (response.user) {
      response.user = processUserDataForAdmin(response.user);
    }
    if (response.cibilSummary) {
      response.cibilSummary = processCibilArrayForAdmin(response.cibilSummary);
    }

    return response;
  },

  // Get user details with CIBIL and loan summary
  getUserDetails: async (userId: string) => {
    return apiFetch(`/users/${userId}/details`);
  },

  // Get user activity
  getUserActivity: async (userId: string, days: number = 30) => {
    return apiFetch(`/users/${userId}/activity?days=${days}`);
  },

  // Update user
  updateUser: async (userId: string, userData: Partial<User>) => {
    return apiFetch(`/users/${userId}`, {
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
    return apiFetch(`/users/search?q=${encodeURIComponent(query)}`);
  },
};

// CIBIL Management Services
export const cibilService = {
  // Get submitted CIBIL data
  getSubmittedCibilData: async (
    params: PaginationParams & { minScore?: number; maxScore?: number } = {}
  ) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const response = await apiFetch(`/cibil/submitted?${queryString}`);

    if (response?.data && Array.isArray(response.data)) {
      response.data = processCibilArrayForAdmin(response.data);
    }

    return response;
  },

  // Get unsubmitted CIBIL data
  getUnsubmittedCibilData: async (params: PaginationParams = {}) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const response = await apiFetch(`/cibil/unsubmitted?${queryString}`);

    if (response?.data && Array.isArray(response.data)) {
      response.data = processCibilArrayForAdmin(response.data);
    }

    return response;
  },

  // Get CIBIL statistics
  getCibilStats: async () => {
    return apiFetch('/cibil/stats');
  },

  // Get cached CIBIL data for user
  getCachedCibil: async (userId: string) => {
    const response = await apiFetch(`/cibil/cached/${userId}`);

    if (response) {
      return processCibilDataForAdmin(response);
    }

    return response;
  },

  // Get all CIBIL data (admin only)
  getAllCibilData: async (params: PaginationParams = {}) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const response = await apiFetch(`/cibil?${queryString}`);

    if (response?.data?.cibilData && Array.isArray(response.data.cibilData)) {
      response.data.cibilData = processCibilArrayForAdmin(response.data.cibilData);
    }

    return response;
  },

  // Get detailed CIBIL report (admin only)
  getCibilDetails: async (cibilId: string) => {
    const response = await apiFetch(`/cibil/details/${cibilId}`);

    if (response?.data) {
      response.data = processCibilDataForAdmin(response.data);
    }

    return response;
  },

  // Download CIBIL PDF (admin only)
  downloadCibilPdf: async (cibilId: string) => {
    return apiFetch(`/cibil/download/${cibilId}`, {
      headers: {
        'Accept': 'application/pdf',
      },
    });
  },
};

// Loan Management Services
export const loanService = {
  // Get all loans
  getAllLoans: async (params: PaginationParams = {}) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return apiFetch(`/loans?${queryString}`);
  },

  // Get loan by ID
  getLoanById: async (loanId: string) => {
    return apiFetch(`/loans/${loanId}`);
  },

  // Update loan status
  updateLoanStatus: async (loanId: string, status: string, remarks?: string) => {
    return apiFetch(`/loans/${loanId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, remarks }),
    });
  },

  // Update loan
  updateLoan: async (loanId: string, data: Record<string, unknown>) => {
    return apiFetch(`/loans/${loanId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete loan
  deleteLoan: async (loanId: string) => {
    return apiFetch(`/loans/${loanId}`, {
      method: 'DELETE',
    });
  },

  // Get loan statistics
  getLoanStats: async () => {
    return apiFetch('/loans/stats');
  },

  // Get loan type distribution
  getLoanTypeDistribution: async () => {
    return apiFetch('/loans/type-distribution');
  },

  // Get recent loans
  getRecentLoans: async (limit: number = 10) => {
    return apiFetch(`/loans/recent?limit=${limit}`);
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

// Inquiry Services
export const inquiryService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    return apiFetch('/inquiries/dashboard/stats');
  },

  // Get credit check inquiries with search/date filters
  getCreditCheckInquiries: async (params: { status?: string; page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string } = {}) => {
    const queryString = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')) as Record<string, string>
    ).toString();
    return apiFetch(`/inquiries/credit-check?${queryString}`);
  },

  // Bulk delete credit check inquiries
  bulkDeleteCreditCheckInquiries: async (ids: string[]) => {
    return apiFetch('/inquiries/credit-check/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
  },

  // Get contact inquiries with search/date filters
  getContactInquiries: async (params: { status?: string; page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string } = {}) => {
    const queryString = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')) as Record<string, string>
    ).toString();
    return apiFetch(`/inquiries/contact?${queryString}`);
  },

  // Bulk delete contact inquiries
  bulkDeleteContactInquiries: async (ids: string[]) => {
    return apiFetch('/inquiries/contact/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
  },

  // Get home loan inquiries with search/date filters
  getHomeLoanInquiries: async (params: { status?: string; page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string } = {}) => {
    const queryString = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')) as Record<string, string>
    ).toString();
    return apiFetch(`/inquiries/home-loan?${queryString}`);
  },

  // Bulk delete home loan inquiries
  bulkDeleteHomeLoanInquiries: async (ids: string[]) => {
    return apiFetch('/inquiries/home-loan/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
  },

  // Update inquiry status
  updateInquiryStatus: async (type: string, id: string, status: string, notes?: string) => {
    return apiFetch(`/inquiries/${type}/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  },
};

// Referral Services
export const referralService = {
  // Get all referrals with search/date filters
  getReferrals: async (params: { status?: string; page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string } = {}) => {
    const queryString = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')) as Record<string, string>
    ).toString();
    return apiFetch(`/referrals?${queryString}`);
  },

  // Bulk delete referrals
  bulkDeleteReferrals: async (ids: string[]) => {
    return apiFetch('/referrals/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
  },

  // Update referral status
  updateReferralStatus: async (id: string, status: string, notes?: string) => {
    return apiFetch(`/referrals/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  },

  // Get referral stats
  getReferralStats: async () => {
    return apiFetch('/referrals/stats');
  },
};

// Session/Tracking Services
export const sessionService = {
  // Get all sessions grouped
  getAllSessionsGrouped: async () => {
    return apiFetch('/sessions/all/grouped');
  },

  // Bulk delete sessions
  bulkDeleteSessions: async (ids: string[]) => {
    return apiFetch('/sessions/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
  },
};

// User bulk delete service extension
export const userBulkService = {
  // Bulk delete users
  bulkDeleteUsers: async (ids: string[]) => {
    return apiFetch('/users/bulk/delete', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
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
  inquiries: inquiryService,
  handleError: handleApiError,
  setAuthToken,
  removeAuthToken,
  getAuthToken,
};

export default api;
