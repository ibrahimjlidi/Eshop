/**
 * Cart Slice
 * Redux slice for shopping cart state management
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Get cart (can be from API or localStorage)
    getCartSuccess: (state, action) => {
      state.items = action.payload.items || [];
      state.totalItems = action.payload.totalItems || 0;
      state.totalPrice = action.payload.totalPrice || 0;
      state.isLoading = false;
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    // Add item to cart
    addToCartSuccess: (state, action) => {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      calculateTotals(state);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    // Update item quantity
    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.productId !== productId);
        } else {
          item.quantity = quantity;
        }
      }

      calculateTotals(state);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item.productId !== action.payload
      );
      calculateTotals(state);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cartItems');
    },

    // Set loading
    setLoading: (state) => {
      state.isLoading = true;
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

// Helper function to calculate totals
const calculateTotals = (state) => {
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  state.totalPrice = Math.round(state.totalPrice * 100) / 100;
};

export const {
  getCartSuccess,
  addToCartSuccess,
  updateItemQuantity,
  removeFromCart,
  clearCart,
  setLoading,
  setError,
  clearError,
} = cartSlice.actions;

export default cartSlice.reducer;
