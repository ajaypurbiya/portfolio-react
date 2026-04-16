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
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Technical Skills
          </h2>
          <p className="mt-4 text-gray-600">
            My technical toolkit for building scalable web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-colors"
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-6">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill, sIndex) => (
                  <li key={sIndex} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;