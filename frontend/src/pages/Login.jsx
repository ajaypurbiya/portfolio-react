import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/users/login', {
        email,
        password
      });

      const { token, ...userData } = response.data;
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
      <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border-0 w-100" style={{ maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
            <i className="bi bi-shield-lock fs-1"></i>
          </div>
          <h2 className="fw-bold mb-1">Admin Login</h2>
          <p className="text-muted small">Sign in to manage your portfolio</p>
        </div>
        
        {error && (
          <div className="alert alert-danger border-0 shadow-sm py-2 px-3 small fw-medium mb-4 text-center">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold small mb-0 text-muted">Email</label>
            <input
              type="email"
              required
              className="form-input mb-1 mt-1 ml-2"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold small mb-0 text-muted">Password</label>
            <input
              type="password"
              required
              className="form-input mb- mt-1"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-3 rounded-3 fw-bold lift-on-hover"
          >
            Sign In <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </form>
        
        <div className="text-center mt-4">
          <Link to="/" className="text-primary fw-bold text-decoration-none small">
            <i className="bi bi-arrow-left me-1"></i> Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
