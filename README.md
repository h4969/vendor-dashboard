# 🍽️ Vendor Dashboard

A full-stack **MERN** web app that lets restaurant vendors register, create their restaurant ("firm"), and manage their menu, including product images, veg / non-veg tagging and bestseller marking, from one responsive dashboard.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)

** Live demo:** [vendor-dashboard on Vercel](https://vendor-dashboard-566cbh0t2-hemas-projects-54f57396.vercel.app/)

<!-- Add screenshots here: create docs/screenshots/ and uncomment the lines below
![Landing page](docs/screenshots/landing.png)
![Dashboard](docs/screenshots/dashboard.png)
![Products table](docs/screenshots/products.png)
-->

---

 Features

**Authentication**
- Vendor registration and login with **JWT** (24-hour expiry) and **bcrypt** password hashing
- Protected routes on the frontend, and token-verified endpoints on the backend for adding a firm or product

**Firm management**
- Create a restaurant profile: name, area, veg / non-veg category, cuisine (South Indian, North Indian, Chinese, Bakery), optional offer text and a photo
- One firm per vendor, enforced by the API

**Menu management**
- Add products with name, price, description, image upload, veg / non-veg tag and a **bestseller** flag
- Live image preview before upload
- Products table with bestsellers listed first, image thumbnails and delete

**Dashboard**
- Personalised time-of-day greeting, a firm summary card and menu statistics

**UI**
- Responsive layout with a collapsible hamburger sidebar on mobile
- Landing page with feature and how-it-works sections

---

##  Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, React Router v6, Vite 7, plain CSS (responsive with media queries) |
| Backend | Node.js, Express 5, Mongoose 8 |
| Database | MongoDB |
| Auth & security | JSON Web Tokens, bcryptjs, CORS |
| File uploads | Multer (stored on disk in `backend/uploads`) |
| Tooling | ESLint, Nodemon, Concurrently |

---

##  Project Structure

```
vendor-dashboard/
├── backend/
│   ├── controllers/        # vendor, firm and product logic
│   ├── middlewares/
│   │   └── verifyToken.js  # JWT verification
│   ├── models/             # Vendor, Firm, Product (Mongoose schemas)
│   ├── routes/             # /vendor, /firm, /product
│   ├── uploads/            # uploaded images
│   └── index.js            # Express app entry point
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.jsx         # routes and layout
│       └── vendorDashboard/
│           ├── components/ # NavBar, SideBar, Footer, AllProducts, forms/
│           ├── data/       # API base URL config (apiPath.js)
│           └── pages/      # LandingPage, Welcome (dashboard)
└── package.json            # root scripts to run both apps together
```

### Data model

```
Vendor ──1:1── Firm ──1:N── Product
```

- **Vendor:** `username`, `email` (unique), `password` (hashed), `firm`
- **Firm:** `firmName` (unique), `area`, `category[]`, `region[]`, `offer`, `image`, `vendor`, `products[]`
- **Product:** `productName`, `price`, `category[]`, `bestSeller`, `description`, `image`, `firm`

---

##  Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v20.19 or later
- A MongoDB database, either local or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone and install

```bash
git clone https://github.com/h4969/vendor-dashboard.git
cd vendor-dashboard

npm install                    # root (installs concurrently)
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configure environment variables

Create **`backend/.env`**:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/vendor-dashboard
JWT_SECRET=replace-with-a-long-random-string
```

Create **`frontend/.env`**:

```env
VITE_API_URL=http://localhost:4000
```


### 3. Run the app

```bash
npm run dev          # starts backend and frontend together
```

Or run them separately:

```bash
npm run backend      # API on http://localhost:4000
npm run frontend     # app on http://localhost:5173
```

### 4. Build for production

```bash
cd frontend
npm run build        # outputs to frontend/dist
```

---

##  API Reference

Base URL: `http://localhost:4000`.  marks endpoints that need an `Authorization: Bearer <token>` header.

### Vendor

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/vendor/register` | Register a vendor (`username`, `email`, `password`) |
| POST | `/vendor/login` | Log in; returns `token`, `firmId` and vendor info |
| GET | `/vendor/all-vendors` | List all vendors with their firms |
| GET | `/vendor/single-vendor/:id` | Get one vendor with their firm |

### Firm

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST  | `/firm/add-firm` | Create a firm (`multipart/form-data`: `firmName`, `area`, `category`, `region`, `offer`, `image`) |
| DELETE | `/firm/:firmId` | Delete a firm |

### Product

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/product/add-product/:firmId` | Add a product (`multipart/form-data`: `productName`, `price`, `category`, `bestSeller`, `description`, `image`) |
| GET | `/product/:firmId/products` | List a firm's products |
| DELETE | `/product/:productId` | Delete a product |

Uploaded images are served statically from `/uploads/<filename>`.

### Example: log in

```bash
curl -X POST http://localhost:4000/vendor/login \
  -H "Content-Type: application/json" \
  -d '{"email": "vendor@example.com", "password": "your-password"}'
```

```json
{
  "success": "Login successful",
  "token": "<jwt>",
  "firmId": "<firm id or null>",
  "vendor": { "_id": "...", "email": "vendor@example.com", "firm": [] }
}
```





