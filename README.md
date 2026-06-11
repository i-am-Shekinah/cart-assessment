# Cart Assessment Project

A full-stack product listing and shopping cart application built with React (TypeScript) on the frontend and Node.js (Express) with MongoDB on the backend. The application supports authentication, product browsing, cart management, and checkout functionality.

---

## 🚀 Live Demo

- **Frontend (Vercel):** https://cart-assessment-sepia.vercel.app/
- **Backend:** (hosted API integrated with frontend)

---

## 📂 Repository

- **GitHub:** https://github.com/i-am-Shekinah/cart-assessment

---

## 👤 Author

- **Name:** Michael Olatunji

---

## ✨ Features

### Authentication
- User registration
- User login
- JWT-based authentication
- Protected routes

### Products
- Fetch all products from MongoDB
- Search products by name
- Filter by category
- Product details page

### Cart System
- Global cart state (Context API)
- Add/remove items
- Quantity tracking
- Cart badge indicator

### Checkout
- Cart summary page
- Total price calculation (NGN currency formatting)
- Remove items from cart
- Place order simulation

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Database
- MongoDB Atlas

---

## ⚙️ Local Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/i-am-Shekinah/cart-assessment.git
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🌐 Deployment Notes

The application is deployed as follows:

- **Frontend:** Vercel
- **Backend:** Render

### Deployment Decisions

- **Heroku** was initially considered for backend deployment, but it required a $1 billing verification which could not be completed due to billing address verification constraints. As a result, **Render** was used instead, as it provides a similar cloud deployment experience with minimal configuration overhead for Node.js + Express applications.
- **AWS** and **DigitalOcean** were also evaluated. However, due to time constraints and the additional infrastructure setup complexity required (including server provisioning, networking, and manual configuration), they were not used for this submission.

---

## 🔐 Environment Variables

### Backend
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for authentication |
| `PORT` | Server port (default: 5000) |

---

## 🧠 Architecture Notes

- Feature-based backend structure (auth, products, cart logic separation)
- RESTful API design
- Centralized state management using React Context API
- JWT-based authentication flow
- Clean separation between UI, services, and API layers

---

## 📦 Future Improvements

- Order persistence in database (Orders collection integration)
- Payment gateway integration
- Role-based access control (Admin/User separation)
- Product pagination
- Image upload support for products
- Better error handling & toast notifications

---

## 📌 Summary

This project demonstrates a full-stack e-commerce-style workflow including authentication, product management, cart functionality, and checkout flow, with a focus on clean architecture, scalability, and production-like structure.