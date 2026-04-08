import React, { useEffect, useState } from 'react';
import { Tag, Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import BrandModal from '../components/BrandModal';
import { brandAPI } from '../services/brandAPI';
import { toast } from 'react-toastify';

const AdminBrandsPage = () => {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchBrands = async () => {
        setIsLoading(true);
        try {
            const data = await brandAPI.getBrands();
            setBrands(data.brands || []);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Échec de la récupération des marques');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette marque ?")) {
            try {
                await brandAPI.deleteBrand(id);
                toast.success("Marque supprimée avec succès");
                fetchBrands();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Échec de la suppression de la marque');
            }
        }
    };

    const handleOpenModal = (brand = null) => {
        setEditingBrand(brand);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingBrand(null);
        setIsModalOpen(false);
    };

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            if (editingBrand) {
                await brandAPI.updateBrand(editingBrand._id, formData);
                toast.success("Marque mise à jour avec succès");
            } else {
                await brandAPI.createBrand(formData);
                toast.success("Marque créée avec succès");
            }
            handleCloseModal();
            fetchBrands();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Échec de l\'enregistrement de la marque');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading && brands.length === 0) {
        return <AdminLayout><LoadingSpinner /></AdminLayout>;
    }

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                    <Tag className="text-primary" />
                    <span>Gestion des Marques</span>
                </h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-primary/90 transition shadow-sm"
                >
                    <Plus size={20} />
                    <span>Ajouter une Marque</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-600">Logo</th>
                                <th className="p-4 font-semibold text-gray-600">Nom</th>
                                <th className="p-4 font-semibold text-gray-600">Statut</th>
                                <th className="p-4 font-semibold text-gray-600 text-center">Ordre</th>
                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.length > 0 ? brands.map((brand) => (
                                <tr key={brand._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        {brand.logo?.url ? (
                                            <img
                                                src={brand.logo.url}
                                                alt={brand.name}
                                                className="w-16 h-12 object-contain bg-white border border-gray-100 rounded p-1"
                                            />
                                        ) : (
                                            <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">Pas de logo</div>
                                        )}
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{brand.name}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${brand.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {brand.isActive ? 'Actif' : 'Inactif'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center text-gray-600 font-mono">
                                        {brand.displayOrder}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleOpenModal(brand)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                title="Modifier"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(brand._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                                title="Supprimer"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">Aucune marque trouvée. Commencez par en ajouter une.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <BrandModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                brand={editingBrand}
                isLoading={isSubmitting}
            />
        </AdminLayout>
    );
};

export default AdminBrandsPage;
