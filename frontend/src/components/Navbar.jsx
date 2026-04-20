import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          MERN Stack Developer
        </Link>
        
        <button 
          className="btn btn-outline-secondary rounded-circle me-2 theme-toggle-btn"
          onClick={() => setIsDark(!isDark)}
          type="button"
          title="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            
            {!user ? (
              <li className="nav-item">
                <Link className="nav-link btn btn-primary ms-2" to="/login">Login</Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-muted ms-2">
                    Hi, {user.name || user.email}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
