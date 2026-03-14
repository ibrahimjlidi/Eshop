/**
 * Product Routes
 * Handles product CRUD operations and reviews
 */

import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import upload from '../middleware/uploadMiddleware.js';
import {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
  getProductReviews,
} from '../controllers/productController.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);
router.get('/:id/reviews', getProductReviews);

// Protected routes (user)
router.post('/:id/reviews', authenticate, addProductReview);

// Protected routes (admin only)
router.post('/', authenticate, authorize(['admin']), upload.array('images', 5), createProduct);
router.put('/:id', authenticate, authorize(['admin']), upload.array('images', 5), updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), deleteProduct);

export default router;
