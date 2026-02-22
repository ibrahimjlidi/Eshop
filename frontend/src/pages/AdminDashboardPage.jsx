/**
 * Admin Dashboard Page
 * Display admin statistics and overview
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { adminAPI } from '../services/adminAPI';
import { getDashboardStatsSuccess, setLoading, setError } from '../features/adminSlice';
import { BarChart3, Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector(state => state.admin);

  useEffect(() => {
    const fetchStats = async () => {
      dispatch(setLoading());
      try {
        const data = await adminAPI.getDashboardStats();
        dispatch(getDashboardStatsSuccess(data.stats));
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch stats';
        dispatch(setError(errorMessage));
      }
    };

    fetchStats();
  }, [dispatch]);

  if (isLoading) {
    return <AdminLayout><LoadingSpinner /></AdminLayout>;
  }

  const dashboardCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                  </div>
                  <div className={`${card.color} p-4 rounded-lg`}>
                    <Icon className="text-white" size={28} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Orders by Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Orders by Status</h2>
            <div className="space-y-3">
              {stats.ordersByStatus?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">{item._id}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(item.count / stats.totalOrders) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-800 w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Month */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Revenue by Month</h2>
            <div className="space-y-3">
              {stats.revenueByMonth?.slice(-6).reverse().map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {new Date(2024, item._id.month - 1).toLocaleString('default', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (item.revenue / Math.max(...stats.revenueByMonth.map(r => r.revenue))) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-800 w-20 text-right">
                      ${item.revenue.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders?.slice(0, 5).map(order => (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{order._id?.substring(0, 8)}</td>
                    <td className="py-3 px-4 text-gray-800">
                      {order.userId?.firstName} {order.userId?.lastName}
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-semibold">
                      ${order.totalPrice?.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.orderStatus === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
