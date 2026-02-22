# 🚀 MERN E-Commerce Cloud Deployment Guide

Complete step-by-step guide to deploy your MERN E-Commerce application to the cloud with FREE tier services.

## 📋 Table of Contents
1. [MongoDB Atlas Setup](#1-mongodb-atlas-setup)
2. [Backend Deployment (Render)](#2-backend-deployment-render)
3. [Frontend Deployment (Vercel)](#3-frontend-deployment-vercel)
4. [GitHub Repository Setup](#4-github-repository-setup)
5. [Environment Configuration](#5-environment-configuration)
6. [Testing Deployment](#6-testing-deployment)

---

## 1. MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Sign Up** (or Sign In if you have an account)
3. Complete the registration

### Step 2: Create a Cluster
1. Click **Create** on the dashboard
2. Select **M0 Sandbox (FREE)** tier
3. Choose your preferred region (closest to your users)
4. Click **Create Cluster** (takes 2-5 minutes)

### Step 3: Set Up Authentication
1. Go to **Security** → **Quickstart**
2. Create a database user:
   - Username: `admin`
   - Password: Generate a strong password (save it!)
3. Click **Create User**

### Step 4: Allow Access
1. Go to **Security** → **Network Access**
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0) for development
4. Click **Confirm**

### Step 5: Get Connection String
1. Click **Databases** → Your cluster
2. Click **Connect** → **Drivers** → **Node.js**
3. Copy the connection string
4. Replace `<username>` and `<password>` with your credentials
5. Replace `myFirstDatabase` with `mern-ecommerce`

**Format:**
```
mongodb+srv://admin:YOUR_PASSWORD@yourcluster.mongodb.net/mern-ecommerce?retryWrites=true&w=majority
```

---

## 2. Backend Deployment (Render)

### Step 1: Prepare Backend
1. Ensure all files are committed to GitHub
2. Backend should be production-ready with:
   - ✓ Helmet for security headers
   - ✓ Compression middleware
   - ✓ CORS configured
   - ✓ Environment variables setup

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Click **Sign Up** (or use GitHub to sign up)
3. Complete verification

### Step 3: Deploy Backend Service
1. Click **New +** → **Web Service**
2. Select your GitHub repository
3. Fill in the details:
   - **Name:** `mern-ecommerce-backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run dev` (or `node server.js`)
   - **Plan:** Select **Free**

### Step 4: Configure Environment Variables
1. Click **Environment**
2. Add all variables from `.env.example`:
   ```
   MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/mern-ecommerce?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_key_here
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   STRIPE_SECRET_KEY=sk_test_xxx
   STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   ```
3. Click **Save**

### Step 5: Deploy
1. Click **Create Web Service**
2. Wait for deployment (usually 5-10 minutes)
3. Once deployed, copy your backend URL:
   ```
   https://mern-ecommerce-backend.onrender.com
   ```

**Your backend API base URL:** `https://mern-ecommerce-backend.onrender.com/api`

---

## 3. Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
1. Ensure `.env.production` is created with:
   ```
   VITE_API_URL=https://mern-ecommerce-backend.onrender.com/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
   ```

2. Verify build works locally:
   ```bash
   npm run build
   ```

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** (use GitHub account recommended)
3. Connect your GitHub account

### Step 3: Import Project
1. Click **Add New...** → **Project**
2. Select your GitHub repository
3. Vercel auto-detects it's a Vite project

### Step 4: Configure Build Settings
1. **Framework Preset:** `Vite`
2. **Build Command:** `npm run build`
3. **Output Directory:** `dist`
4. **Install Command:** `npm install`

### Step 5: Set Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Add:
   - Key: `VITE_API_URL`
   - Value: `https://mern-ecommerce-backend.onrender.com/api`
   - Environments: **Production, Preview, Development**
3. Click **Save**

### Step 6: Deploy
1. Click **Deploy**
2. Wait for build and deployment (2-5 minutes)
3. Once done, you'll get your frontend URL:
   ```
   https://your-project.vercel.app
   ```

---

## 4. GitHub Repository Setup

### Step 1: Initialize Git (if not already done)
```bash
cd c:\workspace\MERN-Ecommerce
git init
git add .
git commit -m "Initial commit: MERN e-commerce application"
```

### Step 2: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `mern-ecommerce`
3. **Description:** MERN E-Commerce Platform
4. Select **Public** or **Private**
5. Click **Create repository**

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/mern-ecommerce.git
git branch -M main
git push -u origin main
```

### Step 4: Setup GitHub Secrets (Optional for CI/CD)
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets for automated deployments

---

## 5. Environment Configuration

### Backend Environment Variables (.env)
```
MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster.mongodb.net/mern-ecommerce
PORT=5001
NODE_ENV=production
JWT_SECRET=your_super_secret_key_minimum_32_characters
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### Frontend Environment Variables (.env.production)
```
VITE_API_URL=https://mern-ecommerce-backend.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

---

## 6. Testing Deployment

### Test Backend
```bash
# Test if API is working
curl https://mern-ecommerce-backend.onrender.com/api/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Test Frontend
1. Visit: `https://your-project.vercel.app`
2. Check if products load
3. Test navigation and search
4. Open browser console for errors

### Test Database Connection
1. Log in with test account (if seeded)
2. Check if products display
3. Try adding to cart
4. Monitor MongoDB Atlas dashboard

---

## 🔧 Troubleshooting

### Backend won't deploy on Render
- ✓ Check all environment variables are set
- ✓ Verify MongoDB connection string
- ✓ Check `npm run dev` command works locally
- ✓ Review build logs in Render dashboard

### Frontend shows "Cannot reach backend"
- ✓ Verify `VITE_API_URL` is correct
- ✓ Check backend is running on Render
- ✓ Verify CORS is configured in backend
- ✓ Check browser console for detailed errors

### MongoDB connection timeout
- ✓ Verify IP address is whitelisted (0.0.0.0/0)
- ✓ Check connection string format
- ✓ Verify username and password
- ✓ Test connection locally first

### Images not loading
- ✓ Ensure Cloudinary credentials are set (or use placeholder images)
- ✓ Check image URLs in database
- ✓ Verify Cloudinary account is active

---

## 📊 Cost Summary (All FREE)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **MongoDB Atlas** | M0 Sandbox | 512 MB storage, shared cluster |
| **Render** | Web Service | 750 free dyno hours/month, auto-sleep after 15 min inactivity |
| **Vercel** | Standard | Unlimited deployments, 100 GB bandwidth/month |
| **GitHub** | Public Repo | Unlimited public repositories |

---

## 📝 Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend environment variables set in Render
- [ ] Backend deployed to Render
- [ ] Frontend environment variables configured
- [ ] Frontend deployed to Vercel
- [ ] GitHub repository created and pushed
- [ ] Backend API responding at `/api/health`
- [ ] Frontend loads without errors
- [ ] Products display from database
- [ ] CORS working properly
- [ ] Images loading correctly
- [ ] User login working
- [ ] Add to cart functionality working

---

## 🎉 Success!

Your MERN E-Commerce application is now live on the internet!

**Frontend URL:** `https://your-project.vercel.app`  
**Backend API:** `https://mern-ecommerce-backend.onrender.com/api`  
**Database:** `MongoDB Atlas Free Cluster`

### Next Steps
1. **Add custom domain** (optional) on Vercel
2. **Setup SSL certificate** (automatic on both platforms)
3. **Configure email notifications** for orders
4. **Setup payment processing** with Stripe
5. **Monitor performance** with built-in dashboards
6. **Scale when needed** by upgrading to paid tiers

---

## 📚 Useful Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Happy Deploying! 🚀**
