/**
 * Order Routes
 * Handles order creation, retrieval, and management
 */

import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  initiateCheckout,
  verifyPayment,
} from '../controllers/orderController.js';

const router = express.Router();

// Protected routes (user)
router.post('/', authenticate, createOrder);
router.get('/my-orders', authenticate, getUserOrders);
router.get('/:id', authenticate, getOrderById);
router.post('/checkout-session', authenticate, initiateCheckout);
router.post('/verify-payment', authenticate, verifyPayment);

// Protected routes (admin only)
router.get('/', authenticate, authorize(['admin']), getAllOrders);
router.put('/:id/status', authenticate, authorize(['admin']), updateOrderStatus);

export default router;
