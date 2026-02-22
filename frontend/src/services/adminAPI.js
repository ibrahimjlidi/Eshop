/**
 * Admin API Service
 * API calls for admin dashboard and management
 */

import apiClient from './apiClient';

export const adminAPI = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/dashboard/stats');
    return response.data;
  },

  // Get all users
  getAllUsers: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.search) params.append('search', filters.search);

    const response = await apiClient.get(`/admin/users?${params.toString()}`);
    return response.data;
  },

  // Update user role
  updateUserRole: async (userId, role) => {
    const response = await apiClient.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return response.data;
  },
};
