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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Votre panier est vide</h2>
          <p className="text-gray-600 mb-8">Ajoutez des produits pour commencer !</p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90"
          >
            <span>Continuer vos achats</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in-up">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl overflow-hidden shadow-premium">
              {items.map(item => (
                <div className="flex items-center justify-between p-8 border-b border-gray-100 hover:bg-white/50 transition-all duration-300 group/item">
                  {/* Product Info */}
                  <div className="flex items-center space-x-6 flex-1">
                    <div className="relative overflow-hidden rounded-2xl shadow-soft group-hover/item:shadow-premium transition-all duration-500">
                      <img
                        src={item.image || 'https://via.placeholder.com/80'}
                        alt={item.productName}
                        className="w-24 h-24 object-cover transform group-hover/item:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-xl text-dark mb-1 tracking-tight">{item.productName}</h3>
                      <p className="text-primary font-bold">{item.price.toFixed(2)} DT</p>
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
                      {(item.price * item.quantity).toFixed(2)} DT
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
                Vider le panier
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="glass-card rounded-3xl p-8 h-fit shadow-premium animate-fade-in-up animate-stagger-1 border-primary/10">
            <h2 className="text-2xl font-black mb-8 text-dark tracking-tight border-b border-gray-100 pb-4">Résumé</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Sous-total ({totalItems})</span>
                <span className="font-bold text-dark">{totalPrice.toFixed(2)} DT</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Livraison</span>
                <span className={shippingCost === 0 ? 'text-secondary font-black' : 'font-bold text-dark'}>
                  {shippingCost === 0 ? 'GRATUIT' : `${shippingCost.toFixed(2)} DT`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">TVA (10%)</span>
                <span className="font-bold text-dark">{tax.toFixed(2)} DT</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-gray-500">Total</span>
                <span className="text-4xl font-black text-primary tracking-tighter">{finalTotal.toFixed(2)} DT</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full btn-premium text-white py-5 rounded-2xl flex items-center justify-center space-x-3 mb-4 group/btn"
            >
              <span className="uppercase tracking-widest font-black text-sm">Passer à la caisse</span>
              <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/products"
              className="w-full text-center border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition"
            >
              Continuer vos achats
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
