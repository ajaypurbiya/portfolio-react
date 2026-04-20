import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React.js", "Redux", "Tailwind CSS", "HTML5/CSS3", "JavaScript (ES6+)"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "JWT Auth"]
    },
    {
      title: "Tools & Others",
      skills: ["Git & GitHub", "Postman", "Vercel/Netlify", "Prisma", "Responsive Design"]
    }
  ];

  return (
    <section id="skills" className="page-section bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">
            Technical Skills
          </h2>
          <p className="lead text-muted">
            My technical toolkit for building scalable web applications.
          </p>
        </div>

        <div className="portfolio-card p-4 p-md-5">
          <div className="row g-5">
            {skillCategories.map((category, index) => (
              <div key={index} className="col-lg-4">
                <h3 className="h4 fw-bold text-primary mb-4">{category.title}</h3>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                  {category.skills.map((skill, sIndex) => (
                    <li key={sIndex} className="d-flex align-items-center text-muted fw-medium">
                      <i className="bi bi-check2-circle text-primary me-3 fs-5"></i>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;