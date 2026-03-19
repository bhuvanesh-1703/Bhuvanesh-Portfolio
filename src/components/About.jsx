import { portfolioData } from '../data/portfolio.js';
import '../css/About.css';

function About() {
  const { about } = portfolioData;
  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="title-underline"></div>
        <div className="about__row mt-5">
          <div className="about__card glass-card">
            <div className="about__icons mb-4">
              <span className="about__icon"><i className="bi bi-code-slash"></i></span>
              <span className="about__icon"><i className="bi bi-braces"></i></span>
              <span className="about__icon"><i className="bi bi-terminal"></i></span>
            </div>
            <p className="about__text">
              I'm a passionate <strong>MERN Stack Developer</strong> who enjoys transforming ideas into real-world web applications 
              through clean and efficient code. I specialize in building modern, scalable web solutions — from crafting 
              intuitive user interfaces with <strong>React</strong> to developing robust backend services using 
              <strong>Node.js</strong> and <strong>Express</strong>.
            </p>
            <p className="about__text">
              I love solving real problems with technology and continuously improving my skills by building practical projects 
              and exploring new web technologies. Every project I work on is an opportunity to learn, innovate, and deliver 
              better user experiences.
            </p>
            <p className="about__text">
              Beyond coding, I enjoy experimenting with modern development tools, contributing to meaningful projects, 
              and turning complex challenges into simple, elegant solutions. I believe <strong>great software</strong> is built 
              where creativity meets engineering.
            </p>
            <div className="about__stats mt-4">
              {about.stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;