import React, { useEffect, useState } from 'react';
import { Users, Trash2, Edit, Shield } from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import { adminAPI } from '../services/adminAPI';
import { toast } from 'react-toastify';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async (page = 1) => {
        setIsLoading(true);
        try {
            const data = await adminAPI.getAllUsers({ page, limit: 10 });
            setUsers(data.users || []);
            setTotalPages(data.totalPages || 1);
            setCurrentPage(data.currentPage || 1);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Échec de la récupération des utilisateurs');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                await adminAPI.deleteUser(id);
                toast.success("Utilisateur supprimé avec succès");
                fetchUsers(currentPage);
            } catch (error) {
                toast.error(error.response?.data?.message || "Échec de la suppression de l'utilisateur");
            }
        }
    };

    const handleRoleToggle = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        try {
            await adminAPI.updateUserRole(userId, newRole);
            toast.success(`Rôle de l'utilisateur mis à jour en ${newRole}`);
            fetchUsers(currentPage);
        } catch (error) {
            toast.error(error.response?.data?.message || "Échec de la mise à jour du rôle de l'utilisateur");
        }
    };

    if (isLoading && users.length === 0) {
        return <AdminLayout><LoadingSpinner /></AdminLayout>;
    }

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                    <Users className="text-primary" />
                    <span>Gestion des Utilisateurs</span>
                </h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-600">Utilisateur</th>
                                <th className="p-4 font-semibold text-gray-600">Email</th>
                                <th className="p-4 font-semibold text-gray-600">Rôle</th>
                                <th className="p-4 font-semibold text-gray-600">Inscrit le</th>
                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((u) => (
                                <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4 flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex justify-center items-center font-bold text-lg">
                                            {u.firstName?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-800 block">{u.firstName} {u.lastName}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600">{u.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleRoleToggle(u._id, u.role)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition"
                                                title="Basculer les droits d'administrateur"
                                            >
                                                <Shield size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(u._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                                title="Supprimer l'utilisateur"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">Aucun utilisateur trouvé.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Précèdent
                        </button>
                        <span className="px-3 py-1">Page {currentPage} sur {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Suivant
                        </button>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminUsersPage;
