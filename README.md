<img src='https://github.com/kaifcs/LearnSphere/blob/main/frontend/src/assets/Logo/Logo-Full-Light.png' />

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

</div>

# LearnSphere

## Description 📝

LearnSphere is a **modern, full-stack Learning Management System (LMS)** built on the **MERN stack**. It provides a complete online learning platform where **students** can discover, purchase, enroll in, and track courses, while **instructors** can create, manage, and publish professional educational content.

The platform is built around **JWT authentication**, **OTP email verification**, **Razorpay payment integration**, **Cloudinary media management**, **role-based dashboards**, **course progress tracking**, and a fully responsive interface designed for a seamless learning experience — backed by production-grade security and performance practices such as **Helmet**, **rate limiting**, and **response compression**.

<hr/>

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/home1.png' />

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
| [React Hooks](#react-hooks-) | 🎣 Hooks used across the frontend |
| [React Libraries](#react-libraries-) | 📚 Notable frontend libraries |
| [Run Locally](#run-locally-) | 🚀 Setup instructions |
| [Screen Preview](#screen-preview-) | 🖥️ Screenshots of the platform |

<hr/>

## LearnSphere Aim 📚

- **Build** a scalable, production-ready Learning Management System using the MERN stack.
- **Provide** dedicated dashboards for students and instructors with secure, role-based authentication.
- **Enable** instructors to create, organize, publish, and manage professional online courses.
- **Allow** students to discover, purchase, enroll in, and complete courses with real-time progress tracking.
- **Deliver** a secure, responsive, and modern learning experience powered by JWT, Razorpay, and Cloudinary.

<br/>
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/gif.gif' />

<hr/>

## Tech Stack 💻

### Frontend 🎨

<code title="React.js"><img height="40" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/react%20ogo.png"></code>
<code title="Vite"><img height="40" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/Vitejs-logo.png"></code>
<code title="Redux.js"><img height="35" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/redux-logo.png"></code>
<code title="css"><img height="40" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/css%20logo.png"></code>
<code title="Tailwind css"><img height="35" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/tailwind%20css%20logo.png"></code>

- **React** with **React Router** for client-side routing
- **Vite** as the build tool and dev server
- **Redux Toolkit** for centralized state management
- **Tailwind CSS** for utility-first styling
- **Axios** as the HTTP client
- **React Hook Form** for form handling and validation
- **Chart.js** and **React Chart.js 2** for instructor analytics visualizations

### Backend ⚙️

<code title="Nodejs"><img height="50" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/nodejs-logo.png"></code>
<code title="Express"><img height="70" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/express%20logo.png"></code>

- **Node.js** and **Express.js** following a modular **MVC architecture**
- **fast-jwt** for high-performance JWT signing and verification, wrapped in a custom `utils/jwt.js` module
- **Bcrypt** for password hashing
- **Helmet** for secure HTTP headers
- **Express Rate Limit** to protect authentication endpoints from brute-force attempts
- **Compression** for gzip response compression
- **Express File Upload** for handling media uploads with strict MIME-type validation
- **Nodemailer** and **OTP Generator** for transactional emails and OTP verification
- **Razorpay** SDK for payment processing

### Database 🛢️

<code title="Mongodb"><img height="40" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/mongodb%20logo.png"></code>

- **MongoDB Atlas** with **Mongoose** as the ODM

### Cloud Services ☁️

<code title="Cloudinary"><img height="40" src="https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Tech%20stack%20logo/cloudinary-logo.jpg"></code>

- **Cloudinary** for storing and serving course thumbnails and video lectures

<hr/>

## Key Features ✨

- 🔐 **JWT Authentication** via HttpOnly cookies
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

Built with **Node.js** and **Express.js** following a modular **MVC pattern**. It exposes secure REST APIs for authentication, user management, course management, payments, ratings & reviews, media uploads, and progress tracking. A unified authentication middleware checks cookies, request body, and bearer tokens, and JWTs are generated using the `fast-jwt`-based wrapper. Security middleware (Helmet, rate limiting), response compression, and a dedicated health-check endpoint round out the API layer.

### Database Architecture

**MongoDB Atlas** is the primary datastore, using a flexible, document-based schema to store users, profiles, categories, courses, sections, lectures, reviews, payments, and course progress.

<hr/>

## Architecture Diagram 🏗️

A high-level diagram illustrating the LearnSphere architecture:

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/Architecture%20Diagram.png' />

<hr/>

## 👨‍🎓 Student Features

- **Home Page** – Modern landing page with featured courses and categories.
- **Course Catalog** – Browse and search available courses.
- **Course Details** – View course curriculum, instructor information, ratings, and pricing.
- **Shopping Cart** – Add courses and complete secure checkout via Razorpay.
- **Course Learning** – Watch video lectures and mark lectures complete to track progress.
- **Enrolled Courses** – Access purchased courses at any time.
- **Purchase History** – View previous transactions.
- **Profile Management** – Update profile details and display picture.
- **Password Management** – Change password securely.

## 👨‍🏫 Instructor Features

- **Instructor Dashboard** – Overview of revenue, students, and published courses, with Chart.js-powered analytics.
- **Course Management** – Create, edit, publish, unpublish, and delete courses through a multi-step course builder.
- **Section & Lecture Management** – Organize course content into sections and subsections efficiently.
- **Analytics Dashboard** – View revenue, student enrollments, and overall course performance.
- **Profile Management** – Update instructor profile information.

<hr/>

## Backend Features ⚙️

- 🔐 **JWT Authentication** using `fast-jwt`
- 📧 **OTP Email Verification**
- 🔑 **Forgot & Reset Password**
- 📚 **Course CRUD Operations**
- 🗂️ **Category Management**
- ☁️ **Cloudinary Media Upload**
- 🖼️ **MIME Type Validation** for uploaded images and videos
- 💳 **Razorpay Payment Gateway**
- ⭐ **Ratings & Reviews**
- 📈 **Course Progress Tracking**
- 📊 **Instructor Dashboard Analytics**
- 🧾 **Purchase History**
- 📩 **Automated Email Notifications**
- ❤️ **Health Check Endpoint** (`/api/v1/health`)

<hr/>

## Security Features 🔒

- **JWT Authentication** using `fast-jwt`, stored in HttpOnly cookies to mitigate XSS attacks
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
- **Optimized Cloudinary Delivery** for images and video

<hr/>

## Database Models 🗂️

LearnSphere uses multiple MongoDB collections to organize and manage platform data efficiently:

- **User** – Stores authentication and role-based information.
- **Profile** – Stores personal profile details for each user.
- **Category** – Organizes courses into different learning domains.
- **Course** – Stores course metadata, pricing, thumbnails, and instructor details.
- **Section** – Represents course modules.
- **SubSection** – Stores individual video lectures and resources.
- **Rating & Review** – Stores student ratings and feedback.
- **Course Progress** – Tracks lecture completion and learning progress.
- **Payment** – Stores Razorpay payment and purchase history.
- **OTP** – Short-lived, TTL-indexed collection for email verification.

<hr/>

## React Hooks 🎣

The project makes extensive use of React Hooks for efficient state management, routing, and component lifecycle handling:

- **useState**
- **useEffect**
- **useRef**
- **useNavigate**
- **useLocation**
- **useParams**
- **useDispatch**
- **useSelector**

<hr/>

## React Libraries 📚

- 🚀 **React Lazy Load Image** – Enhances performance by lazily loading images.
- 🎭 **Framer Motion** – Animation library providing smooth, expressive motion.
- 📁 **React Dropzone** – Drag-and-drop file uploader.
- 🍞 **React Hot Toast** – Elegant, customizable toast notifications.
- 🔢 **React OTP Input** – Input component for one-time password entry.
- 📊 **React Super Responsive Table** – Highly responsive, feature-rich table component.
- 🔄 **Swiper** – Modern touch slider for mobile and desktop.
- 🖋️ **React Type Animation** – Configurable typing animation component.
- 📈 **Chart.js / React Chart.js 2** – Instructor analytics visualizations.

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

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/home3.png' />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/home4.png' />

### About Page

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/about.png' />

### Contact Page

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/contact.png' />

### Forgot Password

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/forgot%20pass.png' />

### Dashboard

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/dashboard.png' />

### Edit Profile

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/edit%20profile.png' />

### Add Course

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/add%20course.png' />

### Edit Course

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/edit%20course.png' />

### Course Details

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/course%20details1.png' />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/course%20details2.png' />

### Add Review

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/add%20review.png' />

### Cart

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/cart1.png' />

### Enrolled Courses

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/enrolled%20courses1.png' />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/enrolled%20courses2.png' />

### Instructor Data

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/instrctor%20data1.png' />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/instrctor%20data2.png' />

### My Courses

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/myCourses1.png' />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/myCourses2.png' />

### View Courses

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/view%20course1.png' />
<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/view%20course2.png' />

### Delete Account

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/delete%20account.png' />

### Footer

<img width='100%' src='https://github.com/kaifcs/LearnSphere/blob/main/screenshots/footer.png' />

<hr/>

## Support ⭐

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

## Developer 👨‍💻

**Kaif Khan**

Built with **❤️ using the MERN Stack**