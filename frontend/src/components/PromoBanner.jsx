import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';

const FALLBACK_MESSAGES = [
  "⭐ Promotion jusqu'à -60% sur plusieurs produits",
  '🚚 Livraison à domicile Gratuite sur toute la Tunisie',
  '📦 Possibilité d\'ouvrir le colis avant paiement',
];

const PromoBanner = () => {
  const { settings } = useSelector(state => state.settings);
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  // If settings loaded and admin explicitly disabled → hide
  // If settings not loaded yet → show with fallback
  const isDisabled = settings !== null && settings?.banner?.isVisible === false;
  const messages = settings?.banner?.messages?.length
    ? settings.banner.messages
    : FALLBACK_MESSAGES;

  useEffect(() => {
    if (isDisabled || !visible || messages.length <= 1) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % messages.length);
        setFading(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [isDisabled, visible, messages.length]);

  if (isDisabled || !visible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center pr-8">
        <p
          className="text-center font-medium tracking-wide transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {messages[current]}
        </p>
      </div>

      {messages.length > 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1 flex gap-1">
          {messages.map((_, i) => (
            <span
              key={i}
              className={`block h-1 rounded-full transition-all duration-300 ${
                i === current ? 'bg-white w-3' : 'bg-white/40 w-1'
              }`}
            />
          ))}
        </div>
      )}

      <button
        onClick={() => setVisible(false)}
        aria-label="Fermer le bandeau"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default PromoBanner;
