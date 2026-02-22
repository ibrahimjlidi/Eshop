/**
 * Products Page
 * Display all products with filters and pagination
 */

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { productAPI } from '../services/productAPI';
import {
  setLoading,
  getProductsSuccess,
  setFilters,
  setCurrentPage,
  setError,
} from '../features/productSlice';
import { Filter, X } from 'lucide-react';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { products, isLoading, filters, currentPage, totalPages } = useSelector(
    state => state.products
  );
  const [showFilters, setShowFilters] = useState(false);

  // Update filters from URL params
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    dispatch(setFilters({ search, category }));
  }, [searchParams, dispatch]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading());
      try {
        const data = await productAPI.getAllProducts({
          page: currentPage,
          limit: 12,
          search: filters.search,
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          sortBy: filters.sortBy,
        });
        dispatch(getProductsSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch products';
        dispatch(setError(errorMessage));
      }
    };

    fetchProducts();
  }, [dispatch, filters, currentPage]);

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home',
    'Sports',
    'Beauty',
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Products</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:w-64 ${
              showFilters ? 'block' : 'hidden'
            } lg:block bg-white rounded-lg shadow-md p-6 h-fit`}
          >
            <div className="flex items-center justify-between mb-6 lg:mb-4">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Filter size={20} />
                <span>Filters</span>
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={filters.category === ''}
                    onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-2 text-gray-700">All Categories</span>
                </label>
                {categories.map(cat => (
                  <label key={cat} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="ml-2 text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-600">Min Price</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.minPrice}
                    onChange={(e) =>
                      dispatch(setFilters({ minPrice: parseFloat(e.target.value) || 0 }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Max Price</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.maxPrice === Infinity ? '' : filters.maxPrice}
                    onChange={(e) =>
                      dispatch(
                        setFilters({ maxPrice: e.target.value ? parseFloat(e.target.value) : Infinity })
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-semibold mb-3">Sort By</h3>
              <select
                value={filters.sortBy}
                onChange={(e) => dispatch(setFilters({ sortBy: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden mb-4 flex items-center space-x-2 text-primary hover:text-primary/80"
            >
              <Filter size={20} />
              <span>Show Filters</span>
            </button>

            {isLoading ? (
              <LoadingSpinner />
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => dispatch(setCurrentPage(page))}
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
