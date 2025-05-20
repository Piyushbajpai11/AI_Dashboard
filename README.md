## AI Dashboard

A modern full-stack web application that helps users generate and manage AI-powered content for various platforms using Grok AI (xAI).

---

### 🚀 Features

#### 🔐 User Authentication

* Secure registration and login
* JWT-based authentication
* Protected API routes

#### 📝 Content Generation

* Generate content for:

  * Blog Posts
  * Tweets
  * LinkedIn Posts
* Customizable:

  * Content type
  * Topic
  * Tone
  * Length
* Rich text editor integration (React Quill)
* Copy-to-clipboard functionality

#### 📊 Content Management

* View content history
* Sort and filter content
* Delete content
* Copy existing content

#### 🎨 Modern UI/UX

* Fully responsive design
* Clean, intuitive layout
* Loading and error handling states
* Smooth transitions and animations

---

### 🛠 Tech Stack

#### Frontend:

* React (Vite)
* React Router
* Axios
* Tailwind CSS
* React Icons
* React Quill

#### Backend:

* Node.js + Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt.js

---

### ⚙️ Prerequisites

* Node.js (v14 or higher)
* MongoDB
* npm or yarn

---

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-dashboard.git
cd ai-dashboard

# Install frontend dependencies
cd ai-dashboard-frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 🧪 Environment Variables

Create a `.env` file inside `/backend`:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 🏃 Run the App

```bash
# Run backend
npm run dev --prefix backend

# Run frontend
npm run dev --prefix ai-dashboard-frontend
```

The app will be available at:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:5000](http://localhost:5000)

---

### 📁 Project Structure

```
ai-dashboard/
├── ai-dashboard-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

---

### 🔌 API Endpoints

#### Auth:

* `POST /api/auth/register`
* `POST /api/auth/login`

#### Content:

* `POST /api/content/generate`
* `GET /api/content/history`
* `DELETE /api/content/delete/:id`

---

### 🤝 Contributing

1. Fork this repo
2. Create a feature branch
3. Commit and push your changes
4. Open a Pull Request

---

### 📄 License

This project is licensed under the MIT License.

---

### 🙏 Acknowledgments

* React.js & Tailwind CSS communities
* xAI (Grok) for AI power
* Everyone contributing to the open-source ecosystem
