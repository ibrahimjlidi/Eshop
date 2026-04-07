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
        // Deep merge nested objects (banner, shopInfo) instead of shallow Object.assign
        if (req.body.banner) {
            settings.banner = { ...settings.banner.toObject?.() ?? settings.banner, ...req.body.banner };
        }
        if (req.body.shopInfo) {
            settings.shopInfo = { ...settings.shopInfo.toObject?.() ?? settings.shopInfo, ...req.body.shopInfo };
        }
        settings.markModified('banner');
        settings.markModified('shopInfo');
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
