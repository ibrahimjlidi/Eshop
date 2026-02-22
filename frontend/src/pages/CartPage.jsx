/**
 * Cart Page
 * Shopping cart display and checkout
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { updateItemQuantity, removeFromCart, clearCart } from '../features/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector(state => state.cart);
  const shippingCost = totalPrice > 100 ? 0 : 10;
  const tax = Math.round(totalPrice * 0.1 * 100) / 100;
  const finalTotal = totalPrice + shippingCost + tax;

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {items.map(item => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between p-6 border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Product Info */}
                  <div className="flex items-start space-x-4 flex-1">
                    <img
                      src={item.image || 'https://via.placeholder.com/80'}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{item.productName}</h3>
                      <p className="text-gray-600 text-sm mb-2">Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 mr-6">
                    <button
                      onClick={() =>
                        dispatch(updateItemQuantity({ productId: item.productId, quantity: item.quantity - 1 }))
                      }
                      className="p-1 text-gray-500 hover:text-primary"
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateItemQuantity({
                            productId: item.productId,
                            quantity: parseInt(e.target.value) || 1,
                          })
                        )
                      }
                      className="w-12 text-center border border-gray-300 rounded px-2 py-1"
                    />
                    <button
                      onClick={() =>
                        dispatch(updateItemQuantity({ productId: item.productId, quantity: item.quantity + 1 }))
                      }
                      className="p-1 text-gray-500 hover:text-primary"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right mr-6 w-20">
                    <p className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.productId))}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? 'text-green-600 font-semibold' : ''}>
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {shippingCost === 0 && (
                <p className="text-xs text-green-600">Free shipping on orders over $100!</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center justify-center space-x-2 mb-3"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/products"
              className="w-full text-center border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
