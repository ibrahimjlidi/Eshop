import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const FaqPage = () => {
    const faqs = [
        {
            q: "What payment methods do you accept?",
            a: "We accept all major credit cards including Visa, Mastercard, American Express via Stripe. We ensure all transactions are completely secure."
        },
        {
            q: "How long does shipping take?",
            a: "Standard shipping takes 3-5 business days. Express takes 2 business days, and overnight shipping delivers by the next business day."
        },
        {
            q: "Do you offer international shipping?",
            a: "Currently, we only ship within the United States. We plan to expand to international markets in the near future."
        },
        {
            q: "What is your return policy?",
            a: "If you are not 100% satisfied with your purchase, you can return the product and get a full refund up to 30 days from the date you purchased it."
        },
        {
            q: "How can I track my order?",
            a: "Once your order is shipped, you will receive an email containing a tracking number and a link where you can track the progress of your shipment."
        }
    ];

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-2 text-center text-gray-900">Frequently Asked Questions</h1>
                <p className="text-gray-500 text-center mb-12">Can't find the answer you're looking for? Reach out to our customer support.</p>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.q}</h3>
                            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default FaqPage;
