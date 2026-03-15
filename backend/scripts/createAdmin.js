/**
 * Admin Creation Script
 * Creates or updates a user with admin privileges
 * Usage: node scripts/createAdmin.js <email> <password> <firstName> <lastName>
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
    const args = process.argv.slice(2);
    const [email, password, firstName, lastName] = args;

    if (!email || !password) {
        console.error('Usage: node scripts/createAdmin.js <email> <password> [firstName] [lastName]');
        process.exit(1);
    }

    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Connected to MongoDB');

        let user = await User.findOne({ email });

        if (user) {
            console.log(`! User with email ${email} already exists. Updating to admin role...`);
            user.role = 'admin';
            user.password = password; // Triggers pre-save hook in User model
            user.isActive = true;
            user.isEmailVerified = true;
            await user.save();
            console.log('✓ User updated to Admin successfully');
        } else {
            console.log(`! Creating new admin user: ${email}`);
            await User.create({
                firstName: firstName || 'Admin',
                lastName: lastName || 'User',
                email,
                password, // Triggers pre-save hook in User model
                role: 'admin',
                isActive: true,
                isEmailVerified: true,
            });
            console.log('✓ Admin user created successfully');
        }

        await mongoose.connection.close();
    } catch (error) {
        console.error('✗ Error:', error.message);
        process.exit(1);
    }
};

createAdmin();
