/**
 * ================================================================================
 * ADMIN API SERVICE - SESSION-BASED AUTHENTICATION
 * ================================================================================
 * 
 * SECURITY:
 * - Uses HTTP-only cookies for authentication (set by server)
 * - credentials: 'include' sends cookies with every request
 * - NO token storage in localStorage (prevents XSS attacks)
 * - Server manages session lifecycle
 * 
 * ================================================================================
 */

import { processUsersArrayForAdmin, processCibilArrayForAdmin, processUserDataForAdmin, processCibilDataForAdmin } from '../utils/dataMasking';
import type { User, PaginationParams } from '../types';

// Define AdminLoginCredentials interface
interface AdminLoginCredentials {
  email: string;
  password: string;
}

// Define AdminLoginResponse interface - NO TOKEN RETURNED (session-based)
interface AdminLoginResponse {
  admin: {
    id: string;
    email: string;
    name: string;
  };
  message: string;
}

// In dev use relative /api so Vite proxy sends to backend → session cookie works (same origin)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ((import.meta.env.DEV ? '' : 'https://borrowww.com') + '/api');

// API Response handler
interface ApiError {
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const error: ApiError = await response.json().catch((): ApiError => ({ message: 'Network error' }));

    // Handle 401 - Session expired
    if (response.status === 401) {
      // Clear any stale local state
      window.dispatchEvent(new CustomEvent('session-expired'));
      throw new Error('Session expired. Please login again.');
    }

    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Base fetch with session cookie support.
 * 
 * SECURITY: 
 * - credentials: 'include' ensures cookies are sent
 * - NO Authorization header with token
 * - Server validates session from cookie
 */
const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      // NO Authorization header - session cookie handles auth
    },
    // CRITICAL: Include cookies with every request
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

// ================================================================================
// ADMIN AUTHENTICATION SERVICES - SESSION BASED
// ================================================================================

