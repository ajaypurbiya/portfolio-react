import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, isAdmin = false, onDelete }) => {
  // Assuming your backend serves static files from an 'uploads' folder
  const imageUrl = project.image 
    ? `http://localhost:5000/${project.image}` 
    : '/placeholder-project.jpg';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-700 transition-colors duration-300">
      <img 
        src={imageUrl} 
        alt={project.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700">
              <h3 className="text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-gray-600 dark:text-slate-400">{project.description}</p>
            </div>
          </div>
          {isAdmin && (
            <button
              onClick={() => onDelete(project._id)}
              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium p-1 -m-1 rounded hover:bg-red-50 dark:hover:bg-red-950/50 transition"
              title="Delete project"
            >
              ✕
            </button>
          )}
        </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-indigo-100 dark:bg-slate-800 text-indigo-800 dark:text-indigo-400 text-sm rounded-full font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
      
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
        >
          View Project →
        </a>
      )}
      
        <p className="text-xs text-gray-400 dark:text-slate-500 mt-4">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>
  </motion.div>
  );

};

export default ProjectCard;
