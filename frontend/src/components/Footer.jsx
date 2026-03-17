/**
 * Footer Component
 * Application footer with links and information
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-slate-400 mt-24 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-xl">
                <ShoppingCart className="text-primary" size={24} />
              </div>
              <span className="font-black text-2xl text-white tracking-tighter">EShop</span>
            </div>
            <p className="text-sm text-gray-400">
              Votre destination unique pour des produits de qualité et une expérience de shopping exceptionnelle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="hover:text-primary transition">
                  Boutique
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-white mb-4">Service Client</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shipping" className="hover:text-primary transition">
                  Infos Livraison
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary transition">
                  Retours
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition">
                  Conditions Générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-3">
              Inscrivez-vous pour recevoir nos offres spéciales !
            </p>
            <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10 focus-within:border-primary/50 transition-all">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
              />
              <button className="btn-premium px-6 py-2 rounded-xl transition shadow-lg">
                <Mail size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} EShop. Tous droits réservés.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
