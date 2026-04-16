import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-white dark:bg-slate-900 transition-colors duration-300 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
          Hi, I&apos;m <span className="text-indigo-600">Ajay</span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-500 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Full-Stack MERN Developer | Building scalable web applications with modern technologies
        </motion.p>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-12 text-lg md:text-xl"
        >
          <div>
            <span className="font-bold text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400">50+</span>
            <div className="text-gray-600 dark:text-gray-300">Projects</div>
          </div>
          <div>
            <span className="font-bold text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400">3+</span>
            <div className="text-gray-600 dark:text-gray-300">Years Exp</div>
          </div>
          <div>
            <span className="font-bold text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400">100%</span>
            <div className="text-gray-600 dark:text-gray-300">Satisfaction</div>
          </div>
        </motion.div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <div className="animate-bounce mt-12">
        <svg className="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
