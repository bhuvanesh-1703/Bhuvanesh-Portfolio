import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ArrowRight } from 'lucide-react';
import { HERO } from '../data/portfolio';
import { Github, Linkedin, Mail } from './Icons';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (charIdx > 0) {
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, words]);

  return (
    <span className="text-accent-terracotta">
      {words[idx].slice(0, charIdx)}
      <span className="animate-pulse ml-0.5 font-light">|</span>
    </span>
  );
}

export default function Hero() {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.querySelector(HERO.cta.href);
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20 pb-28" id="home">
      {/* Premium earthy background grids and blur fields */}
      <div className="absolute inset-0 bg-bg-primary">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-terracotta/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-accent-sage/4 rounded-full blur-[100px] pointer-events-none" />
        {/* Fine background grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status badge */}
        <motion.div 
          {...fadeUp(0.1)} 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-sage/[0.06] border border-accent-sage/20 text-accent-sage text-xs font-mono mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-sage animate-pulse" />
          Available for new opportunities
        </motion.div>

        {/* Introduction */}
        <motion.div {...fadeUp(0.2)}>
          <p className="text-text-tertiary text-sm tracking-[3px] uppercase mb-4 font-mono font-bold">
            {HERO.greeting}
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold text-text-primary tracking-tight leading-none mb-6">
            {HERO.name}
          </h1>
        </motion.div>

        {/* Typewriter role selection */}
        <motion.div 
          {...fadeUp(0.3)} 
          className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-text-secondary mb-6 h-10 flex items-center justify-center"
        >
          <TypeWriter words={HERO.roles} />
        </motion.div>

        {/* Professional tag description */}
        <motion.p 
          {...fadeUp(0.4)} 
          className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10"
        >
          {HERO.tagline}
        </motion.p>

        {/* Core Actions */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href={HERO.cta.href}
            onClick={handleScrollToProjects}
            className="group flex items-center gap-2 px-5 py-3 bg-accent-terracotta hover:bg-accent-terracotta/90 text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 shadow-md shadow-accent-terracotta/10 hover:shadow-lg hover:shadow-accent-terracotta/15 hover:-translate-y-0.5 cursor-pointer"
          >
            {HERO.cta.label}
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href={HERO.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-3 bg-white/[0.03] hover:bg-white/[0.06] text-text-primary font-semibold text-sm rounded-xl border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Download size={15} className="text-text-secondary group-hover:text-text-primary transition-colors" />
            {HERO.resume.label}
          </a>
        </motion.div>

        {/* Social connections */}
        <motion.div {...fadeUp(0.6)} className="flex items-center justify-center gap-3">
          {[
            { icon: Github, href: HERO.social.github, label: 'GitHub' },
            { icon: Linkedin, href: HERO.social.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: HERO.social.email, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-border-subtle hover:border-accent-terracotta/30 text-text-tertiary hover:text-accent-terracotta transition-all duration-300 hover:-translate-y-0.5"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Down Scroll Anchor Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-tertiary text-[10px] font-mono tracking-widest uppercase"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-accent-terracotta" />
        </motion.div>
      </motion.div>
    </section>
  );
}