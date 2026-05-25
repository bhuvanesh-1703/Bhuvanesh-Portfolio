import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { HERO } from '../data/portfolio';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
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
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? 55 : 90);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, words]);

  return (
    <span className="text-violet-400">
      {words[idx].slice(0, charIdx)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status badge */}
        <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for new opportunities
        </motion.div>

        {/* Name */}
        <motion.div {...fadeUp(0.2)}>
          <p className="text-white/50 text-base tracking-widest uppercase mb-3 font-medium">{HERO.greeting}</p>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mb-4">
            {HERO.name}
          </h1>
        </motion.div>

        {/* Animated role */}
        <motion.div {...fadeUp(0.3)} className="text-2xl md:text-3xl font-semibold text-white/70 mb-6 h-10 flex items-center justify-center">
          <TypeWriter words={HERO.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p {...fadeUp(0.4)} className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          {HERO.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href={HERO.cta.href}
            onClick={(e) => { e.preventDefault(); document.querySelector(HERO.cta.href)?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/30 hover:-translate-y-0.5"
          >
            {HERO.cta.label}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href={HERO.resume.href}
            className="group flex items-center gap-2 px-6 py-3 bg-white/[0.06] hover:bg-white/[0.1] text-white/80 hover:text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download size={16} />
            {HERO.resume.label}
          </a>
        </motion.div>

        {/* Social links */}
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
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/20 text-white/50 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}