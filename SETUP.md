# MERN E-Commerce Project Setup Guide

## Quick Start Guide

### System Requirements
- Node.js v14+
- MongoDB (local or Atlas)
- Stripe account
- Git

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd MERN-Ecommerce
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file and configure
cp .env.example .env

# Update .env with your credentials:
# - MongoDB connection string
# - JWT secret
# - Stripe keys
# - Frontend URL

# Seed database with sample data (optional)
npm run seed

# Start backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Update .env.local with:
# - API URL (http://localhost:5000/api)
# - Stripe publishable key

# Start frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Configuration

### Backend .env
```env
# Database
MONGODB_URI=mongodb://localhost:27017/mern-ecommerce

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY

# Frontend
FRONTEND_URL=http://localhost:5173

# Optional: Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend .env.local
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
```

## Testing the Application

### 1. Create Account
- Go to `http://localhost:5173/register`
- Fill in the registration form
- Click "Create Account"

### 2. Login
- Navigate to `http://localhost:5173/login`
- Use credentials from registration

### 3. Browse Products
- Click on "Products" in navbar
- Use filters to search products
- Click on a product to see details

### 4. Add to Cart
- Click "Add to Cart" button
- View cart by clicking cart icon in navbar

### 5. Checkout
- Go to cart page
- Review items and totals
- Click "Proceed to Checkout"

### 6. Admin Dashboard (if admin user)
- Login with admin account (admin@example.com / Admin@123 - if seeded)
- Click "Admin" in navbar
- View dashboard statistics
- Manage products, orders, and users

## Database Seeding

The seed script creates:
- 1 Admin user
- 2 Regular users
- 6 Sample products
- 5 Product categories

Run:
```bash
cd backend
npm run seed
```

**Admin Credentials:**
- Email: `admin@example.com`
- Password: `Admin@123`

## Troubleshooting

### Port 5000 in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify database exists

### Stripe Keys Not Working
- Go to Stripe Dashboard
- Get your test API keys
- Add them to .env

### Frontend can't connect to backend
- Check if backend is running on port 5000
- Verify FRONTEND_URL in backend .env
- Check browser console for CORS errors

## Development Workflow

### Backend Development
- Edit files in `backend/` directory
- Server auto-restarts with nodemon
- Check console for errors

### Frontend Development
- Edit files in `frontend/src/` directory
- Page auto-refreshes with Vite
- Check browser console for errors

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Project Features Checklist

- [x] User Authentication (Register/Login)
- [x] Product Management
- [x] Shopping Cart
- [x] Checkout Flow
- [x] Order Management
- [x] Admin Dashboard
- [x] Payment Integration (Stripe)
- [x] Responsive Design
- [x] Error Handling
- [x] Toast Notifications

## Next Steps

1. **Customize Branding**
   - Update colors in `tailwind.config.js`
   - Change logo in Navbar component
   - Update site title in `index.html`

2. **Add More Features**
   - Wishlist functionality
   - Product reviews
   - User profiles
   - Email notifications

3. **Optimize for Production**
   - Set up environment variables
   - Enable image optimization
   - Configure CDN
   - Set up monitoring

4. **Deploy**
   - Backend: Heroku, Railway, or Render
   - Frontend: Vercel or Netlify
   - Database: MongoDB Atlas

## Support Resources

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

## FAQ

**Q: How do I add more products?**
A: Use the admin dashboard or API endpoint `/api/products` (POST)

**Q: How do I change product categories?**
A: Edit the categories array in ProductsPage.jsx or Product model

**Q: How do I enable image uploads?**
A: Configure Cloudinary credentials in .env

**Q: How do I reset the database?**
A: Delete MongoDB database and run seed script again

**Q: How do I add more admin users?**
A: Use admin dashboard or directly update user role in database

---

**Ready to build?** 🚀 Follow the steps above and you'll have a full e-commerce platform running!
