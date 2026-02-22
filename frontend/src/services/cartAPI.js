/**
 * Cart API Service
 * API calls related to shopping cart
 */

import apiClient from './apiClient';

export const cartAPI = {
  // Get user cart
  getCart: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const response = await apiClient.post('/cart/add', {
      productId,
      quantity,
    });
    return response.data;
  },

  // Update item quantity
  updateCartItemQuantity: async (productId, quantity) => {
    const response = await apiClient.put('/cart/update', {
      productId,
      quantity,
    });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const response = await apiClient.delete(`/cart/${productId}`);
    return response.data;
  },

  // Clear entire cart
  clearCart: async () => {
    const response = await apiClient.delete('/cart');
    return response.data;
  },
};
