/**
 * Product API Service
 * API calls related to products and reviews
 */

import apiClient from './apiClient';

export const productAPI = {
  // Get all products with filters
  getAllProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);

    const response = await apiClient.get(`/products?${params.toString()}`);
    return response.data;
  },

  // Get single product
  getProductById: async (productId) => {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await apiClient.get('/products/featured');
    return response.data;
  },

  // Create product (admin)
  createProduct: async (productData) => {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  // Update product (admin)
  updateProduct: async (productId, productData) => {
    const response = await apiClient.put(`/products/${productId}`, productData);
    return response.data;
  },

  // Delete product (admin)
  deleteProduct: async (productId) => {
    const response = await apiClient.delete(`/products/${productId}`);
    return response.data;
  },

  // Add review
  addReview: async (productId, reviewData) => {
    const response = await apiClient.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  },

  // Get product reviews
  getReviews: async (productId) => {
    const response = await apiClient.get(`/products/${productId}/reviews`);
    return response.data;
  },
};
