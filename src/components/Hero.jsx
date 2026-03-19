import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio.js';
import '../css/Hero.css';

function Hero() {
  const { hero } = portfolioData;
  const [roleText, setRoleText] = useState('');
  const fullRole = hero.role;
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setRoleText(fullRole.slice(0, index + 1));
      index++;
      if (index >= fullRole.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [fullRole]);

  return (
    <section id="home" className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__text">
            <p className="hero__greeting">{hero.greeting}</p>
            <h1 className="hero__name">{hero.name}</h1>
            <h2 className="hero__role">{roleText}<span className="hero__cursor">|</span></h2>
            <p className="hero__tagline">{hero.tagline}</p>
            <div className="hero__buttons">
              <a href="#projects" className="btn-accent">
                <i className="bi bi-folder2-open"></i> View Projects
              </a>
              <a href={hero.resumePath} download="Bhuvanesh_Resume.pdf" className="btn-outline-accent">
                <i className="bi bi-download"></i> Resume
              </a>
              <a href="#contact" className="btn-outline-accent">
                <i className="bi bi-envelope"></i> Contact Me
              </a>
            </div>
          </div>

          <div className="hero__graphic">
            <div className="code-window">
              <div className="code-window__header">
                <span className="code-window__dot code-window__dot--red"></span>
                <span className="code-window__dot code-window__dot--yellow"></span>
                <span className="code-window__dot code-window__dot--green"></span>
              </div>
              <pre className="code-window__body">
                <code>
                  <span className="syn-kw">const</span> <span className="syn-var">developer</span> = {'{\n'}
                  {'  '}<span className="syn-key">name</span>: <span className="syn-str">"Bhuvanesh"</span>,{'\n'}
                  {'  '}<span className="syn-key">stack</span>: <span className="syn-str">"MERN"</span>,{'\n'}
                  {'  '}<span className="syn-key">passion</span>: <span className="syn-str">"Building Websites"</span>,{'\n'}
                  {'  '}<span className="syn-key">coffee</span>: <span className="syn-bool">true</span>{'\n'}
                  {'};'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
