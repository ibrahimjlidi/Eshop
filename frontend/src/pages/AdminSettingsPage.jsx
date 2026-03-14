import React, { useEffect, useState } from 'react';
import { Settings, Save, Store, Mail, CreditCard, Megaphone } from 'lucide-react';
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

    if (isLoading && !settings) return <AdminLayout><div>Chargement...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                    <Settings className="text-primary" />
                    <span>Paramètres de la Boutique</span>
                </h1>
                <p className="text-gray-500 mt-2">Gérez les paramètres et la configuration de votre plateforme e-commerce.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">

                    {/* Promotional Banner Settings */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center space-x-2 border-b pb-4">
                            <Megaphone className="text-primary" />
                            <span>Bandeau Promotionnel</span>
                        </h2>
                        <div className="space-y-4">
                            <label className="flex items-center space-x-3 mb-4">
                                <input
                                    type="checkbox"
                                    checked={formData.bannerVisibility}
                                    onChange={(e) => setFormData({ ...formData, bannerVisibility: e.target.checked })}
                                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <span className="text-gray-700 font-medium text-lg">Afficher le bandeau sur la page d'accueil</span>
                            </label>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Messages (Un par ligne)</label>
                                <textarea
                                    rows="4"
                                    value={formData.bannerMessages}
                                    onChange={(e) => setFormData({ ...formData, bannerMessages: e.target.value })}
                                    placeholder="⭐ Message 1&#10;⭐ Message 2"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-1">Utilisez des emojis comme ⭐ pour un meilleur rendu.</p>
                            </div>
                        </div>
                    </div>

                    {/* General Settings */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center space-x-2 border-b pb-4">
                            <Store className="text-gray-400" />
                            <span>Général</span>
                        </h2>
                        <form id="settings-form" onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la Boutique</label>
                                <input
                                    type="text"
                                    value={formData.shopName}
                                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contact</label>
                                <input
                                    type="email"
                                    value={formData.contactEmail}
                                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
                                <select
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
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
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                                ></textarea>
                            </div>
                        </form>
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
                        <button type="button" className="px-6 py-2 border rounded-lg font-semibold text-gray-700 hover:bg-gray-50">Annuler</button>
                        <button type="submit" form="settings-form" className="px-6 py-2 bg-primary text-white rounded-lg font-semibold flex items-center space-x-2 hover:bg-primary/90">
                            <Save size={18} />
                            <span>Enregistrer les paramètres</span>
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                        <h3 className="font-bold text-blue-800 mb-2">Besoin d'aide ?</h3>
                        <p className="text-sm text-blue-600 mb-4">Consultez notre documentation pour des guides détaillés sur la configuration de votre boutique, l'installation des passerelles de paiement et la configuration des serveurs email.</p>
                        <a href="#" className="text-sm font-semibold text-primary hover:underline">Voir la Documentation &rarr;</a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettingsPage;
