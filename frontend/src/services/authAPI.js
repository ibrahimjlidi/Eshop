/**
 * Authentication API Service
 * API calls related to user authentication and profile
 */

import apiClient from './apiClient';

export const authAPI = {
  // User registration
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // User login
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await apiClient.put('/auth/profile', userData);
    return response.data;
  },

  // Update password
  updatePassword: async (passwordData) => {
    const response = await apiClient.put('/auth/password', passwordData);
    return response.data;
  },

  // Update address
  updateAddress: async (addressData) => {
    const response = await apiClient.put('/auth/address', addressData);
    return response.data;
  },
};
