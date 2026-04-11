import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// To ensure we load .env from the backend root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import User from '../models/User.js';

const addAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    const email = 'admin@example.com';
    let user = await User.findOne({ email });
    
    if (user) {
      if (user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
        console.log('Existing user updated to Admin role.');
      } else {
        console.log('Admin account already exists.');
      }
    } else {
      await User.create({
        firstName: 'System',
        lastName: 'Admin',
        email: email,
        password: 'Admin@123', // Will be hashed by pre-save hook
        role: 'admin'
      });
      console.log('Admin account created successfully!');
    }

    console.log('\n--- CREDENTIALS ---');
    console.log('Email: admin@example.com');
    console.log('Password: Admin@123');
    console.log('-------------------\n');

    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

addAdmin();
