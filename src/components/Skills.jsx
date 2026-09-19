import { motion, useReducedMotion } from "framer-motion";
import { SKILLS } from "../data/portfolio";
import { SectionWrapper } from "./DesignSystem";
import { useHoveredSkill } from "./SkillContext";

function SkillRow({ category, index }) {
  const { setHoveredSkill } = useHoveredSkill();
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <motion.div
      {...motionProps}
      className="group grid grid-cols-[60px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12 py-10 border-t border-white/10 hover:border-accent/40 transition-colors duration-300"
    >
      <span className="cinema-kicker text-accent pt-2 font-mono font-bold text-sm">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="cinema-display text-4xl sm:text-5xl md:text-7xl text-white/95 group-hover:text-accent transition-colors duration-300 font-display">
          {category.category}
        </h3>
        <div className="flex flex-wrap gap-2.5 mt-6">
          {category.items.map((skill) => (
            <span
              key={skill.name}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.02] font-mono text-[11px] uppercase tracking-widest text-white/70 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-200 cursor-pointer shadow-sm"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const totalTools = SKILLS.reduce((a, c) => a + c.items.length, 0);

  return (
    <SectionWrapper id="skills" hasBackground={false}>
      <div className="max-w-[1400px] mx-auto py-24 md:py-32 lg:py-40 px-5 sm:px-10 md:px-16 lg:px-20">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <span className="cinema-kicker text-accent">02 — TOOLBOX</span>
            <h2 className="cinema-display text-6xl sm:text-7xl md:text-9xl mt-4 text-white font-display tracking-wide">
              MY STACK
            </h2>
          </div>
          <span className="cinema-kicker hidden md:block text-white/50 font-mono">
            {totalTools} TOOLS / SYSTEMS
          </span>
        </div>
        <div>
          {SKILLS.map((category, index) => (
            <SkillRow key={category.category} category={category} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
