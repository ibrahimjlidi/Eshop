/**
 * Admin Routes
 * Handles admin dashboard and user management
 */

import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from '../controllers/adminController.js';

const router = express.Router();

// All admin routes require admin authorization
router.get('/dashboard/stats', authenticate, authorize(['admin']), getDashboardStats);
router.get('/users', authenticate, authorize(['admin']), getAllUsers);
router.put('/users/:userId/role', authenticate, authorize(['admin']), updateUserRole);
router.delete('/users/:userId', authenticate, authorize(['admin']), deleteUser);

export default router;
