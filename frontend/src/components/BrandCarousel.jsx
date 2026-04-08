import React, { useEffect, useState } from 'react';
import { brandAPI } from '../services/brandAPI';

const BrandCarousel = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await brandAPI.getPublicBrands();
                if (data.brands) {
                    setBrands(data.brands);
                }
            } catch (error) {
                console.error('Failed to fetch brands', error);
            }
        };
        fetchBrands();
    }, []);

    if (brands.length === 0) return null;

    return (
        <section className="bg-gray-50 border-y border-gray-100 py-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-center text-sm font-bold text-gray-400 lowercase tracking-[0.2em] mb-8">Nos Partenaires d'Excellence</p>
                <div className="flex justify-center flex-wrap items-center gap-12 md:gap-20">
                    {brands.map(brand => (
                        <div key={brand._id} className="opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 ease-in-out cursor-pointer transform hover:scale-110">
                            {brand.logo?.url ? (
                                <img
                                    src={brand.logo.url}
                                    alt={brand.name}
                                    className="h-8 md:h-12 object-contain"
                                />
                            ) : (
                                <span className="text-xl md:text-3xl font-black text-gray-400 tracking-tighter uppercase whitespace-nowrap">{brand.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandCarousel;
