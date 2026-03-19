import { portfolioData } from '../data/portfolio';
import '../css/Skills.css';

function Skills() {
  const categories = portfolioData.skills;

  return (
    <section id="skills" className="skills section section--alt">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="title-underline"></div>
        
        {categories.map((cat) => (
          <div key={cat.title} className="skills__category">
            <h2 className="section-title section-title--left section-title--sm">
              <i className={`bi ${cat.icon} me-3`}></i>{cat.title}
            </h2>
            <div className="skills__grid">
              {cat.items.map((skill) => (
                <div key={skill.name} className={`skill-card glass-card`}>
                  <div className="skill-card__icon-box">
                    <i className={`bi ${skill.icon}`}></i>
                  </div>
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