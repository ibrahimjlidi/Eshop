/**
 * Order Controller
 * Handles order creation, retrieval, and management
 */

import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { createCheckoutSession, getCheckoutSession } from '../utils/stripe.js';

// Create Order
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, shippingMethod = 'standard' } = req.body;

  if (!items || items.length === 0) {
    throw new AppError('Order must contain at least one item', 400);
  }

  if (!shippingAddress) {
    throw new AppError('Shipping address is required', 400);
  }

  // Validate products and calculate totals
  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    
    if (!product) {
      throw new AppError(`Product not found: ${item.productId}`, 404);
    }

    if (product.stock < item.quantity) {
      throw new AppError(`Insufficient stock for ${product.name}`, 400);
    }

    const price = product.discountPrice || product.price;
    subtotal += price * item.quantity;

    orderItems.push({
      productId: product._id,
      productName: product.name,
      price,
      quantity: item.quantity,
      image: product.images[0]?.url,
    });
  }

  // Calculate shipping and tax
  const shippingCost = calculateShippingCost(shippingMethod, subtotal);
  const tax = Math.round(subtotal * 0.1 * 100) / 100; // 10% tax
  const totalPrice = subtotal + shippingCost + tax;

  // Create order
  const order = await Order.create({
    items: orderItems,
    userId: req.user.id,
    shippingAddress,
    subtotal,
    shippingCost,
    tax,
    totalPrice,
    shippingMethod,
  });

  // Update product stock
  for (const item of items) {
    await Product.findByIdAndUpdate(
      item.productId,
      { $inc: { stock: -item.quantity } }
    );
  }

  // Clear cart
  await Cart.findOneAndDelete({ userId: req.user.id });

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order,
  });
});

// Get All Orders (Admin)
export const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const filter = {};
  if (status) filter.orderStatus = status;

  const skip = (page - 1) * limit;

  const orders = await Order.find(filter)
    .populate('userId', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const totalOrders = await Order.countDocuments(filter);

  res.status(200).json({
    success: true,
    totalOrders,
    totalPages: Math.ceil(totalOrders / limit),
    currentPage: parseInt(page),
    orders,
  });
});

// Get User Orders
export const getUserOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const orders = await Order.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const totalOrders = await Order.countDocuments({ userId: req.user.id });

  res.status(200).json({
    success: true,
    totalOrders,
    totalPages: Math.ceil(totalOrders / limit),
    currentPage: parseInt(page),
    orders,
  });
});

// Get Single Order
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('userId', 'firstName lastName email');

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Check if user owns this order or is admin
  if (order.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Unauthorized to view this order', 403);
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Update Order Status (Admin Only)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, trackingNumber, note } = req.body;

  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(orderStatus)) {
    throw new AppError('Invalid order status', 400);
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new AppError('Order not found', 404);
  }

  order.updateOrderStatus(orderStatus, note);
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (orderStatus === 'delivered') order.actualDeliveryDate = new Date();

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    order,
  });
});

// Create Stripe Checkout Session
export const initiateCheckout = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError('Order not found', 404);
  }

  if (order.userId.toString() !== req.user.id) {
    throw new AppError('Unauthorized', 403);
  }

  // Create Stripe session
  const session = await createCheckoutSession(order.items, req.user.id);

  // Save session ID to order
  order.stripeSessionId = session.id;
  await order.save();

  res.status(200).json({
    success: true,
    sessionId: session.id,
    sessionUrl: session.url,
  });
});

// Verify Stripe Payment
export const verifyPayment = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  const session = await getCheckoutSession(sessionId);

  if (session.payment_status === 'paid') {
    const order = await Order.findOne({ stripeSessionId: sessionId });
    if (order) {
      order.paymentStatus = 'paid';
      order.orderStatus = 'processing';
      order.updateOrderStatus('processing', 'Payment received');
      await order.save();
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentStatus: 'paid',
    });
  } else {
    throw new AppError('Payment not completed', 400);
  }
});

// Helper function to calculate shipping cost
function calculateShippingCost(method, subtotal) {
  const shippingRates = {
    standard: subtotal > 100 ? 0 : 10,
    express: 25,
    overnight: 50,
  };
  return shippingRates[method] || 10;
}
