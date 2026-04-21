# 🔐 Secure Notes API

A backend project built using Node.js, Express, and MongoDB that allows users to securely create, manage, and delete personal notes with authentication.

---

## 🚀 Features

- User Signup & Login (JWT Authentication)
- Create Notes
- Get All Notes (User-specific)
- Update Notes
- Delete Notes
- Protected Routes using Middleware
- Password Hashing using bcrypt

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt (Password Security)

---

## 📂 API Endpoints

### 🔑 Auth Routes
- POST /signup → Register user
- POST /login → Login user

### 📝 Notes Routes (Protected)
- POST /notes → Create note
- GET /notes → Get all notes
- PUT /notes/:id → Update note
- DELETE /notes/:id → Delete note

---

## 🔒 Authentication

- JWT Token required for notes routes
- Pass token in headers:
  Authorization: Bearer YOUR_TOKEN

---

## ⚙️ Setup Instructions

1. Clone the repo
2. Run `npm install`
3. Create `.env` file and add:
   JWT_SECRET=your_secret_key
   MONGO_URI=your_mongodb_connection
4. Run server:
   node server.js

---

## 💡 Future Improvements

- Add frontend (React)
- Add note categories
- Add search functionality
- Deploy on cloud

---

## 👩‍💻 Author

Prakriti Wadhwani
