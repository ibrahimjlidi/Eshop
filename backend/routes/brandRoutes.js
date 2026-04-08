import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import upload from '../middleware/uploadMiddleware.js';
import { getBrands, createBrand, updateBrand, deleteBrand } from '../controllers/brandController.js';

const router = express.Router();

router.get('/', getBrands);
router.post('/', authenticate, authorize(['admin']), upload.single('logo'), createBrand);
router.put('/:id', authenticate, authorize(['admin']), upload.single('logo'), updateBrand);
router.delete('/:id', authenticate, authorize(['admin']), deleteBrand);

export default router;
