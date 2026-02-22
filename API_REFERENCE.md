# API Endpoints Reference

## Authentication API

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": { ... }
}
```

---

## Products API

### Get All Products (with filters)
```
GET /api/products?page=1&limit=12&search=&category=&minPrice=0&maxPrice=1000&sortBy=newest

Response:
{
  "success": true,
  "products": [...],
  "totalProducts": 100,
  "totalPages": 9,
  "currentPage": 1
}
```

### Get Single Product
```
GET /api/products/:id

Response:
{
  "success": true,
  "product": {
    "_id": "...",
    "name": "Product Name",
    "price": 99.99,
    "stock": 10,
    "images": [...],
    "ratings": 4.5,
    "reviews": [...]
  }
}
```

### Create Product (Admin Only)
```
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "category": "Electronics",
  "price": 99.99,
  "discountPrice": 79.99,
  "stock": 50,
  "images": [
    {
      "url": "image_url"
    }
  ],
  "attributes": {
    "brand": "BrandName",
    "color": ["Black", "White"]
  }
}

Response:
{
  "success": true,
  "message": "Product created successfully",
  "product": { ... }
}
```

### Add Product Review
```
POST /api/products/:id/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent product!"
}

Response:
{
  "success": true,
  "message": "Review added successfully",
  "product": { ... }
}
```

---

## Cart API

### Get Cart
```
GET /api/cart
Authorization: Bearer <token>

Response:
{
  "success": true,
  "cart": {
    "_id": "...",
    "userId": "...",
    "items": [
      {
        "productId": "...",
        "productName": "Product",
        "price": 99.99,
        "quantity": 2,
        "image": "image_url"
      }
    ],
    "totalItems": 2,
    "totalPrice": 199.98
  }
}
```

### Add to Cart
```
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "...",
  "quantity": 1
}

Response:
{
  "success": true,
  "message": "Item added to cart",
  "cart": { ... }
}
```

### Update Cart Item
```
PUT /api/cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "...",
  "quantity": 3
}

Response:
{
  "success": true,
  "message": "Cart updated",
  "cart": { ... }
}
```

### Remove from Cart
```
DELETE /api/cart/:productId
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Item removed from cart",
  "cart": { ... }
}
```

---

## Orders API

### Create Order
```
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "...",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phoneNumber": "1234567890",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "shippingMethod": "standard"
}

Response:
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "_id": "...",
    "items": [...],
    "totalPrice": 199.98,
    "orderStatus": "pending",
    "paymentStatus": "pending"
  }
}
```

### Get User Orders
```
GET /api/orders/my-orders?page=1&limit=10
Authorization: Bearer <token>

Response:
{
  "success": true,
  "orders": [...],
  "totalOrders": 5,
  "totalPages": 1,
  "currentPage": 1
}
```

### Get Order Details
```
GET /api/orders/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "order": { ... }
}
```

### Create Stripe Checkout Session
```
POST /api/orders/checkout-session
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "..."
}

Response:
{
  "success": true,
  "sessionId": "cs_test_...",
  "sessionUrl": "https://checkout.stripe.com/..."
}
```

### Verify Payment
```
POST /api/orders/verify-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "sessionId": "cs_test_..."
}

Response:
{
  "success": true,
  "message": "Payment verified successfully",
  "paymentStatus": "paid"
}
```

---

## Admin API

### Get Dashboard Stats
```
GET /api/admin/dashboard/stats
Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "stats": {
    "totalUsers": 100,
    "totalProducts": 50,
    "totalOrders": 200,
    "totalRevenue": 50000,
    "ordersByStatus": [...],
    "revenueByMonth": [...],
    "recentOrders": [...]
  }
}
```

### Get All Users
```
GET /api/admin/users?page=1&limit=10&search=
Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "users": [...],
  "totalUsers": 100,
  "totalPages": 10,
  "currentPage": 1
}
```

### Update User Role
```
PUT /api/admin/users/:userId/role
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "admin"
}

Response:
{
  "success": true,
  "message": "User role updated successfully",
  "user": { ... }
}
```

### Delete User
```
DELETE /api/admin/users/:userId
Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Error Responses

### Invalid Request
```
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Unauthorized
```
{
  "success": false,
  "message": "No token provided. Please login."
}
```

### Forbidden (Admin Only)
```
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

### Not Found
```
{
  "success": false,
  "message": "Product not found"
}
```

---

## Authentication Header Format

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Token is obtained from login/register response and should be stored in localStorage.

---

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (Missing or invalid token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding in production:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```
