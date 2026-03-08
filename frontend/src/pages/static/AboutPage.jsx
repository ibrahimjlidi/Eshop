import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const AboutPage = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">About Us</h1>
                <div className="prose prose-lg max-w-none text-gray-600 space-y-6 leading-relaxed">
                    <p>
                        Welcome to Eshop, your number one source for all things tech, fashion, and lifestyle. We're dedicated to giving you the very best of products, with a focus on dependability, customer service and uniqueness.
                    </p>
                    <p>
                        Founded in 2026, Eshop has come a long way from its beginnings. When we first started out, our passion for helping others drove us to do intense research, and gave us the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over the world, and are thrilled to be a part of the quirky, eco-friendly, fair trade wing of the e-commerce industry.
                    </p>
                    <p>
                        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                    </p>
                    <p className="mt-8 font-semibold text-gray-800">
                        Sincerely,<br />
                        The Eshop Team
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

export default AboutPage;
