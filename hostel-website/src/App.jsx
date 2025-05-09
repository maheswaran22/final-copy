import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Admission from "./components/Admission";
import Announcements from "./components/Announcements";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Home from "./components/Home";
import StudentComplaint from "./components/student";
import BookRoom from "./components/BookRoom";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/admission">Admission</Link>
          <Link to="/announcements">Announcements</Link>
          {isAuthenticated ? (
            <Link to="/" onClick={() => setIsAuthenticated(false)}>Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/contact">Contact</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/student-complaint" 
            element={
              <ProtectedRoute>
                <StudentComplaint />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/book-room" 
            element={
              <ProtectedRoute>
                <BookRoom />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;