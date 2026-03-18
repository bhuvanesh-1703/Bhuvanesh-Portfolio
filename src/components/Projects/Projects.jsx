import './Projects.css';

function Projects() {
  const projects = [
    {
      title: 'E-Commerce Web Application',
      icon: 'bi-cart4',
      desc: 'A full-featured online shopping platform with complete user authentication, product catalog, shopping cart, and order management system.',
      features: [
        'Product listing & search',
        'Add to cart & checkout',
        'User authentication & authorization',
        'Order management dashboard'
      ],
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      github: '#',
      live: '#'
    },
    {
      title: 'Farmer Multi-Vendor Platform',
      icon: 'bi-shop',
      desc: 'A platform connecting farmers directly with customers, enabling location-based product discovery and eliminating middlemen from the supply chain.',
      features: [
        'Farmers can add & manage products',
        'Customers view nearby products',
        'Direct farmer-to-customer supply',
        'Location-based product viewing'
      ],
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="title-underline"></div>
        <div className="projects__grid mt-5">
          {projects.map((project, index) => (
            <div key={index} className="project-card glass-card">
              <div className="project-card__header">
                <i className={`bi ${project.icon} project-card__icon`}></i>
                <h3 className="project-card__title">{project.title}</h3>
              </div>
              <p className="project-card__desc">{project.desc}</p>
              <ul className="project-card__features">
                {project.features.map((feature, fIndex) => (
                  <li key={fIndex}>
                    <i className="bi bi-check-circle-fill"></i>{feature}
                  </li>
                ))}
              </ul>
              <div className="project-card__tech">
                {project.tech.map((t, tIndex) => (
                  <span key={tIndex} className="tech-badge">{t}</span>
                ))}
              </div>
              <div className="project-card__links mt-4">
                <a href={project.github} className="btn-accent btn-sm">
                  <i className="bi bi-github"></i> GitHub
                </a>
                <a href={project.live} className="btn-outline-accent btn-sm">
                  <i className="bi bi-box-arrow-up-right"></i> Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
