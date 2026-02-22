/**
 * Database Seed Script
 * Populates database with sample data
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-ecommerce');
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
      isActive: true,
      isEmailVerified: true,
    });

    // Create sample users
    const regularUsers = await User.insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'User@1234',
        phone: '1234567890',
        isActive: true,
        isEmailVerified: true,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'User@1234',
        phone: '0987654321',
        isActive: true,
        isEmailVerified: true,
      },
    ]);

    console.log('✓ Created 3 users (1 admin, 2 regular)');

    // Create categories first
    const categories = await Category.insertMany([
      {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and gadgets',
        displayOrder: 1,
        isActive: true,
      },
      {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Apparel and fashion items',
        displayOrder: 2,
        isActive: true,
      },
      {
        name: 'Books',
        slug: 'books',
        description: 'Books and reading materials',
        displayOrder: 3,
        isActive: true,
      },
      {
        name: 'Sports',
        slug: 'sports',
        description: 'Sports equipment and gear',
        displayOrder: 4,
        isActive: true,
      },
      {
        name: 'Home',
        slug: 'home',
        description: 'Home and kitchen items',
        displayOrder: 5,
        isActive: true,
      },
    ]);

    console.log('✓ Created 5 categories');

    // Create sample products
    const products = await Product.insertMany([
      {
        name: 'Wireless Headphones',
        slug: 'wireless-headphones',
        description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life.',
        category: 'Electronics',
        price: 199.99,
        discountPrice: 149.99,
        stock: 50,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
            public_id: 'headphones_1',
          },
        ],
        attributes: {
          brand: 'AudioPro',
          color: ['Black', 'Silver'],
          material: 'Premium Plastic and Metal',
        },
        ratings: 4.5,
        numOfReviews: 45,
        isFeatured: true,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Cotton T-Shirt',
        slug: 'cotton-t-shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple sizes and colors.',
        category: 'Clothing',
        price: 29.99,
        discountPrice: 19.99,
        stock: 100,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
            public_id: 'tshirt_1',
          },
        ],
        attributes: {
          brand: 'ComfyWear',
          color: ['White', 'Black', 'Blue'],
          size: ['S', 'M', 'L', 'XL'],
          material: '100% Cotton',
        },
        ratings: 4.2,
        numOfReviews: 120,
        isFeatured: true,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Programming Book',
        slug: 'programming-book',
        description: 'Comprehensive guide to modern web development with React and Node.js.',
        category: 'Books',
        price: 45.99,
        stock: 30,
        images: [
          {
            url: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=500&h=500&fit=crop',
            public_id: 'book_1',
          },
        ],
        attributes: {
          brand: 'Tech Press',
          material: 'Hardcover',
        },
        ratings: 4.8,
        numOfReviews: 85,
        isFeatured: true,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Smart Watch',
        slug: 'smart-watch',
        description: 'Advanced fitness tracking smartwatch with heart rate monitor and GPS.',
        category: 'Electronics',
        price: 299.99,
        discountPrice: 249.99,
        stock: 25,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
            public_id: 'watch_1',
          },
        ],
        attributes: {
          brand: 'TechFit',
          color: ['Black', 'Silver', 'Gold'],
          material: 'Aluminum and Glass',
        },
        ratings: 4.6,
        numOfReviews: 200,
        isFeatured: false,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Yoga Mat',
        slug: 'yoga-mat',
        description: 'Non-slip yoga mat made from eco-friendly TPE material, perfect for all types of yoga.',
        category: 'Sports',
        price: 49.99,
        discountPrice: 34.99,
        stock: 60,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
            public_id: 'yogamat_1',
          },
        ],
        attributes: {
          brand: 'YogaPro',
          color: ['Purple', 'Blue', 'Green'],
          material: 'TPE',
        },
        ratings: 4.7,
        numOfReviews: 150,
        isFeatured: true,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Stainless Steel Water Bottle',
        slug: 'stainless-steel-water-bottle',
        description: 'Keeps beverages cold for 24 hours or hot for 12 hours. Durable and lightweight.',
        category: 'Home',
        price: 34.99,
        stock: 75,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
            public_id: 'bottle_1',
          },
        ],
        attributes: {
          brand: 'HydroFlow',
          color: ['Silver', 'Black', 'Blue'],
          capacity: '750ml',
        },
        ratings: 4.4,
        numOfReviews: 320,
        isFeatured: false,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Gaming Laptop',
        slug: 'gaming-laptop',
        description: 'High-performance gaming laptop with RTX 3080, 16GB RAM, and 512GB SSD. Perfect for gaming and content creation.',
        category: 'Electronics',
        price: 1299.99,
        discountPrice: 1099.99,
        stock: 20,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1588872657897-a0e348953b75?w=500&h=500&fit=crop',
            public_id: 'laptop_1',
          },
        ],
        attributes: {
          brand: 'TechPower',
          color: ['Black', 'Silver'],
          processor: 'Intel i9',
          ram: '16GB',
          storage: '512GB SSD',
        },
        ratings: 4.8,
        numOfReviews: 95,
        isFeatured: true,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Wireless Mouse',
        slug: 'wireless-mouse',
        description: 'Ergonomic wireless mouse with precision tracking and 18-month battery life.',
        category: 'Electronics',
        price: 49.99,
        discountPrice: 34.99,
        stock: 120,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
            public_id: 'mouse_1',
          },
        ],
        attributes: {
          brand: 'ProTech',
          color: ['White', 'Black'],
          dpi: '3200',
        },
        ratings: 4.3,
        numOfReviews: 240,
        isFeatured: false,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Running Shoes',
        slug: 'running-shoes',
        description: 'Professional running shoes with cushioned support and breathable mesh for all-day comfort.',
        category: 'Sports',
        price: 129.99,
        discountPrice: 89.99,
        stock: 85,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
            public_id: 'shoes_1',
          },
        ],
        attributes: {
          brand: 'RunFast',
          color: ['White', 'Black', 'Blue', 'Red'],
          size: ['6', '7', '8', '9', '10', '11', '12', '13'],
        },
        ratings: 4.6,
        numOfReviews: 310,
        isFeatured: true,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Digital Camera',
        slug: 'digital-camera',
        description: '24MP digital camera with 4K video recording, optical image stabilization, and WiFi connectivity.',
        category: 'Electronics',
        price: 799.99,
        discountPrice: 649.99,
        stock: 30,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
            public_id: 'camera_1',
          },
        ],
        attributes: {
          brand: 'CameraMax',
          color: ['Black', 'Silver'],
          megapixels: '24MP',
          videoQuality: '4K',
        },
        ratings: 4.7,
        numOfReviews: 165,
        isFeatured: true,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Travel Backpack',
        slug: 'travel-backpack',
        description: 'Durable 40-liter travel backpack with multiple compartments, USB charging port, and weather-resistant material.',
        category: 'Home',
        price: 79.99,
        discountPrice: 59.99,
        stock: 65,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
            public_id: 'backpack_1',
          },
        ],
        attributes: {
          brand: 'TravelPro',
          color: ['Black', 'Navy', 'Gray'],
          capacity: '40L',
          material: 'Nylon',
        },
        ratings: 4.5,
        numOfReviews: 280,
        isFeatured: false,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Mechanical Keyboard',
        slug: 'mechanical-keyboard',
        description: 'RGB mechanical keyboard with mechanical switches, customizable backlighting, and aluminum frame.',
        category: 'Electronics',
        price: 149.99,
        discountPrice: 119.99,
        stock: 55,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1587829191301-289e1e2cd18e?w=500&h=500&fit=crop',
            public_id: 'keyboard_1',
          },
        ],
        attributes: {
          brand: 'KeyMaster',
          color: ['Black', 'White'],
          switchType: 'Mechanical',
          layout: 'Full-Size',
        },
        ratings: 4.7,
        numOfReviews: 205,
        isFeatured: false,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Bluetooth Speaker',
        slug: 'bluetooth-speaker',
        description: 'Portable waterproof Bluetooth speaker with 360-degree sound and 12-hour battery life.',
        category: 'Electronics',
        price: 89.99,
        discountPrice: 69.99,
        stock: 100,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=500&h=500&fit=crop',
            public_id: 'speaker_1',
          },
        ],
        attributes: {
          brand: 'SoundWave',
          color: ['Black', 'Blue', 'Red'],
          waterproof: 'IPX7',
        },
        ratings: 4.4,
        numOfReviews: 370,
        isFeatured: true,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Fitness Tracker Watch',
        slug: 'fitness-tracker-watch',
        description: 'Advanced fitness tracker with heart rate monitoring, sleep tracking, GPS, and 7-day battery life.',
        category: 'Electronics',
        price: 199.99,
        discountPrice: 149.99,
        stock: 40,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
            public_id: 'fitnesstracker_1',
          },
        ],
        attributes: {
          brand: 'FitLife',
          color: ['Black', 'White', 'Pink'],
          features: ['Heart Rate', 'GPS', 'Sleep Tracking'],
        },
        ratings: 4.6,
        numOfReviews: 225,
        isFeatured: false,
        isActive: true,
        createdBy: adminUser._id,
      },
      {
        name: 'Wireless Phone Charger',
        slug: 'wireless-phone-charger',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Non-slip surface and LED indicator.',
        category: 'Electronics',
        price: 39.99,
        discountPrice: 24.99,
        stock: 150,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
            public_id: 'charger_1',
          },
        ],
        attributes: {
          brand: 'ChargeMax',
          color: ['White', 'Black'],
          wattage: '10W',
          compatibility: 'All Qi-enabled',
        },
        ratings: 4.2,
        numOfReviews: 410,
        isFeatured: false,
        isActive: true,
        createdBy: adminUser._id,
      },
    ]);

    console.log('✓ Created 16 sample products');

    console.log('\n✓ Database seeding completed successfully!');
    console.log('\nSample Login Credentials:');
    console.log('Admin Email: admin@example.com | Password: Admin@123');
    console.log('User Email: john@example.com | Password: User@1234');
    console.log('User Email: jane@example.com | Password: User@1234');

    await mongoose.connection.close();
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();

