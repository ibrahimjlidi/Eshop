/**
 * Cart Controller
 * Handles shopping cart operations
 */

import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

// Get User Cart
export const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = await Cart.create({ userId: req.user.id, items: [] });
  }

  res.status(200).json({
    success: true,
    cart,
  });
});

// Add Item to Cart
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId || quantity < 1) {
    throw new AppError('Invalid product or quantity', 400);
  }

  // Verify product exists
  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  if (product.stock < quantity) {
    throw new AppError('Insufficient stock', 400);
  }

  // Get or create cart
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) {
    cart = await Cart.create({ userId: req.user.id, items: [] });
  }

  // Check if product already in cart
  const existingItem = cart.items.find(item => item.productId.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const price = product.discountPrice || product.price;
    cart.items.push({
      productId,
      productName: product.name,
      price,
      quantity,
      image: product.images[0]?.url,
    });
  }

  cart.calculateTotals();
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Item added to cart',
    cart,
  });
});

// Update Cart Item Quantity
export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity < 1) {
    throw new AppError('Invalid product or quantity', 400);
  }

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  const cartItem = cart.items.find(item => item.productId.toString() === productId);
  if (!cartItem) {
    throw new AppError('Item not in cart', 404);
  }

  // Verify stock
  const product = await Product.findById(productId);
  if (product.stock < quantity) {
    throw new AppError('Insufficient stock', 400);
  }

  cartItem.quantity = quantity;
  cart.calculateTotals();
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart updated',
    cart,
  });
});

// Remove Item from Cart
export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);

  cart.calculateTotals();
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    cart,
  });
});

// Clear Cart
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user.id },
    { items: [], totalItems: 0, totalPrice: 0 },
    { new: true }
  );

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Cart cleared',
    cart,
  });
});
