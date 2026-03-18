import { useEffect, useRef } from 'react';
import './Hero.css';

function Hero() {
  const typedRef = useRef(null);

  useEffect(() => {
    const roles = ['MERN Stack Developer', 'Full Stack Developer', 'React Developer', 'Node.js Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout;

    function type() {
      const current = roles[roleIndex];
      if (!deleting) {
        if (typedRef.current) typedRef.current.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          timeout = setTimeout(type, 1500);
          return;
        }
      } else {
        if (typedRef.current) typedRef.current.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      timeout = setTimeout(type, deleting ? 40 : 80);
    }
    type();
    return () => clearTimeout(timeout);
  }, []);

  // Create particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <section id="home" className="hero">
      <div className="hero__particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="hero__particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__text">
            <p className="hero__greeting">👋 Hello, I'm</p>
            <h1 className="hero__name">Bhuvanesh</h1>
            <h2 className="hero__role">
              <span ref={typedRef}></span>
              <span className="hero__cursor">|</span>
            </h2>
            <p className="hero__tagline">I build modern full stack web applications.</p>
            <div className="hero__buttons">
              <a href="#projects" className="btn-accent">
                <i className="bi bi-folder2-open"></i> View Projects
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
                  {'  '}<span className="syn-key">passion</span>: <span className="syn-str">"Building Apps"</span>,{'\n'}
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
