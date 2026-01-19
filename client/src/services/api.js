/**
 * API Service for Client Application
 * Handles all API calls to the backend server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://borrowww.com/api/users';


// API Response handler
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Base fetch with default options
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for authentication
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

// Authentication Services
export const authService = {
  // Register new user
  register: async (userData) => {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // OTP Login/Register
  otpLogin: async (otpData) => {
    return apiFetch('/auth/otp-login', {
      method: 'POST',
      body: JSON.stringify(otpData),
    });
  },

  // Get user profile
  getProfile: async () => {
    return apiFetch('/auth/profile');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return apiFetch('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Change password
  changePassword: async (passwordData) => {
    return apiFetch('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  },

  // Refresh token
  refreshToken: async () => {
    return apiFetch('/auth/refresh', {
      method: 'POST',
    });
  },

  // Logout
  logout: async () => {
    return apiFetch('/auth/logout', {
      method: 'POST',
    });
  },
};

// CIBIL Services
export const cibilService = {
  // Check CIBIL score
  checkCibil: async (cibilData) => {
    return apiFetch('/cibil/check', {
      method: 'POST',
      body: JSON.stringify(cibilData),
    });
  },

  // Get cached CIBIL data
  getCachedCibil: async (userId) => {
    return apiFetch(`/cibil/cached/${userId}`);
  },

  // Get user's CIBIL history
  getUserCibilHistory: async () => {
    return apiFetch('/cibil/history');
  },
};

// Loan Services (Placeholder)
export const loanService = {
  // Apply for loan
  applyForLoan: async (loanData) => {
    return apiFetch('/loans/apply', {
      method: 'POST',
      body: JSON.stringify(loanData),
    });
  },

  // Get user's loans
  getUserLoans: async () => {
    return apiFetch('/loans/my-loans');
  },

  // Get loan details
  getLoanDetails: async (loanId) => {
    return apiFetch(`/loans/${loanId}`);
  },
};

// Utility Services
export const utilService = {
  // Health check
  healthCheck: async () => {
    return apiFetch('/health');
  },

  // Upload file
  uploadFile: async (file, type = 'document') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return apiFetch('/upload', {
      method: 'POST',
      headers: {}, // Let browser set content-type for FormData
      body: formData,
    });
  },
};

// Error handling utility
export const handleApiError = (error) => {
  console.error('API Error:', error);

  // Common error scenarios
  if (error.message.includes('401') || error.message.includes('Unauthorized')) {
    // Redirect to login or refresh token
    window.location.href = '/login';
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
export const setAuthToken = (token) => {
  // This can be used if you need to manually set tokens
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Export default API object
const api = {
  auth: authService,
  cibil: cibilService,
  loan: loanService,
  util: utilService,
  handleError: handleApiError,
};

export default api;