import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import ProjectCard from '../components/ProjectCard';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get('/projects'); // Uses axios baseURL
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow pt-16">
        <Hero />
        <Skills />
        <section id="projects" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Featured Projects
              </h2>
              <div className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                A showcase of my latest work in MERN stack development.
              </div>
            </div>

            {loading ? (
              <div className="text-center text-gray-600">Loading projects...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.length > 0 ? (
                  projects.map((proj) => (
                    <ProjectCard 
                      key={proj._id} 
                      project={proj} 
                      isAdmin={false} // Users cannot delete projects
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500 italic">
                    No projects added yet. Check back soon!
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
