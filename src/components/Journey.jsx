import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Code, Sparkles } from 'lucide-react';
import { JOURNEY } from '../data/portfolio';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const getMilestoneIcon = (index) => {
  switch (index) {
    case 0:
      return GraduationCap;
    case 1:
      return GraduationCap;
    case 2:
      return BookOpen;
    case 3:
      return Code;
    case 4:
      return Sparkles;
    default:
      return Code;
  }
};

const iconColorMap = [
  'text-accent-terracotta border-accent-terracotta/25 bg-accent-terracotta/[0.04]',
  'text-accent-sage border-accent-sage/25 bg-accent-sage/[0.04]',
  'text-accent-sand border-accent-sand/25 bg-accent-sand/[0.04]',
  'text-accent-terracotta border-accent-terracotta/25 bg-accent-terracotta/[0.04]',
];

export default function Journey() {
  return (
    <section id="journey" className="py-24 md:py-28 relative bg-bg-primary">
      {/* Background blur */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent-terracotta/3 rounded-full blur-[110px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <p className="text-accent-terracotta text-xs font-semibold tracking-[3px] uppercase mb-4 font-mono">
            Trajectory
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Learning Journey
          </h2>
          <div className="w-12 h-1 bg-accent-terracotta rounded-full mt-4" />
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative pl-6 sm:pl-8 border-l border-border-subtle space-y-12">
          {/* Vertical fading timeline bar */}
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-accent-terracotta via-accent-sage/40 to-transparent pointer-events-none" />

          {JOURNEY.map((item, index) => {
            const Icon = getMilestoneIcon(index);
            const styleClass = iconColorMap[index] || iconColorMap[0];
            return (
              <motion.div
                key={index}
                {...fadeUp(index * 0.08)}
                className="relative"
              >
                {/* Timeline Node Dot */}
                <div className={`absolute -left-[39px] sm:-left-[47px] top-1 w-7 h-7 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center ${styleClass} z-10 shadow-sm transition-transform duration-300 hover:scale-110`}>
                  <Icon size={14} className="sm:w-[16px] sm:h-[16px]" />
                </div>

                {/* Milestone Details Card */}
                <div className="p-6 rounded-2xl bg-bg-secondary border border-border-subtle hover:border-accent-terracotta/20 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3.5">
                    <span className="text-xs font-mono font-bold text-accent-terracotta bg-accent-terracotta/10 border border-accent-terracotta/20 px-3 py-1 rounded-full w-fit">
                      {item.period}
                    </span>
                    <span className="text-text-tertiary text-xs font-mono">
                      {item.institution}
                    </span>
                  </div>
                  
                  <h3 className="text-text-primary font-display font-bold text-base sm:text-lg mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
ecommerce