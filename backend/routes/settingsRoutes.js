import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
router.get('/', getSettings);

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
router.put('/', authenticate, authorizeAdmin, updateSettings);

export default router;
