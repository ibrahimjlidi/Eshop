import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { productAPI } from '../services/productAPI';
import { addToCartSuccess } from '../features/cartSlice';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const data = await productAPI.getProductById(id);
        setProduct(data.product);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      if (quantity < product.stock) setQuantity(prev => prev + 1);
    } else {
      if (quantity > 1) setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    
    setAddingToCart(true);
    
    const cartItem = {
      productId: product._id,
      productName: product.name,
      price: product.discountPrice || product.price,
      quantity,
      image: product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/300'
    };

    dispatch(addToCartSuccess(cartItem));
    
    setTimeout(() => {
      setAddingToCart(false);
      toast.success(`${product.name} added to cart!`);
    }, 500);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen pt-20">
          <LoadingSpinner />
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Product</h2>
          <p className="text-gray-600 mb-8">{error || 'Product not found.'}</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold"
          >
            Back to Products
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-8 transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 flex justify-center items-center h-[500px]">
            <img 
              src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/500'} 
              alt={product.name}
              className="max-h-full object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < Math.round(product.averageRating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                  />
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  ({product.numOfReviews || 0} reviews)
                </span>
              </div>
              <span className="text-gray-400">|</span>
              <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>

            <div className="mb-6 flex items-end space-x-4">
              {product.discountPrice ? (
                <>
                  <span className="text-4xl font-bold text-gray-900">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-xl text-gray-500 line-through mb-1">${product.price.toFixed(2)}</span>
                  <span className="bg-red-100 text-red-700 font-semibold px-2 py-1 rounded text-sm mb-1">
                    Save ${(product.price - product.discountPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <p className="font-semibold text-gray-800 mb-4">Quantity</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={quantity <= 1 || product.stock === 0}
                    className="p-3 text-gray-600 hover:text-primary disabled:opacity-50"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange('increment')}
                    disabled={quantity >= product.stock || product.stock === 0}
                    className="p-3 text-gray-600 hover:text-primary disabled:opacity-50"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="text-gray-500 text-sm">
                  Total: <span className="font-bold text-gray-800">${((product.discountPrice || product.price) * quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addingToCart}
                className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 text-lg font-bold transition-all
                  ${product.stock === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : addingToCart 
                      ? 'bg-green-500 text-white' 
                      : 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl'
                  }`}
              >
                {addingToCart ? (
                  <>
                    <Check size={24} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={24} />
                    <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailsPage;
