import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Package, Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductModal from '../components/ProductModal';
import { productAPI } from '../services/productAPI';
import { toast } from 'react-toastify';

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchProducts = async (page = 1) => {
        setIsLoading(true);
        try {
            const data = await productAPI.getAllProducts({ page, limit: 10 });
            setProducts(data.products || []);
            setTotalPages(data.totalPages || 1);
            setCurrentPage(data.currentPage || 1);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Échec de la récupération des produits');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            try {
                await productAPI.deleteProduct(id);
                toast.success("Produit supprimé avec succès");
                fetchProducts(currentPage);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Échec de la suppression du produit');
            }
        }
    };

    const handleOpenModal = (product = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingProduct(null);
        setIsModalOpen(false);
    };

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            if (editingProduct) {
                await productAPI.updateProduct(editingProduct._id, formData);
                toast.success("Produit mis à jour avec succès");
            } else {
                await productAPI.createProduct(formData);
                toast.success("Produit créé avec succès");
            }
            handleCloseModal();
            fetchProducts(currentPage);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Échec de l\'enregistrement du produit');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading && products.length === 0) {
        return <AdminLayout><LoadingSpinner /></AdminLayout>;
    }

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                    <Package className="text-primary" />
                    <span>Gestion des Produits</span>
                </h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-primary/90 transition"
                >
                    <Plus size={20} />
                    <span>Ajouter un Produit</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm CustomOverflow">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-600">Produit</th>
                                <th className="p-4 font-semibold text-gray-600">Catégorie</th>
                                <th className="p-4 font-semibold text-gray-600">Prix</th>
                                <th className="p-4 font-semibold text-gray-600">Stock</th>
                                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? products.map((product) => (
                                <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4 flex items-center space-x-3">
                                        <img
                                            src={product.images?.[0]?.url || 'https://via.placeholder.com/40'}
                                            alt={product.name}
                                            className="w-10 h-10 rounded object-cover"
                                        />
                                        <span className="font-medium text-gray-800 line-clamp-1">{product.name}</span>
                                    </td>
                                    <td className="p-4 text-gray-600 px-4">{product.category}</td>
                                    <td className="p-4 font-semibold text-gray-800">{(product.discountPrice || product.price).toFixed(2)} DT</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.stock > 0 ? `${product.stock} En Stock` : 'Rupture de Stock'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleOpenModal(product)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">Aucun produit trouvé.</td>
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
                            Précédent
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
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                product={editingProduct}
                isLoading={isSubmitting}
            />
        </AdminLayout>
    );
};

export default AdminProductsPage;
