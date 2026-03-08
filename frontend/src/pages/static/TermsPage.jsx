import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const TermsPage = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
                <div className="prose prose-lg max-w-none text-gray-600 space-y-6 leading-relaxed">
                    <p className="text-sm text-gray-500 mb-8">Last Updated: March 8, 2026</p>

                    <p>
                        Welcome to Eshop. Please read these Terms of Service completely before using our website.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using this site, you accept and agree to be bound by the terms and provision of this agreement. Check these terms occasionally, as we reserve the right to modify these terms at any time.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. User Accounts</h2>
                    <p>
                        When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>
                    <p>
                        You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features and functionality are and will remain the exclusive property of Eshop and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Purchases</h2>
                    <p>
                        If you wish to purchase any product or service made available through the Service, you may be asked to supply certain information relevant to your Purchase including your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

export default TermsPage;
