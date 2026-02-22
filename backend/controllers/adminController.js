/**
 * Admin Dashboard Controller
 * Handles admin dashboard statistics and analytics
 */

import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Get Dashboard Statistics
export const getDashboardStats = asyncHandler(async (req, res) => {
  // Total users
  const totalUsers = await User.countDocuments();
  
  // Total products
  const totalProducts = await Product.countDocuments();
  
  // Total orders
  const totalOrders = await Order.countDocuments();
  
  // Total revenue
  const orders = await Order.find({ paymentStatus: 'paid' });
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  // Recent orders
  const recentOrders = await Order.find()
    .populate('userId', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .limit(10);

  // Orders by status
  const ordersByStatus = await Order.aggregate([
    {
      $group: {
        _id: '$orderStatus',
        count: { $sum: 1 },
      },
    },
  ]);

  // Revenue by month (last 12 months)
  const revenueByMonth = await Order.aggregate([
    {
      $match: { paymentStatus: 'paid' },
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        revenue: { $sum: '$totalPrice' },
        orders: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      ordersByStatus,
      revenueByMonth,
      recentOrders,
    },
  });
});

// Get All Users (Admin)
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const totalUsers = await User.countDocuments(filter);

  res.status(200).json({
    success: true,
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: parseInt(page),
    users,
  });
});

// Update User Role (Admin Only)
export const updateUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid role',
    });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'User role updated successfully',
    user,
  });
});

// Delete User (Admin Only)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});
