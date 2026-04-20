import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/users', {
        name: formData.username,
        email: formData.email,
        password: formData.password
      });

      const { token, ...userData } = response.data;
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5 pt-5">
      <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border-0 w-100 mt-4" style={{ maxWidth: '550px' }}>
        <div className="text-center mb-4">
          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
            <i className="bi bi-person-plus fs-1"></i>
          </div>
          <h2 className="fw-bold mb-1">Create Account</h2>
          <p className="text-muted small">Set up your admin access</p>
        </div>
        
        {error && (
          <div className="alert alert-danger border-0 shadow-sm py-2 px-3 small fw-medium mb-4 text-center">
            <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-4">
            <div className="col-12">
              <label className="form-label fw-bold small mb-0 text-muted">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                required
                disabled={loading}
                className="form-input mb-0 mt-1"
                placeholder="johndoe"
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-bold small mb-0 text-muted">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                required
                disabled={loading}
                className="form-input mb-0 mt-1"
                placeholder="admin@example.com"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small mb-0 text-muted">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                required
                disabled={loading}
                className="form-input mb-0 mt-1"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label fw-bold small mb-0 text-muted">Confirm</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                required
                disabled={loading}
                className="form-input mb-0 mt-1"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 py-3 rounded-3 fw-bold lift-on-hover"
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Creating...</>
            ) : (
              <>Create Account <i className="bi bi-person-check ms-2"></i></>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="small text-muted mb-0">
            Already have an account?{' '}
            <Link to="/login" className="text-primary fw-bold text-decoration-none">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
