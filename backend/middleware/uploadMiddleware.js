/**
 * Upload Middleware
 * Handles file uploads using Multer and integrates with Cloudinary
 */

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { AppError } from './errorHandler.js';

import fs from 'fs';
import path from 'path';

// Ensure upload directory exists
const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Memory storage for Cloudinary
const memoryStorage = multer.memoryStorage();

// Disk storage for local fallback
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// Use memory storage if Cloudinary is intended, otherwise disk storage
const isCloudinaryConfigured = !!(process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
const storage = isCloudinaryConfigured ? memoryStorage : diskStorage;

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new AppError('Invalid file type. Only images are allowed.', 400), false);
    }
};

// Initialize multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

/**
 * Upload Buffer to Cloudinary
 * @param {Buffer} buffer - File buffer
 * @param {string} folder - Destination folder
 * @returns {Promise<object>} - Cloudinary upload response
 */
export const uploadToCloudinary = (buffer, folder = 'mern-ecommerce/products') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

export default upload;
