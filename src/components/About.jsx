import { motion } from 'framer-motion';
import { Layers, Cpu, Globe } from 'lucide-react';
import { ABOUT } from '../data/portfolio';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const PILLARS = [
  {
    icon: Layers,
    title: 'Full-Stack Integration',
    desc: 'Connecting API routes to database schemas and binding them with clean, reactive state management in the frontend.',
    color: 'terracotta',
  },
  {
    icon: Cpu,
    title: 'Performance & Flow',
    desc: 'Optimizing rendering bottlenecks, responsive image delivery, and lazy-loading modules for fluid user experiences.',
    color: 'sage',
  },
  {
    icon: Globe,
    title: 'Functional Deployments',
    desc: 'Focusing on production requirements: request validation, environment configuration, and clean error handling.',
    color: 'sand',
  },
];

const colorMap = {
  terracotta: {
    bg: 'bg-accent-terracotta/[0.06]',
    border: 'border-accent-terracotta/20 hover:border-accent-terracotta/30',
    icon: 'text-accent-terracotta',
    glow: 'hover:shadow-accent-terracotta/[0.03]',
  },
  sage: {
    bg: 'bg-accent-sage/[0.06]',
    border: 'border-accent-sage/20 hover:border-accent-sage/30',
    icon: 'text-accent-sage',
    glow: 'hover:shadow-accent-sage/[0.03]',
  },
  sand: {
    bg: 'bg-accent-sand/[0.06]',
    border: 'border-accent-sand/20 hover:border-accent-sand/30',
    icon: 'text-accent-sand',
    glow: 'hover:shadow-accent-sand/[0.03]',
  },
};

export default function About() {
  return (
    <section id="about" className="py-24 md:py-28 relative bg-bg-primary">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-accent-sage/3 rounded-full blur-[90px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <p className="text-accent-terracotta text-xs font-semibold tracking-[3px] uppercase mb-4 font-mono">
            About Me
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Building for the real world
          </h2>
          <div className="w-12 h-1 bg-accent-terracotta rounded-full mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Text & Stats */}
          <div>
            <motion.p {...fadeUp(0.1)} className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
              {ABOUT.intro}
            </motion.p>
            {ABOUT.paragraphs.map((p, i) => (
              <motion.p key={i} {...fadeUp(0.15 + i * 0.08)} className="text-text-secondary/70 text-sm leading-relaxed mb-5">
                {p}
              </motion.p>
            ))}

            {/* Stats row */}
            <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-8 sm:gap-12 mt-10 pt-8 border-t border-border-subtle">
              {ABOUT.stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <p className="text-3xl font-display font-extrabold text-text-primary">{value}</p>
                  <p className="text-text-tertiary text-xs font-mono uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Pillars */}
          <div className="flex flex-col gap-4">
            {PILLARS.map(({ icon: Icon, title, desc, color }, i) => {
              const c = colorMap[color];
              return (
                <motion.div
                  key={title}
                  {...fadeUp(0.15 + i * 0.1)}
                  className={`group p-5 rounded-2xl bg-bg-secondary border border-border-subtle ${c.border} transition-all duration-300 shadow-md ${c.glow} hover:-translate-y-0.5`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon size={18} className={c.icon} />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-display font-semibold text-sm sm:text-base mb-1.5">{title}</h3>
                      <p className="text-text-secondary/70 text-xs sm:text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}