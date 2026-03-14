import Settings from '../models/Settings.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Get Site Settings
export const getSettings = asyncHandler(async (req, res) => {
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
        settings = await Settings.create({});
    }

    res.status(200).json({
        success: true,
        settings
    });
});

// Update Site Settings
export const updateSettings = asyncHandler(async (req, res) => {
    let settings = await Settings.findOne();

    if (!settings) {
        settings = new Settings(req.body);
    } else {
        // Merge updates
        Object.assign(settings, req.body);
    }

    try {
        await settings.save();
    } catch (error) {
        console.error('Settings Update Error:', error);
        throw error;
    }

    res.status(200).json({
        success: true,
        message: 'Paramètres mis à jour avec succès',
        settings
    });
});
