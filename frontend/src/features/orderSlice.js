/**
 * Order Slice
 * Redux slice for order state management
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
  totalOrders: 0,
  totalPages: 0,
  currentPage: 1,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Get user orders
    getOrdersSuccess: (state, action) => {
      state.orders = action.payload.orders;
      state.totalOrders = action.payload.totalOrders;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.isLoading = false;
    },

    // Get single order
    getOrderSuccess: (state, action) => {
      state.selectedOrder = action.payload;
      state.isLoading = false;
    },

    // Create order
    createOrderSuccess: (state, action) => {
      state.orders.unshift(action.payload);
      state.isLoading = false;
    },

    // Update order status (admin)
    updateOrderStatusSuccess: (state, action) => {
      const index = state.orders.findIndex(o => o._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      if (state.selectedOrder?._id === action.payload._id) {
        state.selectedOrder = action.payload;
      }
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
  getOrdersSuccess,
  getOrderSuccess,
  createOrderSuccess,
  updateOrderStatusSuccess,
  setCurrentPage,
  setError,
  clearError,
} = orderSlice.actions;

export default orderSlice.reducer;
