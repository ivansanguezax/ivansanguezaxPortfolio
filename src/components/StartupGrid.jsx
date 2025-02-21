import React, { useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dfgjenml4/image/upload/v1739065717/u62fzkyl8mtaumucvb7n.png",
    url: "https://www.seiff.cl/",
    hasWebsite: true
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dfgjenml4/image/upload/v1739065717/z5euv0mo6kvcs0b8djdc.png",
    url: "https://tufavorcito.com/",
    hasWebsite: true
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dfgjenml4/image/upload/v1739065717/ewyttkkn7lfkopujkavh.png",
    url: "",
    hasWebsite: false
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dfgjenml4/image/upload/v1739065881/tby9f7eyl4jviquzaddk.png",
    url: "https://bucle.vc/",
    hasWebsite: true
  }
];

const StartupGrid = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-[#F5F5F0] px-10 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Title Section with slide-in animation */}
          <div className={`md:w-1/3 mb-8 md:mb-0 text-center md:text-left transform transition-all duration-1000 ease-out
            ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
<h2 className="text-2xl md:text-3xl font-light leading-tight text-emerald-800">
  +4 Years Leading 
  <br />
  Successful Startups
</h2>
          </div>

          {/* Logos Grid with fade-in animation */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`relative group flex items-center justify-center transform transition-all duration-700 ease-out
                    ${isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-full opacity-0'}`}
                  style={{ transitionDelay: `${index * 200 + 500}ms` }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {project.hasWebsite ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full max-w-[200px]"
                    >
                      <img
                        src={project.image}
                        alt={`Project ${project.id}`}
                        className={`w-full h-auto transition-all duration-300 ${
                          hoveredId === project.id || window.innerWidth <= 768
                            ? ''
                            : 'grayscale'
                        }`}
                      />
                    </a>
                  ) : (
                    <img
                      src={project.image}
                      alt={`Project ${project.id}`}
                      className={`w-full h-auto max-w-[200px] transition-all duration-300 ${
                        hoveredId === project.id || window.innerWidth <= 768
                          ? ''
                          : 'grayscale'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupGrid;