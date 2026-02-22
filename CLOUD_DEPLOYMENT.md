# MERN E-Commerce Cloud Deployment

🚀 **Your complete guide to deploy this MERN e-commerce application to production with FREE tier services.**

## 🌐 Cloud Deployment Stack

This project is configured for FREE cloud deployment using:

- **🗄️ MongoDB Atlas** - FREE Sandbox cluster (512MB storage)
- **🔧 Render** - FREE tier for Node.js backend (750 dyno hours/month)
- **📱 Vercel** - FREE tier for React frontend (100GB bandwidth/month)
- **💾 GitHub** - FREE public repository with CI/CD

## 📖 Quick Links

### Deployment Guides
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete step-by-step deployment instructions
- **[BACKEND_DEPLOYMENT.md](./docs/BACKEND_DEPLOYMENT.md)** - Render backend deployment details
- **[FRONTEND_DEPLOYMENT.md](./docs/FRONTEND_DEPLOYMENT.md)** - Vercel frontend deployment details

### Configuration Files
- `backend/.env.example` - Backend environment variables template
- `frontend/.env.example` - Frontend development environment template
- `frontend/.env.production.example` - Frontend production environment template
- `render.yaml` - Render deployment configuration
- `frontend/vercel.json` - Vercel deployment configuration
- `.gitignore` - Git ignore rules

## 🚀 Quick Start (5 Minutes)

### 1️⃣ Prepare Your Project
```bash
# Windows
deploy-prep.bat

# Mac/Linux
bash deploy-prep.sh
```

### 2️⃣ Set Up MongoDB (2 minutes)
1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create FREE cluster (M0 Sandbox)
3. Get connection string with your credentials

### 3️⃣ Deploy Backend to Render (3 minutes)
1. Go to [render.com](https://render.com)
2. Create Web Service from your GitHub repo
3. Add environment variables (MONGODB_URI, JWT_SECRET, etc.)
4. Deploy!

### 4️⃣ Deploy Frontend to Vercel (2 minutes)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Set VITE_API_URL environment variable
4. Deploy!

## 📋 Pre-Deployment Checklist

### Security
- [ ] Change JWT_SECRET to a strong, unique value
- [ ] Change ADMIN_PASSWORD to a secure password
- [ ] Use environment variables for all secrets (never commit secrets)
- [ ] Enable HTTPS on both backend and frontend

### Backend (Node.js + Express)
- [ ] `npm install` completed
- [ ] `npm run dev` works locally
- [ ] MongoDB connection works
- [ ] CORS configured for frontend domain
- [ ] Helmet security middleware installed
- [ ] Compression middleware enabled
- [ ] Error handling middleware in place

### Frontend (React + Vite)
- [ ] `npm install` completed
- [ ] `npm run dev` works locally
- [ ] `npm run build` succeeds without errors
- [ ] VITE_API_URL points to backend
- [ ] All images load correctly
- [ ] No console errors

### Database
- [ ] MongoDB Atlas account created
- [ ] Free cluster provisioned
- [ ] IP whitelist configured (0.0.0.0/0 for testing)
- [ ] Database user created with strong password
- [ ] Connection string copied

### GitHub
- [ ] Repository initialized with `git init`
- [ ] All files committed with `git add .`
- [ ] Pushed to GitHub with `git push`
- [ ] `.gitignore` includes `.env` files
- [ ] README files present

## 🔑 Environment Variables Reference

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-ecommerce
PORT=5001
NODE_ENV=production
JWT_SECRET=your_super_secret_32_character_key
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.vercel.app
STRIPE_SECRET_KEY=sk_test_xxx (optional)
CLOUDINARY_NAME=your_name (optional)
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx (optional)
```

## 🎯 Expected Production URLs

After deployment, you'll have:

```
Frontend:  https://your-project.vercel.app
Backend:   https://mern-ecommerce-backend.onrender.com
API:       https://mern-ecommerce-backend.onrender.com/api
Database:  MongoDB Atlas cloud
```

## 📊 Cost Breakdown

| Service | Cost | Limits |
|---------|------|--------|
| MongoDB Atlas | **FREE** | 512 MB, shared |
| Render | **FREE** | 750 dyno hours/month |
| Vercel | **FREE** | 100 GB bandwidth/month |
| GitHub | **FREE** | Unlimited public repos |
| **TOTAL** | **$0/month** | Perfect for MVP! |

## 🛠️ Production Optimizations Included

✅ **Helmet** - Security headers  
✅ **Compression** - GZIP compression  
✅ **CORS** - Cross-origin requests  
✅ **Error Handling** - Global error middleware  
✅ **Environment Variables** - Secure config  
✅ **Vite** - Fast build and dev server  
✅ **Tailwind CSS** - Optimized styling  
✅ **Redux** - State management  

## 🔗 Useful Deployment Links

- [MongoDB Atlas Tutorial](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/)
- [Render Node.js Guide](https://render.com/docs/native-nodejs)
- [Vercel Deployment Guide](https://vercel.com/docs/git)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

## 🐛 Troubleshooting

### Issues?
1. Check **DEPLOYMENT_GUIDE.md** troubleshooting section
2. Verify all environment variables are set
3. Check platform dashboards (Render, Vercel, MongoDB Atlas) for errors
4. Review application logs on deployment platform
5. Test API endpoints locally before deploying

### Getting Help
- Render: [render.com/docs](https://render.com/docs)
- Vercel: [vercel.com/support](https://vercel.com/support)
- MongoDB: [mongodb.com/docs](https://docs.mongodb.com)

## 📚 Project Documentation

- **[README.md](./README.md)** - Project overview
- **[SETUP.md](./SETUP.md)** - Local development setup
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Project structure
- **[API_REFERENCE.md](./API_REFERENCE.md)** - API documentation

## 🎉 Congratulations!

You now have a complete MERN application ready for production deployment!

Next steps:
1. Follow **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**
2. Deploy your backend to Render
3. Deploy your frontend to Vercel
4. Monitor your live application
5. Scale when needed with paid tiers

---

**Happy Coding! 🚀**

For detailed deployment instructions, see **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**
