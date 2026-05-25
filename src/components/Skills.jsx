import { motion } from 'framer-motion';
import { SKILLS } from '../data/portfolio';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-28 relative bg-bg-primary">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-accent-sage/3 rounded-full blur-[80px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <p className="text-accent-terracotta text-xs font-semibold tracking-[3px] uppercase mb-4 font-mono">
            Expertise
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Technical Skillset
          </h2>
          <div className="w-12 h-1 bg-accent-terracotta rounded-full mt-4" />
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map(({ category, items }, catIdx) => {
            return (
              <motion.div
                key={category}
                {...fadeUp(catIdx * 0.06)}
                className="p-6 rounded-2xl bg-bg-secondary border border-border-subtle hover:border-accent-terracotta/20 transition-all duration-300 flex flex-col hover:-translate-y-0.5"
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border-subtle">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta" />
                  <h3 className="text-text-primary font-display font-semibold text-sm sm:text-base">{category}</h3>
                </div>

                {/* Skill badges list */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-bg-primary border border-border-subtle text-text-secondary hover:text-accent-terracotta hover:border-accent-terracotta/25 hover:bg-accent-terracotta/[0.02] transition-all duration-200 select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Currently learning bar */}
        <motion.div 
          {...fadeUp(0.35)} 
          className="mt-8 p-5 rounded-2xl bg-bg-secondary border border-border-subtle flex flex-wrap items-center gap-4 hover:border-accent-sage/25 transition-all duration-300"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-sage/10 border border-accent-sage/20 text-accent-sage text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1 h-1 rounded-full bg-accent-sage animate-ping" />
            Current Focus
          </div>
          <span className="text-text-secondary text-sm">
            Deepening knowledge in:
          </span>
          <div className="flex flex-wrap gap-2">
            {['TypeScript typing pattern', 'PostgreSQL indexes', 'Docker containers', 'Tailwind CSS v4 custom directives'].map((t) => (
              <span 
                key={t} 
                className="px-2.5 py-1 text-xs font-mono font-medium bg-bg-primary border border-border-subtle text-text-secondary rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}