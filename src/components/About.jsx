import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Cpu, Globe } from 'lucide-react';
import { ABOUT } from '../data/portfolio';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const PILLARS = [
  {
    icon: Layers,
    title: 'Full-Stack Architecture',
    desc: 'Designing end-to-end systems with clean separation of concerns, from database schema to UI state.',
    color: 'violet',
  },
  {
    icon: Cpu,
    title: 'Performance-First',
    desc: 'Every application I build is optimized for speed — lazy loading, caching strategies, and lean bundles.',
    color: 'emerald',
  },
  {
    icon: Globe,
    title: 'Production-Ready Code',
    desc: 'Shipping real applications with auth, payments, CI/CD, and monitoring — not just side projects.',
    color: 'amber',
  },
];

const colorMap = {
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    icon: 'text-violet-400',
    glow: 'shadow-violet-500/10',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: 'text-amber-400',
    glow: 'shadow-amber-500/10',
  },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-28 relative bg-[#0a0a0f]" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Building for the real world
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div>
            <motion.p {...fadeUp(0.1)} className="text-white/60 text-lg leading-relaxed mb-6">
              {ABOUT.intro}
            </motion.p>
            {ABOUT.paragraphs.map((p, i) => (
              <motion.p key={i} {...fadeUp(0.15 + i * 0.08)} className="text-white/45 leading-relaxed mb-5">
                {p}
              </motion.p>
            ))}

            {/* Stats row */}
            <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-white/[0.07]">
              {ABOUT.stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl font-bold text-white">{value}</p>
                  <p className="text-white/40 text-sm mt-0.5">{label}</p>
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
                  className={`group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 shadow-xl ${c.glow}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon size={18} className={c.icon} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1.5">{title}</h3>
                      <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
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