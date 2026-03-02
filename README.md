# Eshop Project

A complete, production-ready MERN (MongoDB, Express, React, Node.js) stack e-commerce application with modern architecture and best practices.

## 🎯 Features

### Authentication & Authorization
- ✅ User registration and login with JWT
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (User/Admin)
- ✅ Protected routes
- ✅ User profile management

### Products
- ✅ Full CRUD operations (Admin)
- ✅ Product filtering and search
- ✅ Pagination
- ✅ Product categories
- ✅ Product reviews and ratings
- ✅ Product images
- ✅ Stock management
- ✅ Discount pricing

### Shopping Cart
- ✅ Add/remove items
- ✅ Quantity management
- ✅ LocalStorage persistence
- ✅ Real-time totals calculation

### Orders & Checkout
- ✅ Order creation with validation
- ✅ Shipping address management
- ✅ Multiple shipping methods
- ✅ Tax calculation
- ✅ Order history
- ✅ Order status tracking

### Payment Integration
- ✅ Stripe payment processing
- ✅ Secure checkout sessions
- ✅ Payment verification
- ✅ Order status updates

### Admin Dashboard
- ✅ Dashboard statistics
- ✅ User management
- ✅ Product management
- ✅ Order management
- ✅ Revenue analytics
- ✅ Order status charts

### UI/UX
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Tailwind CSS styling
- ✅ Modern component architecture
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Admin sidebar navigation

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Payment**: Stripe API
- **File Upload**: Multer (local) or Cloudinary (cloud)
- **Environment**: dotenv

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Date Handling**: date-fns

## 📁 Project Structure

```
Eshop/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Category.js
│   │   └── Cart.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── cartController.js
│   │   └── adminController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── cartRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── hash.js
│   │   └── stripe.js
│   ├── scripts/
│   │   └── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── AdminSidebar.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   └── AdminDashboardPage.jsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── features/ (Redux Slices)
│   │   │   ├── store.js
│   │   │   ├── authSlice.js
│   │   │   ├── productSlice.js
│   │   │   ├── cartSlice.js
│   │   │   ├── orderSlice.js
│   │   │   └── adminSlice.js
│   │   ├── services/ (API Calls)
│   │   │   ├── apiClient.js
│   │   │   ├── authAPI.js
│   │   │   ├── productAPI.js
│   │   │   ├── cartAPI.js
│   │   │   ├── orderAPI.js
│   │   │   └── adminAPI.js
│   │   ├── utils/
│   │   │   └── (utility functions)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Stripe account (for payment integration)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure .env variables**
   ```
   MONGODB_URI=mongodb://localhost:27017/mern-ecommerce
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

5. **Seed database (optional)**
   ```bash
   npm run seed
   ```

6. **Start backend server**
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env.local file**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure .env.local**
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

5. **Start frontend development server**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
GET    /api/auth/me              - Get current user (Protected)
POST   /api/auth/logout          - Logout user (Protected)
PUT    /api/auth/profile         - Update profile (Protected)
PUT    /api/auth/password        - Update password (Protected)
PUT    /api/auth/address         - Update address (Protected)
```

### Product Endpoints
```
GET    /api/products             - Get all products (with filters)
GET    /api/products/featured    - Get featured products
GET    /api/products/:id         - Get single product
POST   /api/products             - Create product (Admin)
PUT    /api/products/:id         - Update product (Admin)
DELETE /api/products/:id         - Delete product (Admin)
POST   /api/products/:id/reviews - Add review (Protected)
GET    /api/products/:id/reviews - Get product reviews
```

### Cart Endpoints
```
GET    /api/cart                 - Get user cart (Protected)
POST   /api/cart/add             - Add item to cart (Protected)
PUT    /api/cart/update          - Update item quantity (Protected)
DELETE /api/cart/:productId      - Remove item from cart (Protected)
DELETE /api/cart                 - Clear cart (Protected)
```

### Order Endpoints
```
POST   /api/orders               - Create order (Protected)
GET    /api/orders/my-orders     - Get user orders (Protected)
GET    /api/orders/:id           - Get order details (Protected)
POST   /api/orders/checkout-session     - Create Stripe session (Protected)
POST   /api/orders/verify-payment       - Verify payment (Protected)
GET    /api/orders               - Get all orders (Admin)
PUT    /api/orders/:id/status    - Update order status (Admin)
```

### Admin Endpoints
```
GET    /api/admin/dashboard/stats - Get dashboard stats (Admin)
GET    /api/admin/users           - Get all users (Admin)
PUT    /api/admin/users/:userId/role - Update user role (Admin)
DELETE /api/admin/users/:userId   - Delete user (Admin)
```

## 🔐 Sample Login Credentials

After running the seed script, use these credentials:

**Admin User:**
- Email: `admin@example.com`
- Password: `Admin@123`

**Regular Users:**
- Email: `john@example.com`
- Password: `User@1234`

- Email: `jane@example.com`
- Password: `User@1234`

## 🎨 Component Structure

### Key Components
- **Navbar**: Navigation with cart badge and user menu
- **ProductCard**: Reusable product display component
- **ProtectedRoute**: Route wrapper for authentication
- **AdminSidebar**: Admin navigation sidebar
- **LoadingSpinner**: Loading indicator
- **Footer**: Application footer

### Key Pages
- **HomePage**: Landing page with featured products
- **ProductsPage**: Product listing with filters
- **LoginPage**: User login form
- **RegisterPage**: User registration form
- **CartPage**: Shopping cart display
- **AdminDashboardPage**: Admin statistics and analytics

## 📊 Redux State Management

### Store Structure
```
{
  auth: {
    user: {...},
    token: "...",
    isAuthenticated: boolean,
    isLoading: boolean,
    error: null
  },
  products: {
    products: [...],
    selectedProduct: {...},
    filters: {...},
    currentPage: 1,
    totalPages: 1,
    isLoading: boolean,
    error: null
  },
  cart: {
    items: [...],
    totalItems: 0,
    totalPrice: 0,
    isLoading: boolean,
    error: null
  },
  orders: {
    orders: [...],
    selectedOrder: {...},
    currentPage: 1,
    isLoading: boolean,
    error: null
  },
  admin: {
    stats: {...},
    users: [...],
    isLoading: boolean,
    error: null
  }
}
```

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS configuration
- ✅ Protected API routes
- ✅ Role-based authorization
- ✅ Error handling middleware
- ✅ Input validation
- ✅ Secure payment processing with Stripe

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Push code to GitHub
2. Connect repo to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy dist folder
3. Configure environment variables

## 📝 Available Scripts

### Backend
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
npm run seed   # Seed database with sample data
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify connection string format

### Port Already in Use
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Issues
- Ensure FRONTEND_URL is correct in backend .env
- Check that frontend is on the specified port

### Stripe Integration Issues
- Verify API keys in .env
- Ensure Stripe account is in test mode
- Check webhook configuration

## 📞 Support

For issues and questions, please create an issue on GitHub.

## 🎉 Future Enhancements

- Wishlist feature
- Product recommendations
- User reviews and ratings
- Email notifications
- SMS notifications
- Advanced analytics
- Inventory management
- Multi-currency support
- Refund/return management
- Live chat support

---

**Happy Coding!** 🚀
