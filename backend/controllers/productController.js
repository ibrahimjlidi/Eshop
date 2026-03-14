/**
 * Product Controller
 * Handles product CRUD operations and retrieval
 */

import Product from '../models/Product.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { uploadToCloudinary } from '../middleware/uploadMiddleware.js';

// Get All Products with pagination, search, and filter
export const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12, search, category, minPrice, maxPrice, sortBy } = req.query;

  // Build filter object
  const filter = { isActive: true };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  // Pagination
  const skip = (page - 1) * limit;

  // Sorting
  let sortObj = { createdAt: -1 };
  if (sortBy === 'price_asc') sortObj = { price: 1 };
  if (sortBy === 'price_desc') sortObj = { price: -1 };
  if (sortBy === 'rating') sortObj = { ratings: -1 };
  if (sortBy === 'newest') sortObj = { createdAt: -1 };

  // Execute query
  const products = await Product.find(filter)
    .sort(sortObj)
    .skip(skip)
    .limit(parseInt(limit));

  const totalProducts = await Product.countDocuments(filter);

  res.status(200).json({
    success: true,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: parseInt(page),
    products,
  });
});

// Get Single Product
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Get Featured Products
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true, isActive: true }).limit(8);

  res.status(200).json({
    success: true,
    products,
  });
});

// Create Product (Admin Only)
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, discountPrice, stock, attributes } = req.body;

  if (!name || !description || !category || !price) {
    throw new AppError('Please provide all required fields', 400);
  }

  // Handle image uploads
  let imageUrls = [];
  if (req.files && req.files.length > 0) {
    const isCloudinaryConfigured = !!(process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

    if (isCloudinaryConfigured) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      const results = await Promise.all(uploadPromises);
      imageUrls = results.map(result => ({
        url: result.secure_url,
        publicId: result.public_id
      }));
    } else {
      // Local storage fallback
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      imageUrls = req.files.map(file => ({
        url: `${baseUrl}/uploads/${file.filename}`,
        publicId: file.filename // Use filename as publicId for consistency
      }));
    }
  }

  const product = await Product.create({
    name,
    description,
    category,
    price,
    discountPrice,
    stock,
    images: imageUrls,
    attributes,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product,
  });
});

// Update Product (Admin Only)
export const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Handle image uploads if new ones are provided
  if (req.files && req.files.length > 0) {
    const isCloudinaryConfigured = !!(process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

    if (isCloudinaryConfigured) {
      // Optional: Delete old images from Cloudinary here if desired
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      const results = await Promise.all(uploadPromises);
      const newImages = results.map(result => ({
        url: result.secure_url,
        publicId: result.public_id
      }));
      req.body.images = newImages;
    } else {
      // Local storage fallback
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const newImages = req.files.map(file => ({
        url: `${baseUrl}/uploads/${file.filename}`,
        publicId: file.filename
      }));
      req.body.images = newImages;
    }
  }

  // Update fields
  Object.assign(product, req.body);
  product.updatedBy = req.user.id;

  await product.save();

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product,
  });
});

// Delete Product (Admin Only)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Add Product Review
export const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.id;

  if (!rating || rating < 1 || rating > 5) {
    throw new AppError('Please provide a rating between 1 and 5', 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check if user already reviewed
  const existingReview = product.reviews.find(
    review => review.userId.toString() === req.user.id.toString()
  );

  if (existingReview) {
    // Update existing review
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    // Add new review
    product.reviews.push({
      userId: req.user.id,
      rating,
      comment,
    });
    product.numOfReviews += 1;
  }

  // Calculate average rating
  const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
  product.ratings = Math.round((totalRating / product.reviews.length) * 10) / 10;

  await product.save();

  res.status(200).json({
    success: true,
    message: 'Review added successfully',
    product,
  });
});

// Get Product Reviews
export const getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
