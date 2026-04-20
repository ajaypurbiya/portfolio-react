import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      // Send the data to our new backend route
      await axios.post('/messages', formData);
      
      setStatus('Message sent successfully! 🚀');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="page-section bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container">
        <div className="text-center mb-8">
          <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-4 py-2 rounded-pill shadow-sm inline-block">Contact Me</span>
          <h2 className="display-4 fw-bold mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="lead text-gray-600 dark:text-gray-400 mx-auto mb-0" style={{ maxWidth: '600px' }}>
            Have a project in mind? Let's talk about collaboration.
          </p>
        </div>

        <div className="row g-4 align-items-start">
          {/* Contact Info */}
          <div className="col-lg-5">
            <div>
              <h3 className="h2 fw-bold mb-4 text-gray-900 dark:text-white">Get In Touch</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 lead">Ready to start your project or just want to say hello?</p>
            </div>
            
            <div className="space-y-3">
              {/* Email Card */}
              <div className="d-flex align-items-center mb-3 gap-3 p-5 bg-white dark:bg-gray-800 rounded-3 shadow-sm border dark:border-gray-700 lift-on-hover transition-all">
                <div className="bg-primary bg-gradient rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-lg" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-envelope-fill text-white fs-5"></i>
                </div>
                <div>
                  <p className="mb-1 fw-bold text-gray-900 dark:text-gray-100 fs-5">Email</p>
                  <a href="mailto:ajaypupurbiya@gmail.com" className="mb-0 text-primary fw-semibold text-decoration-none hover:text-purple-600 dark:hover:text-purple-400">
                    ajaypupurbiya@gmail.com
                  </a>
                </div>
              </div>
              
              {/* Phone Card */}
              <div className="d-flex align-items-center gap-3 mb-3 p-5 bg-white dark:bg-gray-800 rounded-3 shadow-sm border dark:border-gray-700 lift-on-hover transition-all">
                <div className="bg-success bg-gradient rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-lg" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-telephone-fill text-white fs-5"></i>
                </div>
                <div>
                  <p className="mb-1 fw-bold text-gray-900 dark:text-gray-100 fs-5">Phone</p>
                  <a href="tel:+917648900169" className="mb-0 text-primary fw-semibold text-decoration-none hover:text-purple-600 dark:hover:text-purple-400">
                    +91 7648900169
                  </a>
                </div>
              </div>

              {/* Availability Card */}
              <div className="p-5 bg-gradient-primary dark:bg-gradient-purple rounded-3 shadow-lg lift-on-hover mt-4 bg-white">
                <h4 className="fw-bold h5 mb-3">Best time to reach</h4>
                <p className="small mb-0 opacity-90">Monday - Friday, 9AM - 6PM IST</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="bg-white dark:bg-gray-800 p-5 p-lg-6 rounded-3 shadow-xl dark:shadow-2xl dark:border dark:border-gray-700">
              {status && (
                <div className={`p-4 rounded-3 mb-5 text-center fw-semibold small transition-all ${
                  status.includes('success') 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-600 shadow-md' 
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-600 shadow-md'
                }`}>
                  <i className={`bi fs-4 me-2 ${status.includes('success') ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger'}`}></i>
                  {status}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control form-control-lg border-0 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-2 p-4 focus:ring-2 focus:ring-primary focus:border-primary w-100 transition-all"
                    placeholder="Full Name"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control form-control-lg border-0 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-2 p-4 focus:ring-2 focus:ring-primary focus:border-primary w-100 transition-all"
                    placeholder="Email Address"
                  />
                </div>

                <div className="mb-5">
                  <textarea
                    name="message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control border-0 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-2 p-4 focus:ring-2 focus:ring-primary focus:border-primary w-100 transition-all resize-vertical"
                    placeholder="Tell me about your project... I'm all ears!"
                    style={{ minHeight: '120px' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 py-4 rounded-2 fw-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all bg-gradient-primary dark:bg-gradient-purple text-white border-0 lift-on-hover"
                  disabled={status === 'Sending...'}
                >
                  {status === 'Sending...' ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message 🚀'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
