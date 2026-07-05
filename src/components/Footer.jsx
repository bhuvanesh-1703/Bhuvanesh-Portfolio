import { Code, Heart } from 'lucide-react';
import { NAV_LINKS, CONTACT } from '../data/portfolio';
import { Github, Linkedin, Mail } from './Icons';
import { scrollToElement } from '../utils';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (e, href) => {
    e.preventDefault();
    scrollToElement(href);
  };

  const SOCIALS = [
    { icon: Github, href: CONTACT.github, label: 'GitHub' },
    { icon: Linkedin, href: CONTACT.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${CONTACT.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative bg-bg-primary border-t border-border-subtle py-12 md:py-16 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a
              href="#"
              onClick={(e) => handleNav(e, '#')}
              className="font-sans text-2xl font-bold tracking-tighter text-text-primary transition-colors hover:text-text-secondary"
            >
              BHUVANESH.
            </a>
            <span className="text-text-secondary font-mono text-[10px] tracking-widest uppercase">
              MERN & Frontend Developer
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center gap-6 justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="font-mono text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors duration-300"
              >
                <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary font-mono text-[10px] uppercase tracking-widest">
            © {year} BHUVANESH. ALL RIGHTS RESERVED.
          </p>
          <p className="text-text-tertiary font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
            BUILT WITH REACT, VITE & TAILWIND
            <Heart size={10} className="text-text-primary fill-text-primary animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}
