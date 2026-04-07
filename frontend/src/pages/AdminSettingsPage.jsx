import React, { useEffect, useState } from 'react';
import { Settings, Save, Store, CreditCard, Megaphone, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings, updateSiteSettings } from '../features/settingsSlice';

const AdminSettingsPage = () => {
    const dispatch = useDispatch();
    const { settings, isLoading } = useSelector(state => state.settings);

    const [formData, setFormData] = useState({
        bannerVisibility: true,
        bannerMessages: '',
        shopName: '',
        contactEmail: '',
        currency: 'TND',
        description: ''
    });

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    useEffect(() => {
        if (settings) {
            setFormData({
                bannerVisibility: settings.banner?.isVisible ?? true,
                bannerMessages: settings.banner?.messages?.join('\n') || '',
                shopName: settings.shopInfo?.name || '',
                contactEmail: settings.shopInfo?.contactEmail || '',
                currency: settings.shopInfo?.currency || 'TND',
                description: settings.shopInfo?.description || ''
            });
        }
    }, [settings]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateSiteSettings({
                banner: {
                    isVisible: formData.bannerVisibility,
                    messages: formData.bannerMessages.split('\n').filter(m => m.trim() !== '')
                },
                shopInfo: {
                    name: formData.shopName,
                    contactEmail: formData.contactEmail,
                    currency: formData.currency,
                    description: formData.description
                }
            })).unwrap();
            toast.success("Paramètres enregistrés avec succès !");
        } catch (error) {
            toast.error(error || "Échec de l'enregistrement");
        }
    };

    if (isLoading && !settings) return <AdminLayout><div className="p-8">Chargement...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                    <Settings className="text-primary" />
                    <span>Paramètres de la Boutique</span>
                </h1>
                <p className="text-gray-500 mt-2">Gérez les paramètres et la configuration de votre plateforme e-commerce.</p>
            </div>

            {/* Single form wrapping everything */}
            <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">

                        {/* Promotional Banner Settings */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center space-x-2 border-b pb-4">
                                <Megaphone className="text-primary" />
                                <span>Bandeau Promotionnel</span>
                            </h2>

                            {/* Toggle switch */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                                <div>
                                    <p className="font-semibold text-gray-800">Afficher le bandeau</p>
                                    <p className="text-sm text-gray-500">
                                        {formData.bannerVisibility
                                            ? 'Le bandeau est visible sur le site'
                                            : 'Le bandeau est masqué sur le site'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData(f => ({ ...f, bannerVisibility: !f.bannerVisibility }))}
                                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                                        formData.bannerVisibility ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                >
                                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
                                        formData.bannerVisibility ? 'translate-x-8' : 'translate-x-1'
                                    }`}>
                                        {formData.bannerVisibility
                                            ? <Eye size={11} className="text-primary" />
                                            : <EyeOff size={11} className="text-gray-400" />}
                                    </span>
                                </button>
                            </div>

                            {/* Status badge */}
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                                formData.bannerVisibility
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-600'
                            }`}>
                                <span className={`w-2 h-2 rounded-full ${formData.bannerVisibility ? 'bg-green-500' : 'bg-red-500'}`} />
                                {formData.bannerVisibility ? 'ACTIVÉ' : 'DÉSACTIVÉ'}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Messages (un par ligne)
                                </label>
                                <textarea
                                    rows="4"
                                    value={formData.bannerMessages}
                                    onChange={(e) => setFormData({ ...formData, bannerMessages: e.target.value })}
                                    placeholder="⭐ Message 1&#10;🚚 Message 2&#10;📦 Message 3"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                />
                                <p className="text-xs text-gray-500 mt-1">Utilisez des emojis comme ⭐ 🚚 📦 pour un meilleur rendu.</p>
                            </div>
                        </div>

                        {/* General Settings */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center space-x-2 border-b pb-4">
                                <Store className="text-gray-400" />
                                <span>Général</span>
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la Boutique</label>
                                    <input
                                        type="text"
                                        value={formData.shopName}
                                        onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contact</label>
                                    <input
                                        type="email"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
                                    <select
                                        value={formData.currency}
                                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    >
                                        <option value="TND">TND (DT)</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description de la Boutique</label>
                                    <textarea
                                        rows="3"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Settings */}
                        <div className="bg-white rounded-lg shadow-sm p-6 opacity-50">
                            <h2 className="text-xl font-bold mb-6 flex items-center space-x-2 border-b pb-4">
                                <CreditCard className="text-gray-400" />
                                <span>Intégration des Paiements</span>
                            </h2>
                            <div className="space-y-4">
                                <p className="text-sm text-gray-500 italic">Configurez vos clés API de paiement ici.</p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Clé Publique Stripe</label>
                                    <input type="text" placeholder="pk_test_..." disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => dispatch(fetchSettings())}
                                className="px-6 py-2 border rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 bg-primary text-white rounded-lg font-semibold flex items-center space-x-2 hover:bg-primary/90 disabled:opacity-60"
                            >
                                <Save size={18} />
                                <span>{isLoading ? 'Enregistrement...' : 'Enregistrer les paramètres'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        {/* Live preview */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                            <h3 className="font-bold text-gray-800 mb-3">Aperçu du bandeau</h3>
                            {formData.bannerVisibility && formData.bannerMessages.trim() ? (
                                <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs py-2 px-3 text-center font-medium">
                                    {formData.bannerMessages.split('\n').filter(m => m.trim())[0]}
                                </div>
                            ) : (
                                <div className="rounded-lg bg-gray-100 text-gray-400 text-xs py-2 px-3 text-center">
                                    Bandeau masqué
                                </div>
                            )}
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                            <h3 className="font-bold text-blue-800 mb-2">Besoin d'aide ?</h3>
                            <p className="text-sm text-blue-600 mb-4">Consultez notre documentation pour des guides détaillés sur la configuration de votre boutique.</p>
                            <a href="#" className="text-sm font-semibold text-primary hover:underline">Voir la Documentation &rarr;</a>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
};

export default AdminSettingsPage;
