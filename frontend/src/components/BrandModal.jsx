import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

const BrandModal = ({ isOpen, onClose, onSubmit, brand, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    displayOrder: 0,
    isActive: true,
  });
  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name || '',
        displayOrder: brand.displayOrder || 0,
        isActive: brand.isActive !== undefined ? brand.isActive : true,
      });
      setPreviewUrl(brand.logo?.url || '');
    } else {
      setFormData({ name: '', displayOrder: 0, isActive: true });
      setPreviewUrl('');
    }
    setLogoFile(null);
  }, [brand, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData };
    if (logoFile) {
      data.logo = logoFile;
    }
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">
            {brand ? 'Modifier la Marque' : 'Ajouter une Marque'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la marque</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordre d'affichage</label>
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            />
          </div>

          <div className="flex items-center space-x-2 py-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              id="isActiveBrand"
              className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
            />
            <label htmlFor="isActiveBrand" className="text-sm font-medium text-gray-700 cursor-pointer">Marque active (visible sur le site)</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
            <div className="flex items-center space-x-4">
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl} alt="Preview" className="w-20 h-20 object-contain border rounded-lg bg-gray-50" />
                  <button type="button" onClick={() => { setLogoFile(null); setPreviewUrl(''); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow">
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 bg-gray-50">
                  <Upload size={24} />
                </div>
              )}
              <label className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border hover:bg-gray-200 transition font-medium text-sm">
                Choisir une image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 font-medium tracking-wide transition shadow-sm"
            >
              {isLoading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandModal;
