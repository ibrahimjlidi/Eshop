import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    banner: {
        isVisible: {
            type: Boolean,
            default: true
        },
        messages: {
            type: [String],
            default: [
                '⭐ Promotion jusqu\'à -60% sur plusieurs produits',
                '⭐ Livraison à domicile Gratuite sur toute la Tunisie',
                '⭐ Possibilité d\'ouvrir le colis avant paiement'
            ]
        },
        backgroundColor: {
            type: String,
            default: 'bg-red-600'
        },
        textColor: {
            type: String,
            default: 'text-white'
        }
    },
    shopInfo: {
        name: { type: String, default: 'MERN E-Commerce' },
        contactEmail: { type: String, default: 'admin@example.com' },
        currency: { type: String, default: 'TND' },
        description: { type: String, default: 'Le meilleur endroit pour faire vos achats en ligne.' }
    }
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
