import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContentForm from "./components/ContentForm";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import ProfileCard from "./pages/ProfileCard";

// Layout component for protected routes
const ProtectedLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <ContentForm />
            </ProtectedLayout>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedLayout>
              <History />
            </ProtectedLayout>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedLayout>
              <ProfileCard />
            </ProtectedLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
