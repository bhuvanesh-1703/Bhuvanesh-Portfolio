import './Skills.css';

function Skills() {
  const categories = [
    {
      title: 'Frontend',
      icon: 'bi-window-stack',
      items: [
        { name: 'HTML', icon: 'bi-filetype-html' },
        { name: 'CSS', icon: 'bi-filetype-css' },
        { name: 'JavaScript', icon: 'bi-filetype-js' },
        { name: 'React', icon: 'bi-filetype-jsx' },
        { name: 'Bootstrap', icon: 'bi-bootstrap' },
      ]
    },
    {
      title: 'Backend',
      icon: 'bi-hdd-rack',
      items: [
        { name: 'Node.js', icon: 'bi-node-plus' },
        { name: 'Express.js', icon: 'bi-server' },
      ]
    },
    {
      title: 'Database',
      icon: 'bi-database',
      items: [
        { name: 'MongoDB', icon: 'bi-database-fill' },
        { name: 'SQL', icon: 'bi-table' },
      ]
    },
    {
      title: 'Tools',
      icon: 'bi-tools',
      items: [
        { name: 'Git', icon: 'bi-git' },
        { name: 'Postman', icon: 'bi-send' },
      ]
    }
  ];

  return (
    <section id="skills" className="skills section section--alt">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="title-underline"></div>
        
        {categories.map((cat) => (
          <div key={cat.title} className="skills__category">
            <h3 className="skills__category-title mt-5">
              <i className={`bi ${cat.icon} me-2`}></i>{cat.title}
            </h3>
            <div className="skills__grid">
              {cat.items.map((skill) => (
                <div key={skill.name} className="skill-card glass-card">
                  <i className={`bi ${skill.icon} skill-card__icon`}></i>
                  <span className="skill-card__name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
