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
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 font-bold text-2xl">
              <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
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
                className="w-full px-4 py-2 bg-white text-black border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button type="submit" className="ml-2 text-black">
                <Search size={20} />
              </button>
            </form>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-6">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm">{user?.firstName}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-white transition"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-gray-400 hover:text-white transition">
                  <span className="text-sm">Connexion</span>
                </Link>
              )}

              <Link to="/cart" className="relative group">
                <ShoppingCart className="text-gray-400 group-hover:text-white transition" size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>

              <div className="text-sm">
                <div className="text-gray-400">Panier</div>
                <div className="font-semibold">0.00 DT</div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-8 py-4 ${menuOpen ? 'block' : 'hidden md:flex'}`}>
            <Link to="/products" className="text-white font-semibold hover:text-red-600 transition">
              NOUVEAUTÉS
            </Link>
            <Link to="/products" className="text-white font-semibold hover:text-red-600 transition">
              TOP VENTES
            </Link>
            <Link to="/products" className="text-white font-semibold hover:text-red-600 transition">
              SNEAKERS
            </Link>
            <Link to="/products" className="text-white font-semibold hover:text-red-600 transition">
              VÊTEMENTS
            </Link>
            <Link to="/products" className="text-white font-semibold hover:text-red-600 transition">
              MARQUES
            </Link>
            <Link to="/products" className="text-white font-semibold hover:text-red-600 transition">
              ACCESSOIRES
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin/dashboard" className="text-white font-semibold hover:text-red-600 transition">
                ADMIN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
