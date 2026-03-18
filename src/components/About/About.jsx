import './About.css';

function About() {
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
              I'm a passionate <strong>MERN Stack Developer</strong> who loves turning ideas into reality through clean, efficient code. 
              I enjoy building real-world web applications — from crafting intuitive user interfaces with <strong>React</strong> 
              to architecting robust back-end services with <strong>Node.js</strong> and <strong>Express</strong>. 
              Every project is an opportunity for me to learn, grow, and solve meaningful problems.
            </p>
            <p className="about__text">
              When I'm not coding, you'll find me exploring the latest web technologies, contributing to open-source projects, 
              and turning complex challenges into elegant, user-friendly solutions. I believe great software is built at the 
              intersection of creativity and engineering.
            </p>
            <div className="about__stats mt-4">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Passion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
