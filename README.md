<div align="center">
  <img src='https://github.com/kaifcs/LearnSphere/blob/main/frontend/src/assets/Logo/Logo-Full-Light.png' alt="LearnSphere Logo" width="350">
</div>

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

</div>

# LearnSphere

## Description 📝

LearnSphere is a **modern, full-stack Learning Management System (LMS)** built on the **MERN stack**. It provides a complete online learning platform where **students** can discover, purchase, enroll in, and track courses, while **instructors** can create, manage, and publish professional educational content.

The platform is built around **JWT authentication**, **OTP email verification**, **Razorpay payment integration**, **Cloudinary media management**, **role-based dashboards**, **course progress tracking**, and a fully responsive interface designed for a seamless learning experience — backed by security and performance practices such as **Helmet**, **rate limiting**, and **response compression**.

<hr/>

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/home1.png' alt="Home Page" />

## Live Demo 🌍

- 🔗 **Frontend:** [https://learn-sphere-lms.vercel.app](https://learn-sphere-lms.vercel.app)
- 🔗 **Backend API:** [https://learnsphere-backend-kx4j.onrender.com](https://learnsphere-backend-kx4j.onrender.com)

<hr/>

## Table of Contents

| Section | Description |
| --- | --- |
| [LearnSphere Aim](#learnsphere-aim-) | 📚 Overview of LearnSphere's goals |
| [Tech Stack](#tech-stack-) | 💻 Technologies used in the project |
| [Key Features](#key-features-) | ✨ Highlights of the platform |
| [System Architecture](#system-architecture-) | 🏰 Overview of the system architecture |
| [Architecture Diagram](#architecture-diagram-) | 🏗️ Diagram illustrating the architecture |
| [Student Features](#-student-features) | 👨‍🎓 What students can do |
| [Instructor Features](#-instructor-features) | 👨‍🏫 What instructors can do |
| [Backend Features](#backend-features-) | ⚙️ API-level capabilities |
| [Security Features](#security-features-) | 🔒 How the platform stays secure |
| [Performance Optimizations](#performance-optimizations-) | ⚡ How the platform stays fast |
| [Database Models](#database-models-️) | 🗂️ Data models used |
| [Run Locally](#run-locally-) | 🚀 Setup instructions |
| [Screen Preview](#screen-preview-) | 🖥️ Screenshots of the platform |

<hr/>

## LearnSphere Aim 📚

- **Build** a full-stack Learning Management System using the MERN stack.
- **Provide** dedicated dashboards for students and instructors with secure, role-based authentication.
- **Enable** instructors to create, organize, publish, and manage professional online courses.
- **Allow** students to discover, purchase, enroll in, and complete courses with real-time progress tracking.
- **Deliver** a secure, responsive, and modern learning experience powered by JWT, Razorpay, and Cloudinary.

<br/>
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/gif.gif' alt="Tech Stack Overview" />

<hr/>

## Tech Stack 💻

### Frontend 🎨

<code title="React.js"><img height="40" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/react%20ogo.png" alt="React"></code>
<code title="Vite"><img height="40" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/Vitejs-logo.png" alt="Vite"></code>
<code title="Redux.js"><img height="35" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/redux-logo.png" alt="Redux"></code>
<code title="css"><img height="40" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/css%20logo.png" alt="CSS"></code>
<code title="Tailwind css"><img height="35" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/tailwind%20css%20logo.png" alt="Tailwind CSS"></code>

- **React** with **React Router** for client-side routing
- **Vite** as the build tool and dev server
- **Redux Toolkit** for centralized state management
- **Tailwind CSS** for utility-first styling
- **Axios** as the HTTP client
- **React Hook Form** for form handling and validation
- **Chart.js** and **React Chart.js 2** for instructor analytics visualizations

### Backend ⚙️

<code title="Nodejs"><img height="50" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/nodejs-logo.png" alt="Node.js"></code>
<code title="Express"><img height="70" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/express%20logo.png" alt="Express"></code>

- **Node.js** and **Express.js** following a modular **MVC architecture**
- **fast-jwt** for high-performance JWT signing and verification, wrapped in a custom `utils/jwt.js` module
- **Bcrypt** for password hashing
- **Helmet** for secure HTTP headers
- **Express Rate Limit** to protect authentication endpoints from brute-force attempts
- **Compression** for gzip response compression
- **Express File Upload** for handling media uploads with strict MIME-type validation
- **Brevo API** and **OTP Generator** for transactional emails and OTP verification
- **Razorpay** SDK for payment processing

### Database 🛢️

<code title="Mongodb"><img height="40" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/mongodb%20logo.png" alt="MongoDB"></code>

- **MongoDB Atlas** with **Mongoose** as the ODM

### Cloud Services ☁️

<code title="Cloudinary"><img height="40" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/cloudinary-logo.jpg" alt="Cloudinary"></code>

- **Cloudinary** for storing and serving course thumbnails and video lectures

<hr/>

## Key Features ✨

- 🔐 **JWT Authentication** via Bearer tokens
- 📧 **OTP Email Verification**
- 🎓 **Student & Instructor Dashboards**
- 📚 **Course Management** with sections and lectures
- 🎥 **Video Lecture Streaming**
- 💳 **Razorpay Payment Gateway**
- ☁️ **Cloudinary Media Storage**
- ⭐ **Ratings & Reviews**
- 📈 **Course Progress Tracking**
- 📊 **Instructor Analytics**
- 📱 **Fully Responsive Design**

<hr/>

## System Architecture 🏰

LearnSphere follows a **client-server architecture** made up of three main components: the frontend (client), the backend (server), and the database.

### Frontend Architecture

Built with **React** and **Vite** for a fast, responsive, and interactive experience. **Redux Toolkit** manages global state, while **React Router** handles navigation. The app uses lazy-loaded routes with `Suspense` for faster initial load times, reusable UI components, loading skeletons, protected route wrappers (`OpenRoute` and `ProtectedRoute`), and Axios-based REST API communication.

### Backend Architecture

Built with **Node.js** and **Express.js** following a modular **MVC pattern**. It exposes secure REST APIs for authentication, user management, course management, payments, ratings & reviews, media uploads, and progress tracking. A unified authentication middleware checks cookies, request body, and bearer tokens, and JWTs are generated using the `fast-jwt`-based wrapper. Role- and ownership-based authorization middleware further restrict course, section, and lecture routes to the instructor who owns them. Security middleware (Helmet, rate limiting), response compression, and a dedicated health-check endpoint round out the API layer.

### Database Architecture

**MongoDB Atlas** is the primary datastore, using a flexible, document-based schema to store users, profiles, categories, courses, sections, lectures, reviews, payments, and course progress.

<hr/>

## Architecture Diagram 🏗️

A high-level diagram illustrating the LearnSphere architecture:

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Architecture%20Diagram.png' alt="Architecture Diagram" />

<hr/>

## 👨‍🎓 Student Features

- **Browse & Discover** – Landing page, course catalog, and course details with curriculum, instructor info, ratings, and pricing.
- **Cart & Checkout** – Add courses to cart and complete secure checkout via Razorpay.
- **Course Learning** – Watch video lectures and track progress by marking lectures complete.
- **Enrolled Courses & Purchase History** – Access purchased courses anytime and view past transactions.
- **Profile & Account** – Update profile details, display picture, and change password.

## 👨‍🏫 Instructor Features

- **Instructor Dashboard** – Overview of revenue, students, and published courses, with Chart.js-powered analytics.
- **Course Management** – Create, edit, publish, unpublish, and delete courses through a multi-step course builder.
- **Section & Lecture Management** – Organize course content into sections and subsections efficiently.
- **Analytics Dashboard** – View revenue, student enrollments, and overall course performance.
- **Profile Management** – Update instructor profile information.

<hr/>

## Backend Features ⚙️

- 🔑 **Forgot & Reset Password**
- 🗂️ **Category Management**
- 🖼️ **MIME Type Validation** for uploaded images and videos
- 🧾 **Purchase History**
- 📩 **Automated Email Notifications**
- ❤️ **Health Check Endpoint** (`/api/v1/health`)
- 📝 **Draft / Published Course Lifecycle** – courses default to Draft on creation and must be explicitly published by their instructor
- ⏱️ **TTL-Indexed Collections for OTPs and Pending Payments** – OTPs and abandoned (unpaid) payment orders expire and clean themselves up automatically

<hr/>

## Security Features 🔒

- **JWT Authentication** using `fast-jwt`, verified via a unified middleware
- **Role-Based Authorization** – Student, Instructor, and Admin route access enforced via dedicated middleware
- **Instructor Ownership Validation** – course, section, and lecture mutations are restricted to the owning instructor; draft courses are visible only to their owner
- **Razorpay Signature Verification** – HMAC-SHA256 signature check with server-recorded order-to-course binding and replay protection
- **Bcrypt** password hashing
- **Helmet** security headers
- **Express Rate Limiting** on authentication endpoints to prevent brute-force attempts
- **Dynamic CORS Configuration** with an origin allowlist
- **MIME Type Validation** and a 50MB upload size limit on file uploads
- **Centralized Error Handling** middleware across the API

## Performance Optimizations ⚡

- **Vite** build system with dynamic code splitting
- **Lazy-loaded routes** using `React.lazy()` and `Suspense`
- **Rollup Bundle Visualizer** for analyzing and optimizing bundle size
- **Response Compression** (gzip) on API responses
- **Cloudinary CDN** for serving images and video

<hr/>

## Database Models 🗂️

LearnSphere uses 10 MongoDB collections to organize platform data: **User**, **Profile**, **Category**, **Course**, **Section**, **SubSection**, **RatingAndReview**, **CourseProgress**, **Payment**, and a TTL-indexed **OTP** collection for email verification.

<hr/>

## Run Locally 🚀

### Clone the Repository

```bash
git clone https://github.com/kaifcs/LearnSphere.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Run backend tests with `npm test` (Jest unit tests covering the authentication middleware, instructor ownership authorization, payment signature verification, and password reset logic).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Application URLs

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

<hr/>

## Screen Preview 🖥️

### Home Page

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/home3.png' alt="Home Page" />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/home4.png' alt="Home Page" />

### About Page

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/about.png' alt="About Page" />

### Contact Page

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/contact.png' alt="Contact Page" />

### Forgot Password

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/forgot%20pass.png' alt="Forgot Password" />

### Dashboard

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/dashboard.png' alt="Dashboard" />

### Edit Profile

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/edit%20profile.png' alt="Edit Profile" />

### Add Course

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/add%20course.png' alt="Add Course" />

### Edit Course

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/edit%20course.png' alt="Edit Course" />

### Course Details

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/course%20details1.png' alt="Course Details" />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/course%20details2.png' alt="Course Details" />

### Add Review

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/add%20review.png' alt="Add Review" />

### Cart

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/cart1.png' alt="Cart" />

### Enrolled Courses

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/enrolled%20courses1.png' alt="Enrolled Courses" />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/enrolled%20courses2.png' alt="Enrolled Courses" />

### Instructor Data

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/instrctor%20data1.png' alt="Instructor Data" />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/instrctor%20data2.png' alt="Instructor Data" />

### My Courses

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/myCourses1.png' alt="My Courses" />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/myCourses2.png' alt="My Courses" />

### View Courses

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/view%20course1.png' alt="View Course" />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/view%20course2.png' alt="View Course" />

### Delete Account

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/delete%20account.png' alt="Delete Account" />

### Footer

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/footer.png' alt="Footer" />

<hr/>

## Support ⭐

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

## Developer 👨‍💻

**Kaif Khan**

Built with **❤️ using the MERN Stack**