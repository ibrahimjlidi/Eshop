/**
 * Navbar Component
 * Main navigation bar with search, cart, and user menu
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Search, Menu, X, LogOut } from 'lucide-react';
import { logout } from '../features/authSlice';
import AuthModal from '../components/AuthModal';

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { totalItems } = useSelector(state => state.cart);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAuth, setOpenAuth] = useState(false);

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
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-soft border-b border-gray-100/50">

        {/* Top Navigation */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex justify-between items-center h-20">

              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 font-bold text-2xl">
                <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  E
                </div>
                <span>Shop</span>
              </Link>

              {/* Search */}
              <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8 relative group">
                <input
                  type="text"
                  placeholder="Je cherche..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-2.5 bg-gray-50 text-dark border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary/30 transition-all duration-300"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary group-focus-within:text-secondary transition-colors">
                  <Search size={20} />
                </button>
              </form>

              {/* Right Section */}
              <div className="hidden md:flex items-center space-x-6">

                {isAuthenticated ? (

                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                      {user?.firstName}
                    </span>

                    <button
                      onClick={handleLogout}
                      className="text-gray-500 hover:text-red-500 transition"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>

                ) : (

                  <button
                    onClick={() => setOpenAuth(true)}
                    className="text-gray-700 hover:text-primary transition"
                  >
                    <span className="text-sm">Connexion</span>
                  </button>

                )}

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative group p-2 rounded-full hover:bg-gray-50 transition"
                >
                  <ShoppingCart
                    className="text-gray-600 group-hover:text-primary"
                    size={24}
                  />

                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <div className="text-sm">
                  <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Panier</div>
                  <div className="font-black text-dark tracking-tighter">0.00 DT</div>
                </div>

              </div>

              {/* Mobile Menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-gray-900 p-2"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-gray-100 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex items-center space-x-10 py-4 overflow-x-auto no-scrollbar">

              {[
                'NOUVEAUTÉS',
                'TOP VENTES',
                'SNEAKERS',
                'VÊTEMENTS',
                'MARQUES',
                'ACCESSOIRES'
              ].map((cat) => (

                <Link
                  key={cat}
                  to="/products"
                  className="group relative text-[13px] text-gray-600 font-bold tracking-widest hover:text-primary transition uppercase whitespace-nowrap"
                >
                  {cat}

                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>

              ))}

              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="text-[13px] text-primary font-bold tracking-widest uppercase border-l-2 pl-10 border-gray-200"
                >
                  ADMIN PANEL
                </Link>
              )}

            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">

            {/* Categories */}
            <div className="flex flex-col divide-y divide-gray-100">

              {[
                'NOUVEAUTÉS',
                'TOP VENTES',
                'SNEAKERS',
                'VÊTEMENTS',
                'MARQUES',
                'ACCESSOIRES'
              ].map((cat) => (

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

            {/* User Section */}
            <div className="border-t border-gray-200 p-4">

              {isAuthenticated ? (

                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm font-semibold text-red-500 hover:text-red-600"
                >
                  Déconnexion
                </button>

              ) : (

                <button
                  onClick={() => {
                    setOpenAuth(true);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left text-sm font-semibold text-primary"
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