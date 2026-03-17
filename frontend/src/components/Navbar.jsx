/**
 * Navbar Component
 * Main navigation bar with search, cart, and user menu
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Search, Menu, X, LogOut, Settings } from 'lucide-react';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { totalItems } = useSelector(state => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-soft border-b border-gray-100/50">
      {/* Top Navigation Bar */}
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

            {/* Search Bar - Center */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
              <input
                type="text"
                placeholder="Je cherche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 text-black border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="ml-2 text-gray-500 hover:text-primary transition">
                <Search size={20} />
              </button>
            </form>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-6">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">{user?.firstName}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition">
                  <span className="text-sm">Connexion</span>
                </Link>
              )}

              <Link to="/cart" className="relative group p-2 rounded-full hover:bg-gray-50 transition">
                <ShoppingCart className="text-gray-600 group-hover:text-primary transition" size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>

              <div className="text-sm">
                <div className="text-gray-500">Panier</div>
                <div className="font-bold text-gray-900 font-sans">0.00 DT</div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-900 p-2"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-10 py-4 overflow-x-auto no-scrollbar">
            {[
              'NOUVEAUTÉS', 'TOP VENTES', 'SNEAKERS', 'VÊTEMENTS', 'MARQUES', 'ACCESSOIRES'
            ].map((cat) => (
              <Link
                key={cat}
                to="/products"
                className="group relative text-[13px] text-gray-600 font-bold tracking-widest hover:text-primary transition-all duration-300 uppercase whitespace-nowrap"
              >
                {cat}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin/dashboard" className="text-[13px] text-primary font-bold tracking-widest hover:opacity-80 transition-all uppercase whitespace-nowrap border-l-2 pl-10 border-gray-200">
                ADMIN PANEL
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 animate-fadeIn">
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-gray-800 font-bold hover:text-primary transition">NOUVEAUTÉS</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-gray-800 font-bold hover:text-primary transition">TOP VENTES</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-gray-800 font-bold hover:text-primary transition">SNEAKERS</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-gray-800 font-bold hover:text-primary transition">VÊTEMENTS</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-gray-800 font-bold hover:text-primary transition">MARQUES</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-gray-800 font-bold hover:text-primary transition">ACCESSOIRES</Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="block text-primary font-bold hover:opacity-80 transition">ADMIN PANEL</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
