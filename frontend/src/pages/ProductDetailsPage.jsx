import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Check, X } from 'lucide-react';
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const data = await productAPI.getProductById(id);
        setProduct(data.product);
      } catch (err) {
        setError(err.response?.data?.message || 'Échec de la récupération des détails du produit.');
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
      toast.success(`${product.name} ajouté au panier !`);
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Erreur de chargement du produit</h2>
          <p className="text-gray-600 mb-8">{error || 'Produit non trouvé.'}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold"
          >
            Retour aux produits
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
          <span>Retour</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="flex gap-4 h-[600px] animate-fade-in-up">
            {/* Thumbnails (Left side) */}
            <div className="w-24 shrink-0 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-2">
              {(product.images && product.images.length > 0 ? product.images : [{ url: 'https://via.placeholder.com/500' }]).map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImageIndex(idx)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImageIndex === idx ? 'border-primary shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img.url} alt={`${product.name} - ${idx}`} className="w-full aspect-square object-cover" />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 glass-card rounded-3xl overflow-hidden relative shadow-premium flex justify-center items-center group bg-white">
              <img
                src={product.images && product.images.length > 0 ? product.images[activeImageIndex].url : 'https://via.placeholder.com/500'}
                alt={product.name}
                className="max-h-full max-w-full object-contain hover:scale-[1.02] transition-transform duration-500 cursor-zoom-in p-4"
                onClick={() => setIsLightboxOpen(true)}
              />
              <button 
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-gray-800 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 hover:bg-primary hover:text-white transform hover:-translate-y-1"
              >
                <Plus size={16} /> Agrandir
              </button>
            </div>
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
                  ({product.numOfReviews || 0} avis)
                </span>
              </div>
              <span className="text-gray-400">|</span>
              <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? `En Stock (${product.stock})` : 'Rupture de Stock'}
              </span>
            </div>

            <div className="mb-8 flex items-end space-x-6 animate-fade-in-up animate-stagger-1">
              {product.discountPrice ? (
                <>
                  <span className="text-5xl font-black text-primary">{(product.discountPrice).toFixed(2)} DT</span>
                  <span className="text-2xl text-gray-400 line-through mb-1">{(product.price).toFixed(2)} DT</span>
                  <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-sm mb-2 backdrop-blur-sm border border-accent/20">
                    -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-5xl font-black text-primary">{(product.price).toFixed(2)} DT</span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <p className="font-semibold text-gray-800 mb-4">Quantité</p>
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
                  Total : <span className="font-bold text-gray-800">{((product.discountPrice || product.price) * quantity).toFixed(2)} DT</span>
                </div>
              </div>
            </div>

            <div className="mt-auto animate-fade-in-up animate-stagger-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || addingToCart}
                className={`w-full py-5 rounded-2xl flex items-center justify-center space-x-3 text-xl font-black transition-all duration-300 tracking-widest uppercase
                  ${product.stock === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : addingToCart
                      ? 'bg-secondary text-white shadow-premium'
                      : 'btn-premium text-white'
                  }`}
              >
                {addingToCart ? (
                  <>
                    <Check size={28} className="animate-bounce-slow" />
                    <span>Confirmé !</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={28} />
                    <span>{product.stock === 0 ? 'Rupture de Stock' : 'Ajouter au Panier'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-gray-600 hover:text-black w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 shadow-md rounded-full transition-all duration-300 z-10"
          >
            <X size={24} />
          </button>
          
          <div className="w-full h-full flex flex-col justify-center items-center relative">
             <img 
               src={product.images && product.images.length > 0 ? product.images[activeImageIndex].url : 'https://via.placeholder.com/500'} 
               alt={product.name}
               className="max-h-[80vh] max-w-full object-contain shadow-2xl rounded-xl"
             />
             
             {/* Lightbox Navigation */}
             {product.images && product.images.length > 1 && (
               <div className="flex gap-4 mt-8 overflow-x-auto max-w-2xl py-3 px-6 bg-white border border-gray-100 shadow-lg rounded-full">
                 {product.images.map((img, idx) => (
                   <button
                     key={idx}
                     onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                     className={`w-14 h-14 rounded-full overflow-hidden border-2 shrink-0 transition-transform hover:scale-110 ${activeImageIndex === idx ? 'border-primary shadow-md' : 'border-transparent'}`}
                   >
                     <img src={img.url} className="w-full h-full object-cover" />
                   </button>
                 ))}
               </div>
             )}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ProductDetailsPage;
