import React from 'react';
import { Settings, Save, Store, Mail, CreditCard } from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import { toast } from 'react-toastify';

const AdminSettingsPage = () => {

    const handleSave = (e) => {
        e.preventDefault();
        toast.success("Settings saved successfully!");
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                    <Settings className="text-primary" />
                    <span>Store Settings</span>
                </h1>
                <p className="text-gray-500 mt-2">Manage your e-commerce platform settings and configuration.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">

                    {/* General Settings */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center space-x-2 border-b pb-4">
                            <Store className="text-gray-400" />
                            <span>General</span>
                        </h2>
                        <form id="settings-form" onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                                <input type="text" defaultValue="MERN E-Commerce" className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                <input type="email" defaultValue="admin@example.com" className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                <select className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary">
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
                                <textarea rows="3" defaultValue="The best place to shop online." className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"></textarea>
                            </div>
                        </form>
                    </div>

                    {/* Payment Settings */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center space-x-2 border-b pb-4">
                            <CreditCard className="text-gray-400" />
                            <span>Payment Integration</span>
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Public Key</label>
                                <input type="text" placeholder="pk_test_..." className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                    </div>

                    {/* Email Settings */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center space-x-2 border-b pb-4">
                            <Mail className="text-gray-400" />
                            <span>Email Notifications</span>
                        </h2>
                        <div className="space-y-4">
                            <label className="flex items-center space-x-3">
                                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary focus:ring-primary" />
                                <span className="text-gray-700">Order Confirmation Emails</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary focus:ring-primary" />
                                <span className="text-gray-700">Shipping Status Updates</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input type="checkbox" className="w-4 h-4 text-primary focus:ring-primary" />
                                <span className="text-gray-700">New User Registration Alerts</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" className="px-6 py-2 border rounded-lg font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" form="settings-form" className="px-6 py-2 bg-primary text-white rounded-lg font-semibold flex items-center space-x-2 hover:bg-primary/90">
                            <Save size={18} />
                            <span>Save Settings</span>
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                        <h3 className="font-bold text-blue-800 mb-2">Need Help?</h3>
                        <p className="text-sm text-blue-600 mb-4">Check out our documentation for detailed guides on how to configure your store settings, setup payment gateways, and configure email servers.</p>
                        <a href="#" className="text-sm font-semibold text-primary hover:underline">View Documentation &rarr;</a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettingsPage;
