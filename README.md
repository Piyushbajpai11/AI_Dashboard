# AI Dashboard

A modern web application that helps users generate and manage AI-powered content for various social media platforms.

## Features

- 🔐 **User Authentication**
  - Secure login and registration system
  - JWT token-based authentication
  - Protected routes

- 📝 **Content Generation**
  - Generate content for multiple platforms:
    - Blog Posts
    - Tweets
    - LinkedIn Posts
  - Customizable content parameters:
    - Content type selection
    - Topic input
    - Tone selection
    - Length selection
  - Rich text editor integration
  - Copy to clipboard functionality

- 📊 **Content Management**
  - View content history
  - Search and filter content
  - Sort content by date
  - Delete content
  - Copy content to clipboard

- 🎨 **Modern UI/UX**
  - Responsive design
  - Clean and intuitive interface
  - Loading states and error handling
  - Smooth animations and transitions

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- Tailwind CSS
- React Icons
- React Quill (Rich Text Editor)

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt.js

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-dashboard.git
cd ai-dashboard
```

2. Install dependencies for both frontend and backend

```bash
# Install frontend dependencies
cd ai-dashboard-frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the development servers

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from ai-dashboard-frontend directory)
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
ai-dashboard/
├── ai-dashboard-frontend/     # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   └── package.json
│
└── backend/                  # Backend Node.js application
    ├── controllers/         # Route controllers
    ├── models/             # Database models
    ├── routes/             # API routes
    ├── middleware/         # Custom middleware
    └── server.js           # Server entry point
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Content

- `GET /api/content/history` - Get user's content history
- `POST /api/content/generate` - Generate new content
- `DELETE /api/content/delete/:id` - Delete content

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React.js community
- Tailwind CSS team
- All contributors and supporters of the project 