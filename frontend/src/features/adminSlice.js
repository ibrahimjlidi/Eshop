/**
 * Admin Slice
 * Redux slice for admin dashboard state management
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stats: {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    ordersByStatus: [],
    revenueByMonth: [],
    recentOrders: [],
  },
  users: [],
  isLoading: false,
  error: null,
  totalUsers: 0,
  totalPages: 0,
  currentPage: 1,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Get dashboard stats
    getDashboardStatsSuccess: (state, action) => {
      state.stats = action.payload;
      state.isLoading = false;
    },

    // Get all users
    getUsersSuccess: (state, action) => {
      state.users = action.payload.users;
      state.totalUsers = action.payload.totalUsers;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.isLoading = false;
    },

    // Update user role
    updateUserRoleSuccess: (state, action) => {
      const index = state.users.findIndex(u => u._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    // Delete user
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter(u => u._id !== action.payload);
    },

    // Set current page
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  getDashboardStatsSuccess,
  getUsersSuccess,
  updateUserRoleSuccess,
  deleteUserSuccess,
  setCurrentPage,
  setError,
  clearError,
} = adminSlice.actions;

export default adminSlice.reducer;
