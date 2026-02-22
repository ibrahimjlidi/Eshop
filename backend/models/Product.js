/**
 * Product Model
 * Schema for e-commerce products with inventory and pricing
 */

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Other'],
    },

    // Pricing and Inventory
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },

    // Images
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: String, // For Cloudinary
      },
    ],

    // Ratings and Reviews
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        userName: String,
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Product Attributes
    attributes: {
      brand: String,
      material: String,
      color: [String],
      size: [String],
      weight: String,
      dimensions: String,
    },

    // SEO
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    metaDescription: String,
    metaKeywords: [String],

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Admin
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

// Create slug from product name before saving
productSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

// Calculate discount percentage
productSchema.methods.getDiscountPercentage = function() {
  if (!this.discountPrice) return 0;
  return Math.round(((this.price - this.discountPrice) / this.price) * 100);
};

// Check if product is in stock
productSchema.methods.isInStock = function() {
  return this.stock > 0;
};

const Product = mongoose.model('Product', productSchema);

export default Product;
