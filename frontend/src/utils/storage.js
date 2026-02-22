/**
 * Local Storage Utilities
 * Helper functions for managing localStorage
 */

const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  CART_ITEMS: 'cartItems',
  USER_PREFERENCES: 'userPreferences',
};

export const storage = {
  // Token management
  setToken: (token) => localStorage.setItem(STORAGE_KEYS.TOKEN, token),
  getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),
  removeToken: () => localStorage.removeItem(STORAGE_KEYS.TOKEN),

  // User management
  setUser: (user) => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem(STORAGE_KEYS.USER),

  // Cart items
  setCartItems: (items) => localStorage.setItem(STORAGE_KEYS.CART_ITEMS, JSON.stringify(items)),
  getCartItems: () => {
    const items = localStorage.getItem(STORAGE_KEYS.CART_ITEMS);
    return items ? JSON.parse(items) : [];
  },
  removeCartItems: () => localStorage.removeItem(STORAGE_KEYS.CART_ITEMS),

  // Clear all
  clear: () => localStorage.clear(),
};

export default storage;
