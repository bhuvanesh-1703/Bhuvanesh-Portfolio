import { motion } from "framer-motion";
import { SKILLS } from "../data/portfolio";
import { SectionWrapper, animationConfig } from "./DesignSystem";
import { useHoveredSkill } from "./SkillContext";

const LEVEL_DOTS = {
  strong: [true, true, true],
  comfortable: [true, true, false],
  learning: [true, false, false],
};

const LEVEL_LABELS = {
  strong: "Shipped in multiple projects",
  comfortable: "Used in production",
  learning: "Currently studying",
};

function ProficiencyDots({ level }) {
  const dots = LEVEL_DOTS[level] || LEVEL_DOTS.learning;
  return (
    <div
      className="flex items-center gap-1"
      title={LEVEL_LABELS[level]}
      aria-label={`Proficiency: ${level}`}
    >
      {dots.map((filled, i) => (
        <span
          key={i}
          className={`w-[6px] h-[6px] rounded-full transition-colors ${
            filled ? "bg-accent-lime" : "bg-border-subtle"
          }`}
        />
      ))}
    </div>
  );
}

function SkillPill({ skill }) {
  const { setHoveredSkill } = useHoveredSkill();

  return (
    <span
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
      className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-border-subtle font-mono text-[10px] md:text-[11px] text-text-secondary tracking-wider uppercase transition-all duration-300 hover:border-accent-lime hover:text-white cursor-default select-none"
    >
      {skill.name}
      <ProficiencyDots level={skill.level} />
    </span>
  );
}

function CategoryCard({ category, index }) {
  return (
    <motion.div
      variants={animationConfig.fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="group p-6 md:p-8 border border-border-subtle bg-bg-secondary/50 hover:bg-bg-secondary hover:border-accent-lime/30 transition-colors duration-300"
    >
      {/* Category label */}
      <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-tertiary mb-5 md:mb-6">
        {category.category}
      </h3>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2">
        {category.items.map((skill) => (
          <SkillPill key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const totalSkills = SKILLS.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <SectionWrapper id="skills" hasBackground={true}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24 mt-12 md:mt-16 relative z-10">
        <motion.div
          variants={animationConfig.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-text-secondary border-b border-border-subtle pb-2 w-fit">
            — TOOLBOX
          </span>
          <h2 className="font-script text-5xl md:text-6xl lg:text-7xl text-text-primary tracking-tight">
            The stack I reach for.
          </h2>
        </motion.div>

        <motion.div
          variants={animationConfig.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-6 pb-2"
        >
          <span className="font-mono text-[10px] md:text-xs text-text-tertiary uppercase tracking-widest">
            {totalSkills} disciplines
          </span>
          {/* Proficiency legend */}
          <div className="hidden sm:flex items-center gap-4 border-l border-border-subtle pl-6">
            {Object.entries(LEVEL_LABELS).map(([level, label]) => (
              <div key={level} className="flex items-center gap-2">
                <ProficiencyDots level={level} />
                <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-wider">
                  {level}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 relative z-10">
        {SKILLS.map((category, i) => (
          <CategoryCard key={category.category} category={category} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
