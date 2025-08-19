---

# 🍽️ AI Meal Planner

## Eat Smart, Live Better

---

## 🌟 About This Project

**AI Meal Planner** is your intelligent companion for healthy, personalized meal planning. In a world where nutrition is key but time is short, our platform leverages AI to generate custom meal plans tailored to your goals, preferences, and lifestyle. Whether you're aiming for muscle gain, weight loss, or simply a balanced diet, our system takes the guesswork out of eating well.

**Problem Solved:**  
Modern life is busy, and planning nutritious meals can be overwhelming. Many people struggle to find recipes that fit their dietary needs, track their nutrition, and stay motivated. AI Meal Planner solves this by automating meal planning, offering smart suggestions, and making healthy eating accessible for everyone.

---

## 🚀 Project Overview

AI Meal Planner is a full-stack application that combines a modern, user-friendly frontend with a robust backend and an AI-powered meal generation service. It supports:

- **Personalized meal plans** based on user goals and preferences
- **User authentication** and role-based access (admin/user)
- **User profile management** with Cloudinary-powered image storage
- **Subscription management** with Razorpay payment integration
- **Favorite meals** and custom meal plan creation
- **Admin dashboard** for user and activity management
- **AI-powered meal generation** using Google Gemini
- **Export options** (CSV, Excel) for meal plans and logs

---

## 🛠️ Tools & Technologies Used

### Frontend
- **React 19** with Vite for blazing-fast development
- **Tailwind CSS** & DaisyUI for beautiful, responsive design
- **React Router v7** for seamless navigation
- **Axios** for API communication
- **JWT Decode** for secure authentication
- **Heroicons, Lucide, React Icons** for a modern UI

### Backend
- **Spring Boot 3 (Java 21)** for scalable REST & GraphQL APIs
- **MongoDB** for flexible, document-based storage
- **Spring Security & OAuth2** for robust authentication
- **JWT** for stateless, secure sessions
- **Apache POI** for Excel export
- **Actuator** for monitoring and health checks

### Cloud Services
- **Cloudinary** for secure profile image storage and optimization
- **Razorpay** for secure payment processing and subscription management
- **MongoDB Atlas** (optional) for cloud database deployment

### AI Meal Generator
- **Python 3 + Flask** for lightweight API service
- **Google Gemini API** for advanced meal plan generation
- **OpenAI (optional)** for future extensibility
- **Pydantic, Jinja2, python-dotenv** for clean, maintainable code

### DevOps & Tooling
- **Docker Compose** for easy multi-service orchestration
- **Maven** for Java dependency management
- **Vite** for frontend tooling
- **ESLint** for code quality

---

## 🎨 Creative Features

- **Intuitive dashboards** for both users and admins
- **User profile management** with secure image uploads via Cloudinary
- **Subscription plans** with seamless Razorpay payment integration
- **AI-generated meal plans**—just enter your goals and let the AI do the rest!
- **Custom meal builder** for ultimate flexibility
- **Weekly meal views** and nutrition breakdowns
- **Export your plans** to CSV or Excel for shopping or tracking
- **Audit logging** for transparency and security
- **Responsive design** that works seamlessly across all devices

---

## 📦 Project Structure

```
AI-Meal-Planner/
  ├── auth-service/         # Java Spring Boot backend
  ├── frontend/             # React + Vite frontend
  ├── meal-generator-service/ # Python Flask AI microservice
  └── docker-compose.yml    # MongoDB Container
```

---

## 🔧 Configuration

### Environment Variables

Make sure to configure the following environment variables:

**Backend (auth-service):**
```
CLOUDINARY_URL=cloudinary://<api-key>:<api-secret>@cloudname
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
MONGODB_URI=mongodb://localhost:27017/ai-meal-planner
JWT_SECRET=your-jwt-secret
```

**AI Service (meal-generator-service):**
```
GOOGLE_GEMINI_API_KEY=your-gemini-api-key
```

---

## 🚦 Get Started

1. **Clone the repo:**  
   `git clone https://github.com/your-username/AI-Meal-Planner.git`

2. **Start MongoDB using Docker Compose:**  
   `docker-compose up -d`
   
   > This will launch a MongoDB container as defined in `docker-compose.yml`. This is required because MongoDB is not installed locally.

3. **Configure environment variables:**  
   - Set up your Cloudinary account and add the credentials to your backend environment
   - Configure your Razorpay account for payment processing and subscription management
   - Configure your Google Gemini API key for AI meal generation
   - Set up JWT secret and other required environment variables

4. **Start backend, frontend, and AI services:**  
   - Start the Java backend (`auth-service`) and Python AI service (`meal-generator-service`) according to their respective instructions (see each folder's README or documentation).
   - Start the React frontend (`frontend`).

5. **Visit the app:**  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Security Features

- **JWT-based authentication** for secure user sessions
- **Cloudinary secure uploads** with automatic image optimization
- **Razorpay secure payments** with PCI DSS compliant processing
- **Role-based access control** (admin/user permissions)
- **Subscription management** with automated billing and renewal
- **Input validation** and sanitization across all endpoints
- **Audit logging** for user activities and system events

---

## 💡 Inspiration

> "Let food be thy medicine and medicine be thy food."  
> — Hippocrates

With AI Meal Planner, healthy eating is just a click away. Enjoy smarter meals, every day!

---

*Happy Planning & Bon Appétit!* 🍏

---