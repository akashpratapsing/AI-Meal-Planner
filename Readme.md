# 🍽️ AI Meal Planner

## Eat Smart. Plan Better. Live Healthier.

---

## 🚀 Overview

**AI Meal Planner** is a full-stack, AI-powered nutrition platform that generates **personalized meal plans** using **Google Gemini**, directly integrated into a **Spring Boot backend**.

The application helps users plan meals aligned with their health goals—without the mental overhead of planning, tracking, or decision fatigue.

---

## 🎯 Problem It Solves

Healthy eating often fails not because of lack of intent, but because of friction:

* What should I eat today?
* Does this fit my macros?
* How do I stay consistent?
* How do I track favorites and progress?

**AI Meal Planner removes this friction** by combining AI, automation, and a clean user experience into a single system.

---

## ✨ Key Features

### 👤 User Features

* AI-generated personalized meal plans (Gemini powered)
* Weekly meal views with macro & calorie breakdown
* Favorite meals *(PRO feature)*
* Profile management with image upload
* Google OAuth & JWT authentication
* Subscription-based feature access

### 🛠 Admin Features

* User management
* Subscription & usage tracking
* Feature gating

### 🤖 AI Features

* Google Gemini API integration directly in Java
* Prompt-driven structured meal generation
* Macro-aware meal planning
* Extensible for future AI providers

---

## 🧱 Architecture

This project uses a **clean monolith backend** with external cloud services:

```
AI-Meal-Planner/
├── backend/                # Spring Boot backend (Java 21)
├── frontend/               # React + Vite frontend
├── .gitignore
└── README.md
```

---

## 🛠 Tech Stack

### Frontend

* React 19 + Vite
* Tailwind CSS + DaisyUI
* React Router v7
* Axios (centralized API layer)
* Framer Motion (animations)
* Lucide / React Icons
* JWT handling

### Backend

* Spring Boot 3 (Java 21)
* Spring Security + OAuth2
* JWT authentication
* MongoDB Atlas
* Google Gemini API (Java SDK / REST)
* Razorpay payment integration
* Cloudinary image uploads
* Spring Actuator

### Cloud & Services

* MongoDB Atlas (cloud database)
* Google Gemini API (AI)
* Cloudinary (image storage)
* Razorpay (payments)

---

## 🔐 Security & Access Control

* JWT-based stateless authentication
* Google OAuth login
* Role-based access control (USER / ADMIN)
* Subscription-based feature gating
* Secure image uploads via Cloudinary
* Razorpay PCI-compliant payment flow
* Input validation & sanitization

---

## 💳 Subscription Model

| Plan    | Features                                              |
| ------- | ----------------------------------------------------- |
| Free    | Limited meal plans, basic browsing                    |
| Premium | Unlimited meal plans, favorites, exports, AI features |

Subscriptions are enforced **server-side**, not just at the UI level.

---

## ⚙️ Environment Configuration

### Backend (`backend`)

```env

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_SCOPES=scopes
GOOGLE_AUTH_URI=your-google-auth-uri
GOOGLE_TOKEN_URI=your-google-token-uri
GOOGLE_USERINFO_URI=your-google-userinfo-uri
GOOGLE_USER_NAME_ATTRIBUTE=sub

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
RAZORPAY_WEBHOOK_SECRET=your-razorpay-webhook-secret

# Cloudinary
CLOUDINARY_URL=cloudinary://<api-key>:<api-secret>@cloudname

# MealDB URL
MEALDB_BASE_URL=meal-db-base-url

# Security
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION=86400000

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ai-meal-planner

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key
```

---

## 🚦 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/AI-Meal-Planner.git
cd AI-Meal-Planner
```

### 2️⃣ Configure environment variables

* MongoDB Atlas connection string
* Gemini API key
* Cloudinary credentials
* Razorpay credentials
* JWT secret

### 3️⃣ Start Backend

```bash
cd backend
./mvnw spring-boot:run
```

### 4️⃣ Start Frontend

```bash
cd frontend
npm install
npm run dev
```

### 5️⃣ Open the app

```
http://localhost:3000
```

---

## 💬 Inspiration

> *“Let food be thy medicine and medicine be thy food.”*
> — Hippocrates

---

## 🥗 Final Words

**AI Meal Planner** turns nutrition into a system—not a struggle.

**Smarter meals.**
**Less thinking.**
**Better consistency.**

Bon Appétit & Happy Planning! 🍏
