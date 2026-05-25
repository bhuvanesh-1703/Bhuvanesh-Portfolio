import { motion } from 'framer-motion';
import { SKILLS } from '../data/portfolio';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const CATEGORY_COLORS = {
  Frontend: { bar: 'from-violet-500 to-indigo-500', dot: 'bg-violet-500' },
  Backend: { bar: 'from-emerald-500 to-teal-500', dot: 'bg-emerald-500' },
  'Database & Cloud': { bar: 'from-sky-500 to-cyan-500', dot: 'bg-sky-500' },
  'Tools & Workflow': { bar: 'from-amber-500 to-orange-500', dot: 'bg-amber-500' },
};

function SkillBar({ name, level, barClass, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-white/70 text-sm">{name}</span>
        <span className="text-white/35 text-xs tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barClass}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative bg-[#0a0a0f]">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/3 w-[350px] h-[350px] bg-emerald-600/6 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Technical Skills
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map(({ category, items }, catIdx) => {
            const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Frontend'];
            return (
              <motion.div
                key={category}
                {...fadeUp(catIdx * 0.08)}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
              >
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-6">
                  <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <h3 className="text-white font-semibold text-sm">{category}</h3>
                </div>

                {/* Skill bars */}
                <div className="flex flex-col gap-4">
                  {items.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      barClass={colors.bar}
                      delay={catIdx * 0.08 + i * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Currently learning */}
        <motion.div {...fadeUp(0.45)} className="mt-10 p-5 rounded-2xl bg-violet-600/[0.06] border border-violet-500/15 flex flex-wrap items-center gap-3">
          <span className="text-violet-400 text-sm font-medium">Currently Exploring →</span>
          {['Next.js 15', 'tRPC', 'Kubernetes', 'GraphQL', 'Rust (basics)'].map((t) => (
            <span key={t} className="px-3 py-1 text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-full">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}