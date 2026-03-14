import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { settingsAPI } from '../services/settingsAPI';

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async (_, { rejectWithValue }) => {
        try {
            const data = await settingsAPI.getSettings();
            return data.settings;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch settings');
        }
    }
);

export const updateSiteSettings = createAsyncThunk(
    'settings/updateSettings',
    async (settingsData, { rejectWithValue }) => {
        try {
            const data = await settingsAPI.updateSettings(settingsData);
            return data.settings;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update settings');
        }
    }
);

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        settings: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings = action.payload;
                state.error = null;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateSiteSettings.fulfilled, (state, action) => {
                state.settings = action.payload;
            });
    },
});

export default settingsSlice.reducer;
