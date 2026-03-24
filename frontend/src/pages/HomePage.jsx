/**
 * Home Page
 * Landing page with featured products and hero section
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, Zap, Truck, Shield, Clock } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { productAPI } from '../services/productAPI';
import { setLoading, getFeaturedSuccess } from '../features/productSlice';
import { fetchSettings } from '../features/settingsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featuredProducts, isLoading } = useSelector(state => state.products);
  const { settings } = useSelector(state => state.settings);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading());
      try {
        const data = await productAPI.getFeaturedProducts();
        dispatch(getFeaturedSuccess(data.products));
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      }
    };

    fetchData();
    dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <MainLayout>
      {/* Promotional Banner */}
      {settings?.banner?.isVisible && (
        <div className={`${settings.banner.backgroundColor} ${settings.banner.textColor} text-center py-3 px-4 text-sm md:text-base font-semibold`}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {settings.banner.messages.map((msg, idx) => (
              <span key={idx}>{msg}</span>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section with Featured Collections */}
      <section className="relative h-96 md:h-96 overflow-hidden bg-black">
        <div className="grid grid-cols-2 h-full gap-0">
          {/* Left Hero */}
          <div
            className="relative bg-cover bg-center flex items-center justify-center text-white group animate-fade-in-up"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop)',
              backgroundSize: 'cover',
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
            <div className="relative text-center p-8">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Sneakers<br /><span className="text-primary-light italic">Premium</span></h2>
              <button className="bg-white text-dark px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all duration-500 shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1 active:translate-y-0">
                Découvrir
              </button>
            </div>
          </div>

          {/* Right Hero */}
          <div
            className="relative bg-cover bg-center flex items-center justify-center text-white group animate-fade-in-up animate-stagger-1"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop)',
              backgroundSize: 'cover',
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
            <div className="relative text-center p-8">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Mode<br /><span className="text-secondary italic">Exclusive</span></h2>
              <button className="bg-white text-dark px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-secondary hover:text-white transition-all duration-500 shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1 active:translate-y-0">
                Découvrir
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto section-spacing">
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="text-5xl font-black mb-4 text-dark tracking-tighter uppercase">Dernières Nouveautés</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 text-lg">L'excellence du style, sélectionnée pour vous.</p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <div key={product._id} className={`animate-fade-in-up animate-stagger-${(index % 3) + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition"
          >
            <span>Voir tous les produits</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2 text-black">TOP CATEGORIES</h2>
          <div className="w-16 h-1 bg-primary mb-8"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sneakers',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
              },
              {
                name: 'Vêtements',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
              },
              {
                name: 'Accessoires',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
              },
            ].map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="relative h-48 rounded overflow-hidden group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck size={40} />,
                title: 'Livraison Gratuite',
                description: 'Sur toute la Tunisie',
              },
              {
                icon: <Zap size={40} />,
                title: 'Promotion',
                description: 'Jusqu\'à -60%',
              },
              {
                icon: <Shield size={40} />,
                title: 'Paiement Sécurisé',
                description: 'Transactions cryptées',
              },
              {
                icon: <Clock size={40} />,
                title: 'Support 24/7',
                description: 'Service client dédié',
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-primary mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-black">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
