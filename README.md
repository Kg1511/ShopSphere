# 🛒 ShopSphere — MERN E-Commerce Platform

A full-stack e-commerce platform built with **MongoDB, Express.js, React, and Node.js** featuring JWT-based authentication, product catalog management, dynamic cart logic, and a premium dark-themed UI.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=flat-square&logo=vercel)](https://shop-sphere-three-pi.vercel.app)
[![API](https://img.shields.io/badge/API-Render-46E3B7?style=flat-square&logo=render)](https://shopsphere-api-ld2e.onrender.com/api/health)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)

> 🌐 **Live at:** https://shop-sphere-three-pi.vercel.app

---

## ✨ Features

### Authentication & Security
- 🔐 **JWT-based Authentication** — Secure token-based login/register
- 🔑 **bcrypt Password Hashing** — Salted password encryption (10 rounds)
- 🛡️ **Protected Routes** — Role-based access control (User/Admin)
- 🔒 **Secure API** — Bearer token authorization middleware

### Product Management
- 📦 **Product Catalog** — Browse, search, and filter products
- 🔍 **Search & Filter** — By category, price range, and keywords
- ⭐ **Ratings & Reviews** — Star ratings with review counts
- 📊 **Sort Options** — Price (asc/desc), rating, newest

### Shopping Experience
- 🛒 **Dynamic Cart** — Add, remove, update quantities with real-time totals
- 💰 **Order Summary** — Subtotal, tax, shipping (free over $100)
- 📋 **Checkout Flow** — Shipping address form → order placement
- 📦 **Order History** — Track past orders with status badges

### Admin Dashboard
- 📊 **Statistics** — Product count, total stock, average price
- ➕ **CRUD Operations** — Create, edit, delete products
- 📋 **Product Table** — Overview of all products with quick actions

### UI/UX
- 🌙 **Premium Dark Theme** — Glassmorphism, gradient accents
- ✨ **Micro-Animations** — Smooth hover effects, transitions
- 📱 **Responsive Design** — Mobile-first, works on all devices
- 🔔 **Toast Notifications** — Real-time feedback on actions

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, React Router v7, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Auth** | JSON Web Tokens (JWT), bcryptjs |
| **Styling** | Custom CSS (Glassmorphism, CSS Variables) |
| **Fonts** | Google Fonts (Inter, Outfit) |

---

## 📁 Project Structure

```
ShopSphere/
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/       # Navbar, Footer, ProductCard, ProtectedRoute
│   │   ├── context/          # AuthContext, CartContext, ToastContext
│   │   ├── pages/            # All page components
│   │   ├── api.js            # Axios instance with JWT interceptor
│   │   ├── App.jsx           # Router setup
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Design system
│   ├── index.html
│   └── package.json
│
├── server/                   # Express Backend
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/          # Auth, Product, Cart, Order controllers
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verify + Admin check
│   ├── models/               # User, Product, Cart, Order schemas
│   ├── routes/               # API route definitions
│   ├── utils/
│   │   └── generateToken.js  # JWT token generator
│   ├── seed.js               # Database seeder
│   ├── server.js             # Express app entry
│   └── package.json
│
├── .gitignore
├── package.json              # Root scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ ([download](https://nodejs.org))
- **MongoDB** running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Clone the Repository

```bash
git clone https://github.com/Kg1511/ShopSphere.git
cd ShopSphere
```

### 2. Install Dependencies

```bash
# Install all dependencies (server + client)
cd server && npm install
cd ../client && npm install
```

### 3. Configure Environment

Create `server/.env` from the example:

```bash
cp server/.env.example server/.env
```

Then fill in your values:

```env
# Local development
MONGO_URI=mongodb://localhost:27017/shopsphere
JWT_SECRET=your_secret_key_here
PORT=5000

# Optional: set when deploying (see Deployment section)
# CLIENT_URL=https://your-vercel-app.vercel.app
```

### 4. Seed the Database

```bash
cd server
npm run seed
```

This creates:
- **Admin user:** `admin@shopsphere.com` / `admin123`
- **Test user:** `john@example.com` / `password123`
- **12 sample products** across all categories

### 5. Run the Application

```bash
# Terminal 1 — Start the backend
cd server
npm run dev

# Terminal 2 — Start the frontend
cd client
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Protected |

### Products
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | List all products | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

**Query Parameters:** `?search=`, `?category=`, `?sort=price_asc|price_desc|rating|newest`, `?minPrice=`, `?maxPrice=`

### Cart
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/cart` | Get user's cart | Protected |
| POST | `/api/cart` | Add/update item | Protected |
| DELETE | `/api/cart/:itemId` | Remove item | Protected |
| DELETE | `/api/cart` | Clear cart | Protected |

### Orders
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Place order | Protected |
| GET | `/api/orders` | Get my orders | Protected |
| GET | `/api/orders/:id` | Get order details | Protected |

---

## 🔀 Git Branching Strategy

This project was built using a **feature-branch workflow**:

```
main
├── feature/backend-setup     →  Merged ✓
│   ├── Express + MongoDB setup
│   ├── User model + JWT auth + bcrypt
│   ├── Product & Order models + CRUD APIs
│   └── Cart & Order APIs + seed script
│
├── feature/frontend-setup    →  Merged ✓
│   ├── React + Vite scaffold
│   ├── Design system + Navbar + Footer
│   ├── Auth pages + AuthContext
│   ├── Product pages + CartContext
│   ├── Cart, Checkout, Orders pages
│   └── Admin Dashboard
│
└── feature/integration       →  Merged ✓
    ├── Root package.json + README
    └── Final polish
```

---

## 🚢 Deployment

ShopSphere is deployed across three free-tier services:

| Service | Purpose | URL |
|---------|---------|-----|
| **Vercel** | React frontend | [shop-sphere-three-pi.vercel.app](https://shop-sphere-three-pi.vercel.app) |
| **Render** | Express API | [shopsphere-api-ld2e.onrender.com](https://shopsphere-api-ld2e.onrender.com) |
| **MongoDB Atlas** | Database (M0 Free) | Atlas cluster (cloud-hosted) |

### Deploy Your Own

#### Backend — Render
1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect your GitHub repo, set **Root Directory** to `server`
3. **Build command:** `npm install` · **Start command:** `node server.js`
4. Add environment variables:
   ```
   MONGO_URI=<your-atlas-uri>
   JWT_SECRET=<your-secret>
   CLIENT_URL=<your-vercel-url>
   NODE_ENV=production
   PORT=5000
   ```

#### Frontend — Vercel
1. Import repo on [vercel.com](https://vercel.com), set **Root Directory** to `client`
2. Framework preset: **Vite** · Output: `dist`
3. Add environment variable:
   ```
   VITE_API_URL=<your-render-url>/api
   ```
4. Deploy — SPA routing is handled by `client/vercel.json`

#### Database — MongoDB Atlas
1. Create a free **M0 cluster** at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Add `0.0.0.0/0` to Network Access (allows Render IPs)
3. Grab the connection string and set it as `MONGO_URI` on Render
4. Run the seed script locally (pointed at Atlas) to populate products:
   ```bash
   cd server && node seed.js
   ```

> ⚠️ **Note:** Render's free tier spins down after 15 min of inactivity. The first request after idle may take ~30s to wake up.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ using the MERN Stack**
