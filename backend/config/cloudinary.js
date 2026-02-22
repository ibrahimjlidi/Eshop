/**
 * Cloudinary Configuration
 * Setup for image upload service (optional)
 * Comment out if using local file storage
 */

import { v2 as cloudinary } from 'cloudinary';

const configureCloudinary = () => {
  if (process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    console.log('✓ Cloudinary configured');
  } else {
    console.warn('⚠ Cloudinary not configured. Image uploads will use local storage.');
  }
};

export { cloudinary, configureCloudinary };
