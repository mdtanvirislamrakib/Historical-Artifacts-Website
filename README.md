
# 🏺 HistoriVault

A full-stack MERN-based web application designed to preserve and showcase historical artifacts like the **Rosetta Stone**, **Antikythera Mechanism**, and many more. Users can explore, like, and contribute their own historical findings, all within a sleek, interactive, and secure interface.

---

## 🌐 Live Site

👉 **Frontend**: [https://historical-artifacts.netlify.app](https://historical-artifacts.netlify.app)  
👉 **Backend (API)**: [https://historical-artifacts-server-three.vercel.app/](https://historical-artifacts-server-three.vercel.app/)

---

## 🎯 Project Purpose

The goal of this project is to create a robust platform where history enthusiasts can explore, manage, and share historical artifacts. With built-in authentication, protected routes, and user interaction, it serves as a full-featured CRUD-based MERN stack application.

---

## 🚀 Key Features

### 🔐 Authentication
- Firebase Email/Password & Google Login
- JWT token-based protected routes
- Conditional Navbar (Login / Profile Image Dropdown)

### 🏠 Home Page
- Animated banner/slider (Swiper)
- Featured artifacts based on like count
- Animated sections with Framer Motion

### 🧭 Navigation & Routing
- React Router-based navigation
- Protected routes for:
  - Add Artifact
  - My Artifacts
  - Liked Artifacts
  - Artifact Details

### 📃 Artifact Management (CRUD)
- **Create**: Submit new artifacts with detailed info
- **Read**: View all artifacts and specific details
- **Update**: Edit your own artifacts
- **Delete**: Delete your own artifacts (with confirmation prompt)

### ❤️ Like Functionality
- Like/Dislike toggle with real-time UI & DB updates
- Like count display

### 🔍 Search Functionality
- Search artifacts by name on All Artifacts page

### 📂 Pages
- Home
- All Artifacts
- Add Artifact
- Artifact Details
- My Artifacts
- Liked Artifacts
- Login / Register
- 404 Page Not Found

### 🧠 Other Features
- Toast/SweetAlert2 notifications
- Spinners on data loading
- Dynamic page titles (`react-helmet-async`)
- Error handling for invalid states

---

## 🛠 Technologies Used

### 🔧 Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion, Firebase Auth
- **Backend**: Express.js, Node.js, MongoDB Atlas, JWT Auth
- **Deployment**: Netlify (Frontend), Vercel (Backend)

### 📦 NPM Packages

| Package                | Purpose                          |
|------------------------|----------------------------------|
| `axios`                | API communication                |
| `firebase`             | User authentication              |
| `framer-motion`        | Animations                       |
| `lottie-react`         | Lottie animations                |
| `lucide-react`         | Modern icons                     |
| `react`, `react-dom`   | React base packages              |
| `react-helmet-async`   | Dynamic page titles              |
| `react-icons`          | Icon support                     |
| `react-loader-spinner` | Loading indicators               |
| `react-router`         | Routing                          |
| `sweetalert2`          | Pop-up notifications             |
| `swiper`               | Slider/banner                    |
| `tailwindcss`          | Utility CSS                      |
| `typewriter-effect`    | Typing animation for headings    |

---

## 💻 প্রজেক্টটি লোকাল মেশিনে কীভাবে রান করবেন

এই প্রজেক্টটি আপনার লোকাল মেশিনে রান করার জন্য নিচের ধাপগুলো অনুসরণ করুন:

### 🔽 Step 1: রেপোজিটরি ক্লোন করুন

```bash
git clone https://github.com/yourusername/historivault.git
```

### 📂 Step 2: ফ্রন্টএন্ড সেটআপ

```bash
cd historivault/client
npm install
```

### 🧪 Step 3: ব্যাকএন্ড সেটআপ

```bash
cd ../server
npm install
```

### 🔐 Step 4: Environment Variables তৈরি করুন

**Frontend (.env):**
```
VITE_API_URL=https://your-backend-url.com
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
...other Firebase credentials...
```

**Backend (.env):**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### ▶️ Step 5: প্রজেক্ট রান করুন

**Frontend:**
```bash
npm run dev
```

**Backend:**
```bash
nodemon index.js
```

---

## 🙌 Acknowledgements

This project was developed as a full-stack MERN assignment for demonstrating core concepts like protected routes, CRUD operations, user management, and animation-rich frontend design.

---

## 📫 Contact

**MD. Tanvir Islam Rakib**  
BGIFT Institute of Science & Technology  
📧 Email: mdtanvirislamrakib7@gmail.com  

---

> ⭐ If you found this project helpful or inspiring, please consider starring the repository!
