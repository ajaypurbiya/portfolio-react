import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../assets/background-hero.jpg';

const Hero = () => {
  return (
    <motion.section 
      className="hero-section position-relative d-flex flex-column justify-content-center align-items-center text-center min-vh-100 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(79,70,229,0.9) 0%, rgba(147,51,234,0.8) 100%), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="display-2 fw-bold mb-5 text-white drop-shadow-lg">
          Hi, I'm <span className="text-warning">Ajay</span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lead fs-3 text-white-50 mb-5 px-3" style={{maxWidth: '40rem', margin: '0 auto'}}
        >
          Full-Stack MERN Developer creating scalable web apps with cutting-edge tech
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="d-flex flex-column flex-md-row gap-3"
      >
        <Link to="/register" className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow-lg lift-on-hover fs-5">
          <i className="bi bi-rocket-takeoff-fill me-2 text-primary"></i> Get Started Free
        </Link>
        <Link to="/login" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fs-5">
          <i className="bi bi-shield-lock-fill me-2"></i> Login
        </Link>
      </motion.div>

      <motion.div 
        className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <i className="bi bi-chevron-double-down text-white fs-1 opacity-75"></i>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
