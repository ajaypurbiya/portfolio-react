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
    <nav className="bg-white dark:bg-slate-900 shadow-md fixed w-full z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">AP.dev</span>
        
        <div className="flex items-center space-x-4">
          
          {/* Theme Toggle Button */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:scale-105 transition-all duration-200"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          
          <Link
            to="/"
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
          >
            Home
          </Link>
            
            {!user ? (
              <Link
                to="/login"
                className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Logout
                </button>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hi, {user.name || user.email}
                </span>
              </>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
