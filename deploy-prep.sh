#!/bin/bash

# MERN E-Commerce Deployment Checklist & Quick Start
# This script helps you prepare for cloud deployment

echo "🚀 MERN E-Commerce Deployment Preparation"
echo "=========================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js installation..."
node -v || { echo "✗ Node.js not found. Please install Node.js"; exit 1; }
npm -v || { echo "✗ npm not found"; exit 1; }

# Check Git
echo "✓ Checking Git installation..."
git -v || { echo "✗ Git not found. Please install Git"; exit 1; }

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "✗ package.json not found. Please run this script from the project root"
    exit 1
fi

echo ""
echo "📦 Checking dependencies..."

# Install backend dependencies
echo "✓ Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "✓ Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Deployment Preparation Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Read DEPLOYMENT_GUIDE.md for detailed instructions"
echo "2. Create MongoDB Atlas free cluster"
echo "3. Get your MongoDB connection string"
echo "4. Create Render account and deploy backend"
echo "5. Create Vercel account and deploy frontend"
echo "6. Configure environment variables on both platforms"
echo ""
echo "🎯 Production URLs:"
echo "   - Backend: https://mern-ecommerce-backend.onrender.com"
echo "   - Frontend: https://your-project.vercel.app"
echo ""
echo "📚 Documentation:"
echo "   - DEPLOYMENT_GUIDE.md (Complete step-by-step guide)"
echo "   - .env.example (Backend environment variables)"
echo "   - frontend/.env.example (Frontend environment variables)"
echo "   - render.yaml (Render configuration)"
echo ""
