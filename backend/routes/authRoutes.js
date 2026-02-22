/**
 * Authentication Routes
 * Handles user registration, login, and profile management
 */

import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateUserProfile,
  updatePassword,
  updateAddress,
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', authenticate, logoutUser);
router.put('/profile', authenticate, updateUserProfile);
router.put('/password', authenticate, updatePassword);
router.put('/address', authenticate, updateAddress);

export default router;
