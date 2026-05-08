# 🚀 Advanced Todo App — Backend Journey

A modern Todo App backend built with:

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- JWT Authentication

This project is being built step-by-step like a real production backend application.

---

# 📅 Development Plan

# 🟡 Step 1 — Project Setup + Backend Foundation

## 🎯 Goal

Backend setup + database connection + basic project structure ready karna.

---

## 🧱 Tasks Completed

### 1️⃣ Backend Setup (Express + TypeScript)

- Node.js project initialized
- TypeScript configured
- Express installed
- Development server setup with hot reload

✅ Backend successfully running

---

### 2️⃣ Folder Structure Created

```bash
src/
│
├── routes/
├── controllers/
├── models/
├── middleware/
├── config/
├── app.ts
└── server.ts
```

---

### 3️⃣ MongoDB Atlas Connected

- MongoDB Atlas cluster created
- Connection string added
- Backend connected with MongoDB successfully

✅ Database connection verified

---

### 4️⃣ Basic Test Route Added

```http
GET /health
```

Example response:

```json
{
  "message": "Server is running"
}
```

---

## 🧠 Concepts Learned

- Express server setup
- TypeScript backend structure
- MongoDB Atlas connection
- Environment variables
- Basic API routing
- Scalable backend architecture

---

# 🟡 Step 2 — Authentication System (JWT)

## 🎯 Goal

Complete Login/Register authentication system.

---

## 🧱 Tasks Completed

### 1️⃣ User Model Created

Fields:

```ts
name
email
password
```

Features:
- Required field validation
- Unique email validation
- Password minimum length validation

---

### 2️⃣ Register API

Implemented user registration flow:

- Receive user data
- Hash password using bcrypt
- Save user in MongoDB

✅ Secure password storage implemented

---

### 3️⃣ Login API

Implemented login system:

- Check email
- Verify password
- Generate JWT token

✅ Authentication system working

---

# 🔐 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

---

# 📦 Installation

## Clone Repository

```bash
git clone <your-repository-link>
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 📌 Current Progress

✅ Backend setup complete  
✅ MongoDB connected  
✅ Test route working  
✅ User registration working  
✅ Login authentication working  
✅ JWT generation working  

# 🟡 Step 3 — Auth Middleware & Protected Routes

## 🎯 Goal

Secure routes using JWT authentication middleware.

---

## 🧱 Tasks Completed

### 1️⃣ Auth Middleware Created

Middleware responsibilities:

- Read token from request headers
- Verify JWT token
- Attach decoded user data to request
- Protect private routes

---

### 2️⃣ Authorization Header Setup

Protected routes require token in headers:

```http
Authorization: Bearer YOUR_TOKEN
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

### 3️⃣ Protected Route Created

Example route:

```ts
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});
```

---

## 📌 Protected Route Request

### Method

```http
GET
```

### URL

```http
http://localhost:5000/api/profile
```

---

## ✅ Expected Response

```json
{
  "message": "Protected route accessed",
  "user": {
    "id": "664...",
    "iat": 171000,
    "exp": 171000
  }
}
```

---

## ❌ Invalid Token Response

```json
{
  "status": "fail",
  "message": "Unauthorized"
}
```

---

## 🧠 Concepts Learned

- JWT verification
- Express middleware
- Protected routes
- Authorization headers
- Request authentication
- Token-based security

---