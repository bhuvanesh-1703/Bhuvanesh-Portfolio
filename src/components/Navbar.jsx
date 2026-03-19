import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import '../css/Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#education', label: 'Education' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: portfolioData.hero.resumePath, label: 'Resume', download: true },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <a href="#home" className="navbar__brand" onClick={(e) => handleLinkClick(e, '#home')}>
          &lt;Bhuvanesh /&gt;
        </a>
        <button className="navbar__toggler" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>
        <ul className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                className="navbar__link" 
                onClick={(e) => handleLinkClick(e, link.href)}
                download={link.download}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;