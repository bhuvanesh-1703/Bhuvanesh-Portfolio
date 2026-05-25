import { Code, Heart } from 'lucide-react';
import { NAV_LINKS, CONTACT } from '../data/portfolio';
import { Github, Linkedin, Mail } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  const SOCIALS = [
    { icon: Github, href: CONTACT.github, label: 'GitHub' },
    { icon: Linkedin, href: CONTACT.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${CONTACT.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative bg-bg-primary border-t border-border-subtle py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-terracotta to-accent-sage flex items-center justify-center">
              <Code size={16} className="text-bg-primary stroke-[2.5]" />
            </div>
            <span className="text-text-secondary font-display font-bold text-sm">Bhuvanesh</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center gap-6 justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="text-text-tertiary hover:text-accent-terracotta text-sm transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-bg-secondary border border-border-subtle hover:border-accent-terracotta/30 text-text-tertiary hover:text-accent-terracotta transition-all duration-150"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-tertiary text-xs">
            © {year} Bhuvanesh. All rights reserved.
          </p>
          <p className="text-text-tertiary text-xs flex items-center gap-1.5">
            Built with React, Vite & Tailwind CSS v4
            <Heart size={11} className="text-accent-terracotta fill-accent-terracotta animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}