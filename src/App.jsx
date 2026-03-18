import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './index.css';

function App() {
  useEffect(() => {
    // Basic Intersection Observer for reveal animation
    const observerOptions = {
      threshold: 0.15,
    };

    const revealElements = document.querySelectorAll('.glass-card, .section-title, .title-underline, .skills__category-title');
    
    revealElements.forEach(el => el.style.opacity = '0');
    revealElements.forEach(el => el.style.transform = 'translateY(30px)');
    revealElements.forEach(el => el.style.transition = 'opacity 0.7s ease, transform 0.7s ease');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
