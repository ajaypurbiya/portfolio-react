import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, isAdmin = false, onDelete }) => {
  const imageUrl = project.image 
    ? `http://localhost:5000/${project.image}` 
    : '/placeholder-project.jpg';

  return (
    <motion.div 
      className="col-lg-4 col-md-6 mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card h-100 border-0 shadow-lg hover-shadow-xl rounded-3 position-relative overflow-hidden">
        <div className="position-relative">
          <img 
            src={imageUrl} 
            alt={project.title} 
            className="card-img-top"
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className="position-absolute top-0 end-0 m-3">
            {isAdmin && (
              <button
                onClick={() => onDelete(project._id)}
                className="btn btn-danger btn-sm rounded-circle shadow"
                title="Delete project"
              >
                <i className="bi bi-trash"></i>
              </button>
            )}
          </div>
        </div>
        <div className="card-body d-flex flex-column p-4">
          <h5 className="card-title fw-bold mb-3">{project.title}</h5>
          <p className="card-text flex-grow-1 text-muted">{project.description}</p>
          
          <div className="mb-3">
            {project.techStack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="badge bg-primary bg-opacity-10 text-primary border border-primary me-1 mb-1 px-2 py-1"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="badge bg-secondary text-white">+{project.techStack.length - 4}</span>
            )}
          </div>
          
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-100 mt-auto"
            >
              View Project <i className="bi bi-box-arrow-up-right ms-1"></i>
            </a>
          )}
          
          <small className="text-muted mt-2">
            Created {new Date(project.createdAt).toLocaleDateString()}
          </small>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

