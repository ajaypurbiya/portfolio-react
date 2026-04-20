import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container">
        <div className="row gy-2 align-items-center">
          
          {/* Logo/Name */}
          <div className="col-lg-4 col-md-12 text-center text-lg-start">
            <h3 className="fw-bold text-primary h6 mb-0">MERN Stack Developer</h3>
            <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
              Based in Bhopal.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-lg-4 col-md-6 d-flex justify-content-center">
            <ul className="list-unstyled d-flex gap-2 mb-0">
              <li><a href="#home" className="nav-link px-2 py-0 text-light" style={{ fontSize: '0.85rem' }}>Home</a></li>
              <li><a href="#projects" className="nav-link px-2 py-0 text-light" style={{ fontSize: '0.85rem' }}>Projects</a></li>
              <li><a href="#skills" className="nav-link px-2 py-0 text-light" style={{ fontSize: '0.85rem' }}>Skills</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-lg-4 col-md-6 d-flex justify-content-center justify-content-lg-end gap-2">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-light" title="GitHub">
              <i className="bi bi-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-light" title="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        <hr className="my-2 border-secondary" />

        <div className="text-center text-muted" style={{ fontSize: '0.75rem' }}>
          <p className="mb-0">&copy; {new Date().getFullYear()} Ajay Purbiya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;