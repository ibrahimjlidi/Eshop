import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const PrivacyPage = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
                <div className="prose prose-lg max-w-none text-gray-600 space-y-6 leading-relaxed">
                    <p className="text-sm text-gray-500 mb-8">Last Updated: March 8, 2026</p>

                    <p>
                        This Privacy Policy describes how Eshop ("we", "us", or "our") collects, uses, and shares your personal information when you visit or make a purchase from our website.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
                    <p>
                        When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                    </p>
                    <p>
                        Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
                    <p>
                        We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Sharing Your Personal Information</h2>
                    <p>
                        We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Stripe to power our secure payment processing. We may also share your Personal Information to comply with applicable laws and regulations.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Data Retention</h2>
                    <p>
                        When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

export default PrivacyPage;
