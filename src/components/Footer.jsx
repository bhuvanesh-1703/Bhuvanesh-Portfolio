import { Heart } from 'lucide-react';
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
    <footer className="relative bg-[#050505] border-t border-white/10 py-16 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 md:px-16 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a
              href="#"
              onClick={(e) => handleNav(e, '#')}
              className="cinema-display text-4xl font-display tracking-wider text-white transition-colors hover:text-accent focus-visible:outline-none"
            >
              BHUVANESH.
            </a>
            <span className="text-white/50 font-mono text-[10px] tracking-widest uppercase">
              Full-Stack Engineer · MERN &amp; AI
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center gap-8 justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="font-mono text-xs tracking-widest uppercase text-white/65 hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center text-muted hover:text-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                <Icon size={18} className="transition-transform duration-200 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-hairline flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted font-mono text-[11px] uppercase tracking-widest">
            © {year} BHUVANESH. ALL RIGHTS RESERVED.
          </p>
          <p className="text-muted font-mono text-[11px] uppercase tracking-widest flex items-center gap-2">
            BUILT WITH REACT, VITE &amp; TAILWIND
            <Heart size={11} className="text-accent fill-accent animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}
