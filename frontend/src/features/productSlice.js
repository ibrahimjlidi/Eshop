/**
 * Product Slice
 * Redux slice for product state management
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  featuredProducts: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  totalProducts: 0,
  totalPages: 0,
  currentPage: 1,
  filters: {
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: Infinity,
    sortBy: 'newest',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Get all products
    getProductsSuccess: (state, action) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.isLoading = false;
    },

    // Get featured products
    getFeaturedSuccess: (state, action) => {
      state.featuredProducts = action.payload;
      state.isLoading = false;
    },

    // Get single product
    getProductSuccess: (state, action) => {
      state.selectedProduct = action.payload;
      state.isLoading = false;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Update filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
    },

    // Clear filters
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
        minPrice: 0,
        maxPrice: Infinity,
        sortBy: 'newest',
      };
      state.currentPage = 1;
    },

    // Set current page
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Add product (admin)
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
    },

    // Update product (admin)
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      if (state.selectedProduct?._id === action.payload._id) {
        state.selectedProduct = action.payload;
      }
    },

    // Delete product (admin)
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter(p => p._id !== action.payload);
    },
  },
});

export const {
  setLoading,
  getProductsSuccess,
  getFeaturedSuccess,
  getProductSuccess,
  setError,
  setFilters,
  clearFilters,
  setCurrentPage,
  clearError,
  addProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
