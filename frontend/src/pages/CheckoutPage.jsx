import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowRight, Lock, CreditCard, ChevronLeft } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { toast } from 'react-toastify';
import { orderAPI } from '../services/orderAPI';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, totalItems, totalPrice } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.auth);

    const [isProcessing, setIsProcessing] = useState(false);

    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const [shippingMethod, setShippingMethod] = useState('standard');

    useEffect(() => {
        if (!isAuthenticated) {
            toast.info('Veuillez vous connecter pour passer à la caisse');
            navigate('/login');
        } else if (items.length === 0) {
            navigate('/cart');
        }
    }, [isAuthenticated, items.length, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        // Form validation
        if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode || !shippingAddress.country) {
            return toast.error("Veuillez remplir tous les détails de livraison.");
        }

        setIsProcessing(true);

        try {
            // Create order first
            const orderPayload = {
                items: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                })),
                shippingAddress,
                shippingMethod
            };

            const orderRes = await orderAPI.createOrder(orderPayload);

            if (orderRes.success) {
                // Initiate Stripe session
                const checkoutRes = await orderAPI.createCheckoutSession(orderRes.order._id);

                if (checkoutRes.success && checkoutRes.sessionUrl) {
                    // Redirect to Stripe checkout page
                    window.location.href = checkoutRes.sessionUrl;
                } else {
                    toast.error("Échec de l'initialisation de la session de paiement. Veuillez réessayer.");
                    setIsProcessing(false);
                }
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Erreur lors de la création de la commande';
            toast.error(msg);
            setIsProcessing(false);
        }
    };

    // Pricing calculations
    const shippingCost = shippingMethod === 'standard' ? (totalPrice > 100 ? 0 : 10) : (shippingMethod === 'express' ? 25 : 50);
    const tax = Math.round(totalPrice * 0.1 * 100) / 100;
    const finalTotal = totalPrice + shippingCost + tax;

    if (items.length === 0) return null; // Or a loading spinner while redirecting

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <button
                    onClick={() => navigate('/cart')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6 transition"
                >
                    <ChevronLeft size={20} />
                    <span>Retour au panier</span>
                </button>

                <h1 className="text-3xl font-bold mb-8">Caisse</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in-up">
                    {/* Form Content */}
                    <div className="space-y-8">
                        <div className="glass-card rounded-3xl p-10 shadow-premium">
                            <h2 className="text-2xl font-black mb-8 flex items-center space-x-4 text-dark tracking-tight">
                                <span className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-2xl shadow-premium text-sm font-black">1</span>
                                <span>Informations de Livraison</span>
                            </h2>

                            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Rue</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={shippingAddress.street}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={shippingAddress.city}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">État / Gouvernorat</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={shippingAddress.state}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={shippingAddress.postalCode}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={shippingAddress.country}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="glass-card rounded-3xl p-10 shadow-premium animate-fade-in-up animate-stagger-1">
                            <h2 className="text-2xl font-black mb-8 flex items-center space-x-4 text-dark tracking-tight">
                                <span className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-2xl shadow-premium text-sm font-black">2</span>
                                <span>Mode de Livraison</span>
                            </h2>

                            <div className="space-y-4">
                                <label className={`block border rounded-lg p-4 cursor-pointer transition ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="shippingMethod"
                                                value="standard"
                                                checked={shippingMethod === 'standard'}
                                                onChange={(e) => setShippingMethod(e.target.value)}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            />
                                            <div className="ml-3">
                                                <span className="block text-sm font-medium text-gray-900">Livraison Standard</span>
                                                <span className="block text-sm text-gray-500">3-5 jours ouvrables</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {totalPrice > 100 ? 'Gratuit' : '10.00 DT'}
                                        </span>
                                    </div>
                                </label>

                                <label className={`block border rounded-lg p-4 cursor-pointer transition ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="shippingMethod"
                                                value="express"
                                                checked={shippingMethod === 'express'}
                                                onChange={(e) => setShippingMethod(e.target.value)}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            />
                                            <div className="ml-3">
                                                <span className="block text-sm font-medium text-gray-900">Livraison Express</span>
                                                <span className="block text-sm text-gray-500">2 jours ouvrables</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900">25.00 DT</span>
                                    </div>
                                </label>

                                <label className={`block border rounded-lg p-4 cursor-pointer transition ${shippingMethod === 'overnight' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="shippingMethod"
                                                value="overnight"
                                                checked={shippingMethod === 'overnight'}
                                                onChange={(e) => setShippingMethod(e.target.value)}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            />
                                            <div className="ml-3">
                                                <span className="block text-sm font-medium text-gray-900">Nuitée</span>
                                                <span className="block text-sm text-gray-500">1 jour ouvrable</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900">50.00 DT</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="animate-fade-in-up animate-stagger-2">
                        <div className="glass-card rounded-3xl p-10 sticky top-24 shadow-premium border-primary/5">
                            <h2 className="text-2xl font-black mb-8 text-dark tracking-tight border-b border-gray-100 pb-4">Résumé</h2>

                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.productId} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center space-x-3 flex-1">
                                            <img
                                                src={item.image || 'https://via.placeholder.com/40'}
                                                alt={item.productName}
                                                className="w-12 h-12 object-cover rounded shadow-sm"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800 line-clamp-1">{item.productName}</p>
                                                <p className="text-gray-500">Qté: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-semibold text-gray-800">{(item.price * item.quantity).toFixed(2)} DT</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Sous-total</span>
                                    <span>{totalPrice.toFixed(2)} DT</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Livraison ({shippingMethod})</span>
                                    <span>{shippingCost === 0 ? 'Gratuit' : `${shippingCost.toFixed(2)} DT`}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>TVA estimée</span>
                                    <span>{tax.toFixed(2)} DT</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-900 pt-4 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-3xl font-bold text-gray-900">{finalTotal.toFixed(2)} DT</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isProcessing}
                                className={`w-full py-5 rounded-2xl flex items-center justify-center space-x-4 text-white uppercase tracking-widest text-sm font-black transition-all duration-300 ${isProcessing ? 'bg-gray-400' : 'btn-premium'
                                    }`}
                            >
                                {isProcessing ? (
                                    <span className="animate-pulse">Traitement en cours...</span>
                                ) : (
                                    <>
                                        <CreditCard size={22} />
                                        <span>Payer avec Stripe</span>
                                    </>
                                )}
                            </button>

                            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                                <Lock size={16} />
                                <span>Traitement sécurisé du paiement</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CheckoutPage;
