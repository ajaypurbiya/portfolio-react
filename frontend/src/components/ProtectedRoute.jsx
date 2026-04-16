import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show nothing or a spinner while checking if the user is logged in
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If there is no user, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If there is a user, let them through to the page
  return children;
};

export default ProtectedRoute;