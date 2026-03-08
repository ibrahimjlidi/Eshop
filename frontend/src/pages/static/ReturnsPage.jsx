import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const ReturnsPage = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Returns & Exchanges</h1>
                <div className="prose prose-lg max-w-none text-gray-600 space-y-6 leading-relaxed">
                    <p>
                        We want you to be completely happy with your purchase. If for any reason you are not satisfied, we will gladly accept returns within 30 days of the delivery date.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Return Policy Details</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Items must be returned within 30 days of the delivery date.</li>
                        <li>Merchandise must be unworn, unwashed, and have original tags attached.</li>
                        <li>Footwear must include the original shoe box in its original condition.</li>
                        <li>Clearance items or items marked "Final Sale" cannot be returned or exchanged.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">How to Return</h2>
                    <p>
                        To initiate a return, simply log into your account, navigate to your Orders history, and select "Request Return" next to the applicable order. You will be provided with a printable return shipping label.
                    </p>
                    <p>
                        Please note that a $5.00 return shipping fee will be deducted from your total refund amount unless the item received was defective or incorrect.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Refund Processing</h2>
                    <p>
                        Once we receive your return, please allow 3-5 business days for your return to be processed. Your refund will be credited to the original payment method. Depending on your financial institution, it may take an additional 2-10 business days for the credit to post to your account.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

export default ReturnsPage;
