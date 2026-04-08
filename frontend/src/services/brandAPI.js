import apiClient from './apiClient';

export const brandAPI = {
  getBrands: async () => {
    const response = await apiClient.get('/brands');
    return response.data;
  },

  getPublicBrands: async () => {
    const response = await apiClient.get('/brands?public=true');
    return response.data;
  },
  
  createBrand: async (brandData) => {
    const formData = new FormData();
    Object.keys(brandData).forEach(key => {
      if (brandData[key] !== undefined && brandData[key] !== null) {
        formData.append(key, brandData[key]);
      }
    });
    const response = await apiClient.post('/brands', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateBrand: async (id, brandData) => {
    const formData = new FormData();
    Object.keys(brandData).forEach(key => {
      if (brandData[key] !== undefined && brandData[key] !== null) {
        formData.append(key, brandData[key]);
      }
    });
    const response = await apiClient.put(`/brands/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteBrand: async (id) => {
    const response = await apiClient.delete(`/brands/${id}`);
    return response.data;
  }
};
