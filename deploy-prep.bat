@echo off
REM MERN E-Commerce Deployment Preparation (Windows)
REM This script helps you prepare for cloud deployment

echo.
echo 🚀 MERN E-Commerce Deployment Preparation
echo ==========================================
echo.

REM Check Node.js
echo ✓ Checking Node.js installation...
node -v >nul 2>&1 || (
    echo ✗ Node.js not found. Please install Node.js from nodejs.org
    exit /b 1
)
npm -v >nul 2>&1 || (
    echo ✗ npm not found
    exit /b 1
)

REM Check Git
echo ✓ Checking Git installation...
git -v >nul 2>&1 || (
    echo ✗ Git not found. Please install Git from git-scm.com
    exit /b 1
)

REM Check if in correct directory
if not exist "package.json" (
    echo ✗ package.json not found. Run this script from the project root
    exit /b 1
)

echo.
echo 📦 Installing dependencies...
echo.

REM Install backend dependencies
echo ✓ Installing backend dependencies...
cd backend
call npm install
cd ..

REM Install frontend dependencies
echo ✓ Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo ✅ Deployment Preparation Complete!
echo.
echo 📋 Next Steps:
echo    1. Read DEPLOYMENT_GUIDE.md for detailed instructions
echo    2. Create MongoDB Atlas free cluster
echo    3. Get your MongoDB connection string
echo    4. Create Render account and deploy backend
echo    5. Create Vercel account and deploy frontend
echo    6. Configure environment variables on both platforms
echo.
echo 🎯 Production URLs:
echo    - Backend: https://mern-ecommerce-backend.onrender.com
echo    - Frontend: https://your-project.vercel.app
echo.
echo 📚 Documentation:
echo    - DEPLOYMENT_GUIDE.md (Complete step-by-step guide)
echo    - .env.example (Backend environment variables)
echo    - frontend\.env.example (Frontend environment variables)
echo    - render.yaml (Render configuration)
echo.
pause
