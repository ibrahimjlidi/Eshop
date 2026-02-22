/**
 * Admin Layout Component
 * Layout for admin dashboard pages
 */

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 md:ml-0 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
