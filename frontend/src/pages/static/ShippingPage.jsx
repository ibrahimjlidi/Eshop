import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const ShippingPage = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Shipping Information</h1>
                <div className="prose prose-lg max-w-none text-gray-600 space-y-6 leading-relaxed">
                    <p>
                        At Eshop, we strive to deliver your purchase with excellent service and flexibility, every time. To that end, we offer three modes of shipping depending on how urgently you need your items.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Standard Shipping ($10.00)</h2>
                    <p>
                        Most orders ship within 1-2 business days. Delivery occurs in 3 to 5 business days from the date of shipment. This is our default and most cost-effective option. <b>Enjoy free standard shipping on all orders over $100!</b>
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Express Shipping ($25.00)</h2>
                    <p>
                        Need it faster? Choose Express Shipping at checkout. Your order will receive priority processing and will arrive in 2 business days.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Overnight Shipping ($50.00)</h2>
                    <p>
                        Get it tomorrow. Orders placed before 2:00 PM EST Monday through Friday will be shipped same day and delivered the next business day.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">International Shipping</h2>
                    <p>
                        At this time, we only ship orders within the United States. We apologize for any inconvenience this may cause our international customers.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

export default ShippingPage;