export const adminAuthService = {
  /**
   * Admin login - Creates session on server
   * 
   * SECURITY: Server sets HTTP-only cookie, NOT returned to JavaScript
   */
  login: async (credentials: AdminLoginCredentials): Promise<AdminLoginResponse> => {
    return apiFetch('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Verify session is valid
   * 
   * Server checks cookie and returns admin info if valid
   */
  verifySession: async () => {
    return apiFetch('/admin/auth/verify');
  },

  /**
   * Get admin profile
   */
  getProfile: async () => {
    return apiFetch('/admin/profile');
  },

  /**
   * Update admin profile
   */
  updateProfile: async (profileData: { name: string; email: string; phone?: string }) => {
    return apiFetch('/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  /**
   * Change admin password
   */
  changePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
    return apiFetch('/admin/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  },

  /**
   * Admin logout - Destroys session on server
   */
  logout: async () => {
    return apiFetch('/admin/logout', {
      method: 'POST',
    });
  },

  /**
   * Get comprehensive dashboard data
   */
  getComprehensiveDashboard: async () => {
    return apiFetch('/admin/dashboard/comprehensive');
  },

  /**
   * Create new admin (super admin only)
   */
  createAdmin: async (adminData: { name: string; email: string; password: string }) => {
    return apiFetch('/admin/register', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  },
};

// ================================================================================
// USER MANAGEMENT SERVICES
// ================================================================================

export const userService = {
  // Get all users (admin endpoint with decryption)
  getAllUsers: async (params: PaginationParams & { role?: string } = {}) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const response = await apiFetch(`/admin/users?${queryString}`);

    // Apply data masking for admin view
    if (response.users) {
      response.users = processUsersArrayForAdmin(response.users);
    }

    return response;
  },

  // Get user by ID
  getUserById: async (userId: string) => {
    const response = await apiFetch(`/admin/users/${userId}`);

    // Apply data masking for admin view
    if (response.user) {
      response.user = processUserDataForAdmin(response.user);
    }

    return response;
  },

  // Get user details with CIBIL and loan summary
  getUserDetails: async (userId: string) => {
    return apiFetch(`/admin/users/${userId}/details`);
  },

  // Get user activity
  getUserActivity: async (userId: string, days: number = 30) => {
    return apiFetch(`/admin/users/${userId}/activity?days=${days}`);
  },

  // Update user
  updateUser: async (userId: string, userData: Partial<User>) => {
    return apiFetch(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Soft delete user (SECURITY: Never permanent delete)
  deleteUser: async (userId: string) => {
    return apiFetch(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  },

  // Get user statistics
  getUserStats: async () => {
    return apiFetch('/admin/users/stats');
  },

  // Search users
  searchUsers: async (query: string) => {
    return apiFetch(`/admin/users/search?q=${encodeURIComponent(query)}`);
  },
};

// ================================================================================
// CIBIL MANAGEMENT SERVICES
// ================================================================================

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

// ================================================================================
// LOAN MANAGEMENT SERVICES
// ================================================================================

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

  // Soft delete loan
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

// ================================================================================
// UTILITY SERVICES
// ================================================================================

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

// ================================================================================
// INQUIRY SERVICES - USING NEW ADMIN ENDPOINTS
// ================================================================================

export const inquiryService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    return apiFetch('/inquiries/dashboard/stats');
  },

  // Get credit check inquiries (admin endpoint with decryption)
  getCreditCheckInquiries: async (params: { status?: string; page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string } = {}) => {
    const queryString = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')) as Record<string, string>
    ).toString();
    return apiFetch(`/admin/inquiries/credit-check?${queryString}`);
  },

  // Soft delete credit check inquiries (SECURITY: No permanent delete)
  softDeleteCreditCheckInquiries: async (ids: string[]) => {
    return apiFetch('/admin/inquiries/credit-check/soft-delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });
  },

  // Get contact inquiries
  getContactInquiries: async (params: { status?: string; page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string } = {}) => {
    const queryString = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')) as Record<string, string>
    ).toString();
    return apiFetch(`/admin/inquiries/contact?${queryString}`);
  },

  // Soft delete contact inquiries
  softDeleteContactInquiries: async (ids: string[]) => {
    return apiFetch('/admin/inquiries/contact/soft-delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });
  },

  // Get home loan inquiries
  getHomeLoanInquiries: async (params: { status?: string; page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string } = {}) => {
    const queryString = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')) as Record<string, string>
    ).toString();
    return apiFetch(`/admin/inquiries/home-loan?${queryString}`);
  },

  // Soft delete home loan inquiries
  softDeleteHomeLoanInquiries: async (ids: string[]) => {
    return apiFetch('/admin/inquiries/home-loan/soft-delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });
  },

  // Update inquiry status
  updateInquiryStatus: async (type: string, id: string, status: string, notes?: string) => {
    return apiFetch(`/admin/inquiries/${type}/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  },
};

// ================================================================================
// REFERRAL SERVICES
// ================================================================================

export const referralService = {
  // Get all referrals (admin endpoint with decryption)
  getReferrals: async (params: { status?: string; page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string } = {}) => {
    const queryString = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== '')) as Record<string, string>
    ).toString();
    return apiFetch(`/admin/inquiries/referral?${queryString}`);
  },

  // Soft delete referrals
  softDeleteReferrals: async (ids: string[]) => {
    return apiFetch('/admin/inquiries/referral/soft-delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });
  },

  // Update referral status
  updateReferralStatus: async (id: string, status: string, notes?: string) => {
    return apiFetch(`/admin/inquiries/referral/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  },

  // Get referral stats
  getReferralStats: async () => {
    return apiFetch('/referrals/stats');
  },
};

// ================================================================================
// SESSION/TRACKING SERVICES
// ================================================================================

export const sessionService = {
  // Get all sessions grouped
  getAllSessionsGrouped: async () => {
    return apiFetch('/sessions/all/grouped');
  },

  // Soft delete sessions
  softDeleteSessions: async (ids: string[]) => {
    return apiFetch('/sessions/soft-delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });
  },
};

// ================================================================================
// USER BULK SERVICE
// ================================================================================

export const userBulkService = {
  // Soft delete users
  softDeleteUsers: async (ids: string[]) => {
    return apiFetch('/admin/users/soft-delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });
  },
};

// ================================================================================
// ERROR HANDLING
// ================================================================================

export const handleApiError = (error: Error): string => {
  console.error('API Error:', error);

  // Common error scenarios
  if (error.message.includes('401') || error.message.includes('Unauthorized') || error.message.includes('Session expired')) {
    // Dispatch event for auth context to handle
    window.dispatchEvent(new CustomEvent('session-expired'));
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

// ================================================================================
// EXPORT DEFAULT API OBJECT
// ================================================================================

const api = {
  adminAuth: adminAuthService,
  users: userService,
  cibil: cibilService,
  loans: loanService,
  util: utilService,
  inquiries: inquiryService,
  referrals: referralService,
  sessions: sessionService,
  userBulk: userBulkService,
  handleError: handleApiError,
};

export default api;
