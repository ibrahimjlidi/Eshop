import Brand from '../models/Brand.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { uploadToCloudinary } from '../middleware/uploadMiddleware.js';

export const getBrands = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user?.role !== 'admin' || req.query.public) {
    filter.isActive = true;
  }
  const brands = await Brand.find(filter).sort({ displayOrder: 1, createdAt: -1 });
  res.status(200).json({ success: true, brands });
});

export const createBrand = asyncHandler(async (req, res) => {
  const { name, displayOrder, isActive } = req.body;
  if (!name) throw new AppError('Brand name is required', 400);

  let logoObj = null;
  if (req.file) {
    const isCloudinaryConfigured = !!(process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_NAME !== 'your_cloudinary_name' && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== 'your_cloudinary_api_key');
    if (isCloudinaryConfigured) {
      const result = await uploadToCloudinary(req.file.buffer);
      logoObj = { url: result.secure_url, publicId: result.public_id };
    } else {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      logoObj = { url: `${baseUrl}/uploads/${req.file.filename}`, publicId: req.file.filename };
    }
  }

  const brand = await Brand.create({
    name,
    logo: logoObj,
    displayOrder: displayOrder || 0,
    isActive: isActive !== undefined ? isActive : true
  });

  res.status(201).json({ success: true, brand });
});

export const updateBrand = asyncHandler(async (req, res) => {
  let brand = await Brand.findById(req.params.id);
  if (!brand) throw new AppError('Brand not found', 404);

  if (req.file) {
    const isCloudinaryConfigured = !!(process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_NAME !== 'your_cloudinary_name' && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== 'your_cloudinary_api_key');
    if (isCloudinaryConfigured) {
      const result = await uploadToCloudinary(req.file.buffer);
      req.body.logo = { url: result.secure_url, publicId: result.public_id };
    } else {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      req.body.logo = { url: `${baseUrl}/uploads/${req.file.filename}`, publicId: req.file.filename };
    }
  }

  Object.assign(brand, req.body);
  await brand.save();

  res.status(200).json({ success: true, brand });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) throw new AppError('Brand not found', 404);
  res.status(200).json({ success: true, message: 'Brand deleted' });
});
