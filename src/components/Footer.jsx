import { motion } from 'framer-motion';
import { Code2, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { NAV_LINKS } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080810] border-t border-white/[0.06] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Code2 size={14} className="text-white" />
            </div>
            <span className="text-white/70 font-medium">Bhuvanesh</span>
          </div>

          {/* Nav */}
          <ul className="flex flex-wrap items-center gap-5 justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-white/35 hover:text-white/70 text-sm transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: 'https://github.com/bhuvanesh', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/bhuvanesh', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:bhuvanesh@email.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/35 hover:text-white/70 transition-all duration-150"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {year} Bhuvanesh. All rights reserved.
          </p>
          <p className="text-white/25 text-xs flex items-center gap-1.5">
            Built with React, Vite & Tailwind CSS
            <Heart size={11} className="text-violet-500 fill-violet-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}