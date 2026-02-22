/**
 * Order API Service
 * API calls related to orders and checkout
 */

import apiClient from './apiClient';

export const orderAPI = {
  // Create order
  createOrder: async (orderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  // Get user orders
  getUserOrders: async (page = 1, limit = 10) => {
    const response = await apiClient.get(`/orders/my-orders?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get single order
  getOrderById: async (orderId) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  },

  // Get all orders (admin)
  getAllOrders: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.status) params.append('status', filters.status);

    const response = await apiClient.get(`/orders?${params.toString()}`);
    return response.data;
  },

  // Update order status (admin)
  updateOrderStatus: async (orderId, statusData) => {
    const response = await apiClient.put(`/orders/${orderId}/status`, statusData);
    return response.data;
  },

  // Create checkout session (Stripe)
  createCheckoutSession: async (orderId) => {
    const response = await apiClient.post('/orders/checkout-session', {
      orderId,
    });
    return response.data;
  },

  // Verify payment
  verifyPayment: async (sessionId) => {
    const response = await apiClient.post('/orders/verify-payment', {
      sessionId,
    });
    return response.data;
  },
};
