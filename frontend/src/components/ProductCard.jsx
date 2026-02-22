/**
 * Product Card Component
 * Displays individual product information
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCartSuccess } from '../features/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCartSuccess({
        productId: product._id,
        productName: product.name,
        price: product.discountPrice || product.price,
        quantity: 1,
        image: product.images[0]?.url,
      })
    );
    toast.success('Product added to cart!');
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden">
        {/* Image Container */}
        <div className="relative overflow-hidden h-64 bg-gray-200">
          <img
            src={product.images[0]?.url || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition duration-300"
          />
          {discountPercent > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              -{discountPercent}%
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to wishlist functionality
            }}
            className="absolute top-3 left-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            <Heart size={20} className="text-gray-400 hover:text-red-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category and Rating */}
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">
                {product.ratings || 0} ({product.numOfReviews || 0})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-primary">
              ${(product.discountPrice || product.price).toFixed(2)}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-3">
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 font-semibold">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={18} />
            <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
