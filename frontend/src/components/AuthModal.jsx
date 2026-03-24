import React, { useState, useEffect } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginError, registerSuccess, registerError } from "../features/authSlice";
import { authAPI } from "../services/authAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [mode, setMode] = useState("login");

    // LOGIN STATES
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // REGISTER STATES
    const [registerFirstName, setRegisterFirstName] = useState("");
    const [registerLastName, setRegisterLastName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

    // FORGOT PASSWORD
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            setMode("login");
            setShowForgot(false);
            setError("");

            setLoginEmail("");
            setLoginPassword("");
            setRememberMe(false);

            setRegisterFirstName("");
            setRegisterLastName("");
            setRegisterEmail("");
            setRegisterPassword("");
            setRegisterConfirmPassword("");
        }
    }, [open]);

    if (!open) return null;

    // LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await authAPI.login({
                email: loginEmail,
                password: loginPassword,
                rememberMe: rememberMe,
            });

            dispatch(loginSuccess(res));
            toast.success("Connexion réussie !");
            setOpen(false);
            navigate("/");
        } catch (err) {
            const message =
                err.response?.data?.message || "Email ou mot de passe incorrect";

            setError(message);
            dispatch(loginError(message));
        }
    };

    // REGISTER
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (registerPassword !== registerConfirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const res = await authAPI.register({
                firstName: registerFirstName,
                lastName: registerLastName,
                email: registerEmail,
                password: registerPassword,
                confirmPassword: registerConfirmPassword,
            });

            dispatch(registerSuccess(res));
            toast.success("Compte créé avec succès !");
            setOpen(false);
            navigate("/");
        } catch (err) {
            const message =
                err.response?.data?.message || "Échec de l'inscription";

            setError(message);
            dispatch(registerError(message));
        }
    };

    // FORGOT PASSWORD
    const handleForgot = async (e) => {
        e.preventDefault();

        try {

            await authAPI.forgotPassword(forgotEmail);

            toast.success("Email de réinitialisation envoyé");

            setShowForgot(false);

        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'envoi de l'email");

        }
    };

    // SWITCH MODE
    const switchMode = (newMode) => {
        setMode(newMode);
        setError("");
        setShowForgot(false);

        setLoginEmail("");
        setLoginPassword("");
        setRememberMe(false);

        setRegisterFirstName("");
        setRegisterLastName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterConfirmPassword("");
    };

    return (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-[1px] flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 relative">

                {/* Close Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    {showForgot
                        ? "Réinitialiser le mot de passe"
                        : mode === "login"
                            ? "Connexion"
                            : "Créer un compte"}
                </h2>

                {/* Error */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                        <AlertCircle className="text-red-600" size={20} />
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                {/* FORGOT PASSWORD */}
                {showForgot ? (
                    <form onSubmit={handleForgot} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Adresse email
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />

                                <input
                                    type="email"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-primary/90 transition shadow-premium hover:shadow-premium-hover active:scale-[0.98]"
                        >
                            Envoyer le lien
                        </button>

                        <p
                            className="text-sm text-center text-gray-600 mt-2 cursor-pointer hover:underline"
                            onClick={() => setShowForgot(false)}
                        >
                            Retour à la connexion
                        </p>

                    </form>
                ) : (
                    <>
                        {/* LOGIN */}
                        {mode === "login" && (
                            <form onSubmit={handleLogin} className="space-y-4">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Adresse email
                                    </label>

                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />

                                        <input
                                            type="email"
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all duration-300"
                                            placeholder="votre@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mot de passe
                                    </label>

                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />

                                        <input
                                            type="password"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all duration-300"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">

                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-gray-700">Se souvenir de moi</span>
                                    </label>

                                    <span
                                        className="text-sm text-gray-700 cursor-pointer hover:underline"
                                        onClick={() => setShowForgot(true)}
                                    >
                                        Mot de passe oublié ?
                                    </span>

                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-premium transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                                >
                                    Se connecter
                                </button>

                            </form>
                        )}

                        {/* REGISTER */}
                        {mode === "register" && (
                            <form onSubmit={handleRegister} className="space-y-4">

                                <div className="grid grid-cols-2 gap-4">

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prénom
                                        </label>

                                        <input
                                            type="text"
                                            value={registerFirstName}
                                            onChange={(e) => setRegisterFirstName(e.target.value)}
                                            className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Jean"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom
                                        </label>

                                        <input
                                            type="text"
                                            value={registerLastName}
                                            onChange={(e) => setRegisterLastName(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                                            placeholder="Dupont"
                                            required
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Adresse email
                                    </label>

                                    <input
                                        type="email"
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                        className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="votre@email.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mot de passe
                                    </label>

                                    <input
                                        type="password"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                        className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirmer le mot de passe
                                    </label>

                                    <input
                                        type="password"
                                        value={registerConfirmPassword}
                                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                                        className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-premium text-white py-4"
                                >
                                    Créer mon compte
                                </button>

                            </form>
                        )}
                    </>
                )}

                {/* SWITCH MODE */}
                <p className="text-center text-gray-600 mt-6">

                    {mode === "login" ? (
                        <>
                            Vous n'avez pas de compte ?
                            <button
                                onClick={() => switchMode("register")}
                                className="text-black font-semibold ml-2 hover:text-gray-700"
                            >
                                Inscrivez-vous
                            </button>
                        </>
                    ) : (
                        <>
                            Vous avez déjà un compte ?
                            <button
                                onClick={() => switchMode("login")}
                                className="text-black font-semibold ml-2 hover:text-gray-700"
                            >
                                Connectez-vous
                            </button>
                        </>
                    )}

                </p>

            </div>
        </div>
    );
};

export default AuthModal;