# 🏺 Historical Artifacts Tracker

A full-stack MERN-based web application designed to preserve and showcase historical artifacts like the Rosetta Stone, the Antikythera Mechanism, and many more. Users can explore, like, and contribute their own historical findings, all within a sleek, interactive, and secure interface.

## 🌐 Live Site

👉 [Visit the Live Project](https://historical-artifacts.netlify.app) 

---

## 🎯 Purpose

The purpose of this project is to create a robust platform where history enthusiasts can explore, manage, and share historical artifacts. With built-in authentication and user interactivity, this project aims to provide a practical example of a fully functional CRUD-based MERN stack application.

---

## 🚀 Key Features

### 🔐 Authentication
- Firebase Email/Password & Google Login
- JWT token-based protected routes
- Conditional Navbar rendering (Login / Profile Image with dropdown)

### 🏠 Home Page
- Eye-catching banner/slider (Swiper)
- Featured artifacts based on like count
- Extra meaningful sections with Framer Motion animation

### 🧭 Navigation & Routing
- Dynamic routing using `react-router`
- Protected/private routes for:
  - Add Artifact
  - My Artifacts
  - Liked Artifacts
  - Artifact Details

### 📃 Artifact Management (CRUD)
- **Create**: Add new artifacts with detailed information
- **Read**: View artifact details
- **Update**: Modify your own artifacts via form or modal
- **Delete**: Remove your own artifacts (with confirmation)

### ❤️ Like Functionality
- Toggle Like/Dislike button with real-time UI and DB updates
- Like count shown on artifact cards and details

### 🔍 Search Functionality
- Search artifacts by name on the All Artifacts Page

### 📂 Pages Overview
- Home
- All Artifacts
- Add Artifact
- Artifact Details
- My Artifacts
- Liked Artifacts
- Login / Register
- 404 Not Found

### 🧠 Other Features
- Toast/SweetAlert notifications for all CRUD operations
- Spinner during loading states
- Dynamic `document.title` for every page
- Error handling for invalid routes and empty states

---

## 🧩 NPM Packages Used

| Package Name            | Purpose |
|-------------------------|---------|
| `axios`                 | HTTP requests to backend |
| `firebase`              | Authentication (Email & Google) |
| `framer-motion`         | Animations |
| `lottie-react` / `react-lottie` | Animated illustrations |
| `lucide-react`          | Modern icons |
| `react`, `react-dom`    | Core React library |
| `react-helmet-async`    | Dynamic document titles |
| `react-icons`           | Icon pack |
| `react-loader-spinner`  | Loading spinners |
| `react-router`          | Routing |
| `sweetalert2`           | Pop-up alerts |
| `swiper`                | Sliders/Carousel |
| `tailwindcss`           | Utility-first CSS framework |
| `typewriter-effect`     | Typing animations |

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Firebase Auth
- **Backend**: Express.js, MongoDB, JWT Auth (Optional Firebase or Custom)
- **Database**: MongoDB Atlas
- **Deployment**: Netlify (Frontend), Vercel (Backend)

---


---

## 🙌 Acknowledgements

This project was developed as a full-stack MERN application with the goal of fulfilling all challenge requirements, including protected routing, user-specific data, animations, and responsive design.

---

## 📫 Contact

**MD. Tanvir Islam Rakib**  
BGIFT Institute of Science & Technology  
📧 Email: mdtanvirislamrakib7@gmail.com *(replace with your contact)*

---

> ⭐ Don't forget to give this project a star if you liked it!

