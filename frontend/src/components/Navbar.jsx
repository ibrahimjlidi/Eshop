/**
 * Navbar Component
 * Main navigation bar with search, cart, and user menu
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Search, Menu, X, LogOut, ArrowRight } from 'lucide-react';
import { logout } from '../features/authSlice';
import { fetchSettings } from '../features/settingsSlice';
import AuthModal from '../components/AuthModal';
import PromoBanner from '../components/PromoBanner';

const megaMenuData = {
  'NOUVEAUTÉS': {
    columns: [
      { title: 'Tendance', links: ['Streetwear', 'Minimaliste', 'Vintage', 'Techwear'] },
      { title: 'Collections', links: ['Printemps 2024', 'Exclusivités', 'Éditions Limitées', 'Collaborations'] }
    ],
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80',
    tag: 'Collection 2024'
  },
  'TOP VENTES': {
    columns: [
      { title: 'Populaire', links: ['Sneakers Classiques', 'T-shirts Graphiques', 'Vestes Légères'] },
      { title: 'Essentiels', links: ['Hoodies', 'Chaussettes', 'Casquettes', 'Sacs à dos'] }
    ],
    image: 'https://images.unsplash.com/photo-1523398002811-999aa8e9f5b9?w=800&q=80',
    tag: 'Best Sellers'
  },
  'SNEAKERS': {
    columns: [
      { title: 'Marques', links: ['Nike', 'Adidas', 'New Balance', 'Asics'] },
      { title: 'Styles', links: ['Running', 'Lifestyle', 'Basketball', 'Skate'] }
    ],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    tag: 'Hyped'
  },
  'VÊTEMENTS': {
    columns: [
      { title: 'Hauts', links: ['T-shirts', 'Sweats & Pulls', 'Vestes & Manteaux'] },
      { title: 'Bas', links: ['Pantalons', 'Jeans', 'Shorts', 'Joggings'] }
    ],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    tag: 'Nouveautés'
  },
  'MARQUES': null,
  'ACCESSOIRES': null
};

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { totalItems } = useSelector(state => state.cart);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAuth, setOpenAuth] = useState(false);

  // Fetch settings on mount
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <PromoBanner />

      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-soft border-b border-gray-100/50">

        {/* Top Section — White: Logo + Search + User + Cart */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex justify-between items-center h-20">

              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 font-bold text-2xl">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#27B4F5' }}>
                  E
                </div>
                <span className="text-dark">Shop</span>
              </Link>

              {/* Search */}
              <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8 relative group">
                <input
                  type="text"
                  placeholder="Je cherche..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-2.5 bg-gray-50 text-dark border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:border-[#27B4F5]/30 transition-all duration-300"
                  style={{ '--tw-ring-color': '#27B4F520' }}
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#27B4F5] transition-colors">
                  <Search size={20} />
                </button>
              </form>

              {/* Right Section */}
              <div className="hidden md:flex items-center space-x-6">

                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">{user?.firstName}</span>
                    <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition">
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setOpenAuth(true)} className="text-gray-700 hover:text-[#27B4F5] transition">
                    <span className="text-sm">Connexion</span>
                  </button>
                )}

                {/* Cart */}
                <Link to="/cart" className="relative group p-2 rounded-full hover:bg-gray-50 transition">
                  <ShoppingCart className="text-gray-600 group-hover:text-[#27B4F5]" size={24} />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold" style={{ backgroundColor: '#27B4F5' }}>
                      {totalItems}
                    </span>
                  )}
                </Link>

                <div className="text-sm">
                  <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Panier</div>
                  <div className="font-black text-dark tracking-tighter">0.00 DT</div>
                </div>

              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-900 p-2">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

            </div>
          </div>
        </div>

        {/* Categories Bar — #27B4F5 blue */}
        <div className="hidden md:block" style={{ backgroundColor: '#27B4F5' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex items-center space-x-10 py-4">

              {Object.keys(megaMenuData).map((cat) => (
                <div key={cat} className="group/nav relative py-4">
                  <Link
                    to="/products"
                    className="relative text-[13px] text-white font-bold tracking-widest hover:text-white/80 transition uppercase whitespace-nowrap z-10 block"
                  >
                    {cat}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover/nav:w-full"></span>
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {megaMenuData[cat] && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[650px] bg-white rounded-2xl shadow-premium opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform translate-y-4 group-hover/nav:translate-y-0 z-50 overflow-hidden border border-gray-100/50 backdrop-blur-xl">
                      <div className="grid grid-cols-3 p-6 gap-6">
                        <div className="col-span-2 grid grid-cols-2 gap-4">
                          {megaMenuData[cat].columns.map((col, idx) => (
                            <div key={idx}>
                              <h3 className="font-black text-dark mb-4 uppercase tracking-wider text-sm">{col.title}</h3>
                              <ul className="space-y-3">
                                {col.links.map((link, i) => (
                                  <li key={i}>
                                    <Link to="/products" className="text-gray-500 hover:text-[#27B4F5] transition text-sm font-medium flex items-center group/link">
                                      <span className="w-0 h-[1px] bg-[#27B4F5] mr-0 transition-all group-hover/link:w-2 group-hover/link:mr-2 inline-block"></span>
                                      {link}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Featured Image */}
                        <div className="col-span-1 relative rounded-xl overflow-hidden group/img h-full min-h-[200px]">
                          <img src={megaMenuData[cat].image} alt={cat} className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-110 transition duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className="inline-block text-white text-[10px] font-black uppercase px-2 py-1 rounded mb-2 shadow-soft" style={{ backgroundColor: '#27B4F5' }}>
                              {megaMenuData[cat].tag}
                            </span>
                            <div className="text-white font-bold text-sm uppercase tracking-wider flex items-center group-hover/img:text-[#27B4F5] transition-colors">
                              Découvrir <ArrowRight size={14} className="ml-1 transform group-hover/img:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isAuthenticated && user?.role === 'admin' && (
                <Link to="/admin/dashboard" className="text-[13px] text-white font-bold tracking-widest uppercase border-l-2 pl-10 border-white/40">
                  ADMIN PANEL
                </Link>
              )}

            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">

            <div className="flex flex-col divide-y divide-gray-100">
              {['NOUVEAUTÉS', 'TOP VENTES', 'SNEAKERS', 'VÊTEMENTS', 'MARQUES', 'ACCESSOIRES'].map((cat) => (
                <Link
                  key={cat}
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-4 text-sm font-bold tracking-wide text-gray-800 hover:bg-gray-50 transition uppercase"
                >
                  {cat}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="w-full text-left text-sm font-semibold text-red-500 hover:text-red-600">
                  Déconnexion
                </button>
              ) : (
                <button
                  onClick={() => { setOpenAuth(true); setMenuOpen(false); }}
                  className="w-full text-left text-sm font-semibold"
                  style={{ color: '#27B4F5' }}
                >
                  Connexion
                </button>
              )}
            </div>

          </div>
        )}
      </nav>

      {/* IMPORTANT: Modal OUTSIDE nav */}
      <AuthModal open={openAuth} setOpen={setOpenAuth} />

    </>
  );
};

export default Navbar;
