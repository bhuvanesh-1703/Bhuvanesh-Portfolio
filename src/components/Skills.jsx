import { motion } from "framer-motion";
import { SKILLS } from "../data/portfolio";
import { SectionWrapper, animationConfig } from "./DesignSystem";

export default function Skills() {
  const allSkills = SKILLS.flatMap((cat) => cat.items);

  return (
    <SectionWrapper id="skills" hasBackground={true}>
      
      {/* Header matching reference */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-32 mt-12 md:mt-16 relative z-10">
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
        
        <motion.span 
          variants={animationConfig.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-mono text-[10px] md:text-xs text-text-tertiary uppercase tracking-widest pb-2"
        >
          {allSkills.length} disciplines
        </motion.span>
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden flex items-center bg-transparent py-12 md:py-24 border-y border-border-subtle">
        
        {/* Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex w-fit items-center gap-12 md:gap-24 whitespace-nowrap pl-12 md:pl-24"
          animate={{ x: [0, "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {/* Render all skills twice for seamless loop */}
          {[...allSkills, ...allSkills].map((skill, index) => (
            <div key={index} className="flex items-center gap-12 md:gap-24">
              <span className="font-script italic text-6xl sm:text-7xl md:text-8xl lg:text-[110px] text-text-primary tracking-tight pr-4">
                {skill}
              </span>
              <span className="text-3xl md:text-5xl text-[#e07a5f]">♦</span>
            </div>
          ))}
        </motion.div>
      </div>

    </SectionWrapper>
  );
}
