import apiClient from './apiClient';

export const settingsAPI = {
    // Get site settings
    getSettings: async () => {
        const response = await apiClient.get('/settings');
        return response.data;
    },

    // Update site settings
    updateSettings: async (settingsData) => {
        const response = await apiClient.put('/settings', settingsData);
        return response.data;
    },
};
