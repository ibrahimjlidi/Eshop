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

    const renderBrands = (keyPrefix) => (
        brands.map((brand) => (
            <div key={`${keyPrefix}-${brand._id}`} className="flex-shrink-0 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-110 mx-8 md:mx-16">
                {brand.logo?.url ? (
                    <img
                        src={brand.logo.url}
                        alt={brand.name}
                        className="h-10 md:h-14 w-auto object-contain"
                    />
                ) : (
                    <span className="text-xl md:text-3xl font-black text-gray-400 tracking-tighter uppercase whitespace-nowrap">{brand.name}</span>
                )}
            </div>
        ))
    );

    return (
        <section className="bg-gray-50 border-y border-gray-100 py-16 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <p className="text-center text-sm md:text-base font-semibold text-gray-500 tracking-wide">
                    Nous accompagnons des millions d'entreprises dans le monde
                </p>
            </div>
            
            {/* The infinite scrolling container */}
            <div className="relative flex overflow-hidden group">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
                
                {/* Track 1 */}
                <div className="flex flex-nowrap animate-scroll group-hover:[animation-play-state:paused] items-center min-w-full justify-around">
                    {renderBrands('t1')}
                    {/* Ensure enough width if brands are few */}
                    {brands.length < 6 && renderBrands('t1-extra')}
                </div>
                
                {/* Track 2 (Duplicate for seamless loop) */}
                <div className="flex flex-nowrap animate-scroll group-hover:[animation-play-state:paused] items-center min-w-full justify-around" aria-hidden="true">
                    {renderBrands('t2')}
                    {brands.length < 6 && renderBrands('t2-extra')}
                </div>
            </div>
        </section>
    );
};

export default BrandCarousel;
