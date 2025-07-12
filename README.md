# 🥗 FoodBridge

**FoodBridge** is a MERN stack-based food donation management platform that connects restaurants with charities to reduce food waste and support communities.

---

## 🔗 Live Website

🌐 [FoodBridge Live Link](https://your-live-site-link.com)

---

## 👤 User Roles

- 👨‍🍳 **Restaurant** – Can post donations, edit, delete, and track status.
- 🏢 **Charity** – Can request food donations.
- 🔐 **Admin** – Manage users, monitor donations (Future Scope).
- 🙋 **General Users** – Can browse and see donation details.

---

## 🧩 Core Features

✅ Firebase Authentication (Email/Password + Google Login)  
✅ Route Protection with PrivateRoute  
✅ Post/Edit/Delete Donations (Restaurant role)  
✅ View All Donations (with route protection)  
✅ View Single Donation Details  
✅ Charity Request Functionality  
✅ Donation Status Handling (Pending, Available, Picked Up, etc.)  
✅ Payment Integration via Stripe  
✅ Dashboard with Analytics:
- Total Posted
- Available
- Picked Up

### ✅ Core Functionalities

- 🔐 Firebase Authentication (Email/Password + Google Login)
- 📝 Register/Login with validation
- 📦 Post, Edit, and Delete Donations (Restaurant role)
- 📄 View All Donations (with route protection)
- 🔍 Filter Donations by Food Type & Location
- 📌 Donation Status (Pending, Verified, Picked Up, etc.)
- 📤 Charity Requests for Food
- 💳 Stripe Payment Integration (for future donations)
- 📊 Dashboard Analytics:
  - Total Posted
  - Available
  - Picked Up

### 🟢 Bonus Features

- 🔍 Search & Filter Donations
- 🧾 View Requested Donations (Restaurant)
- 📊 Dashboard Analytics (Role-wise)
- 🖼️ Lottie Animations
- 🌙 Dark/Light Mode
- 💬 Toast Alerts

---

## 🖼️ Project Structure

```bash
FoodBridge/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── Pages/
│   │   ├── Components/
│   │   ├── Firebase/
│   │   ├── Provider/
│   │   ├── Router/
│   │   └── hooks/
├── server/                  # Express.js Backend
│   ├── index.js
│   ├── models/
│   └── routes/



---

## ⚙️ Tech Stack

### Frontend (Client)
- React.js with Vite
- Tailwind CSS + DaisyUI
- Firebase Auth
- React Router
- React Hook Form
- React Query (TanStack)
- Swiper.js
- Lottie React
- Stripe.js

### Backend (Server)
- Node.js + Express.js
- MongoDB (Native Driver)
- JWT Authentication
- Bcrypt.js
- Dotenv
- Stripe API

---

## 🛠️ How to Run Project Locally

### ✅ 1. Clone Repository

```bash
git clone https://github.com/your-username/foodbridge.git
cd foodbridge
