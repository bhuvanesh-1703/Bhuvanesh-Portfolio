import { portfolioData } from "../data/portfolio.js";
import "../css/Education.css";

function Education() {
  const educationData = portfolioData.education;

  return (
    <section id="education" className="education section">
      <div className="container">
        <p className="section-subtitle">MY BACKGROUND</p>
        <h2 className="section-title section-title--left">
          Education & Certifications
        </h2>
        <div className="title-underline title-underline--left"></div>

        <div className="education__grid mt-5">
          {educationData.map((item, index) => (
            <div key={index} className={`education-card glass-card`}>
              <div
                className={`education-card__icon-box education-card__icon-box--${item.type}`}
              >
                <i className={`bi ${item.icon}`}></i>
              </div>
              <h3 className="education-card__degree">{item.degree}</h3>
              <p className="education-card__college">{item.college}</p>
              <div className="education-card__period">
                {item.period}
                <div className="education-card__period-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
