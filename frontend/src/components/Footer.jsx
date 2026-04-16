import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo/Name */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-indigo-400">AP.dev</h2>
            <p className="text-gray-400 mt-2 text-sm">
              MERN Stack Developer based in Bhopal.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#home" className="text-gray-400 hover:text-white transition">Home</a>
            <a href="#projects" className="text-gray-400 hover:text-white transition">Projects</a>
            <a href="#skills" className="text-gray-400 hover:text-white transition">Skills</a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-5">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400 transition">
              <span className="sr-only">GitHub</span>
              {/* You can replace this with a GitHub SVG icon later */}
              GH
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400 transition">
              <span className="sr-only">LinkedIn</span>
              LI
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Ajay Purbiya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;