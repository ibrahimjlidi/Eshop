import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Brand from '../models/Brand.js';
import connectDB from '../config/database.js';

dotenv.config();

const MARQUES = [
  {
    name: 'TechWave',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    displayOrder: 1,
  },
  {
    name: 'Luminex',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    displayOrder: 2,
  },
  {
    name: 'AeroStyle',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    displayOrder: 3,
  },
  {
    name: 'EcoLife',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg' },
    displayOrder: 4,
  },
  {
    name: 'Quantum',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    displayOrder: 5,
  },
  {
    name: 'NovaTech',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    displayOrder: 6,
  },
  {
    name: 'Zenith',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    displayOrder: 7,
  },
  {
    name: 'Vanguard',
    logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    displayOrder: 8,
  }
];

const seedBrands = async () => {
  try {
    await connectDB();
    console.log('MongoDB Connected...');

    // Clear existing brands
    // await Brand.deleteMany(); // Optional: Uncomment if you want to wipe old test brands
    // console.log('Old brands cleared');

    // Filter out ones that might already exist
    const existing = await Brand.find({}, 'name');
    const existingNames = existing.map(b => b.name);
    
    const newBrands = MARQUES.filter(m => !existingNames.includes(m.name));

    if (newBrands.length === 0) {
      console.log('All these brands are already in the database.');
    } else {
      await Brand.insertMany(newBrands);
      console.log(`${newBrands.length} brands successfully inserted!`);
    }

    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedBrands();
