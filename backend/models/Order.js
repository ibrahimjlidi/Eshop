/**
 * Order Model
 * Schema for customer orders with items, shipping, and payment status
 */

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    // Order Items
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: String,
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        image: String,
      },
    ],

    // Customer Information
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customerName: String,
    customerEmail: String,
    customerPhone: String,

    // Shipping Address
    shippingAddress: {
      fullName: String,
      phoneNumber: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },

    // Order Totals
    subtotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    // Payment Information
    paymentMethod: {
      type: String,
      enum: ['stripe', 'paypal', 'cod'], // Cash on Delivery
      default: 'stripe',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    stripeSessionId: String,
    stripePaymentIntentId: String,

    // Order Status
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    // Delivery Information
    shippingMethod: {
      type: String,
      enum: ['standard', 'express', 'overnight'],
      default: 'standard',
    },
    trackingNumber: String,
    estimatedDeliveryDate: Date,
    actualDeliveryDate: Date,

    // Additional Information
    notes: String,
    cancellationReason: String,
    returnReason: String,

    // Status Tracking
    statusHistory: [
      {
        status: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Calculate order total
orderSchema.methods.calculateTotal = function() {
  const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return subtotal + this.shippingCost + this.tax - this.discount;
};

// Add status to history
orderSchema.methods.updateOrderStatus = function(newStatus, note = '') {
  this.orderStatus = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    note,
  });
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
