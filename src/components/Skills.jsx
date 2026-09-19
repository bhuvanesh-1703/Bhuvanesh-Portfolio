import { motion, useReducedMotion } from "framer-motion";
import { SKILLS } from "../data/portfolio";
import { SectionWrapper } from "./DesignSystem";
import { useHoveredSkill } from "./SkillContext";

function CategoryCard({ category, index }) {
  const { setHoveredSkill } = useHoveredSkill();
  const reduceMotion = useReducedMotion();

  const cardMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: {
          duration: 0.6,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        },
      };

  return (
    <motion.div
      {...cardMotion}
      className="group/card flex flex-col justify-between p-6 sm:p-7 border border-white/10 bg-[#080808] hover:border-accent/40 transition-colors duration-300 shadow-lg h-full"
    >
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <span className="font-mono text-accent font-bold text-xs tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase font-normal group-hover/card:text-accent transition-colors duration-200">
            {category.category}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {category.items.map((skill) => (
            <span
              key={skill.name}
              onMouseEnter={() => setHoveredSkill?.(skill.name)}
              onMouseLeave={() => setHoveredSkill?.(null)}
              className="px-3.5 py-1.5 rounded-none border border-white/15 bg-white/[0.02] font-mono text-[11px] uppercase tracking-wider text-white/70 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-200 cursor-pointer shadow-sm"
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
      <div className="cinema-section">
        <div className="flex items-end justify-between gap-6 mb-16">
          <div>
            <span className="cinema-kicker text-accent">02 — TOOLBOX</span>
            <h2 className="cinema-display text-5xl sm:text-6xl md:text-8xl mt-4 text-white font-display tracking-wide">
              MY STACK
            </h2>
          </div>
          <span className="cinema-kicker hidden md:block text-white/50 font-mono">
            {totalTools} TOOLS &amp; SYSTEMS
          </span>
        </div>

        {/* 6-Category Grid with equal height stretch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SKILLS.map((category, index) => (
            <CategoryCard
              key={category.category}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
