/**
 * Cart Routes
 * Handles shopping cart operations
 */

import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';

const router = express.Router();

// All cart routes require authentication
router.get('/', authenticate, getCart);
router.post('/add', authenticate, addToCart);
router.put('/update', authenticate, updateCartItemQuantity);
router.delete('/:productId', authenticate, removeFromCart);
router.delete('/', authenticate, clearCart);

export default router;
