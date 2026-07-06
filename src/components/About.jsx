import { motion } from "framer-motion";
import { ABOUT } from "../data/portfolio";
import { SectionWrapper, SectionHeader, animationConfig } from "./DesignSystem";

export default function About() {
  return (
    <SectionWrapper id="about" hasBackground={true}>
      <SectionHeader title="ABOUT ME" subtitle="Introduction" />
      
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mt-16">
        
        {/* Left Column: Huge typography element */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={animationConfig.fadeUp}
          className="w-full lg:w-1/2 flex flex-col"
        >
          <h3 className="font-serif text-4xl md:text-6xl text-text-primary tracking-wide mb-10 leading-[1.1] font-normal">
            My core philosophy is <span className="italic text-text-secondary">simplicity and scale.</span>
          </h3>
          <p className="font-sans text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            {ABOUT.intro}
          </p>
        </motion.div>

        {/* Right Column: Text block & Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={animationConfig.staggerContainer}
          className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-0"
        >
          {ABOUT.paragraphs.map((p, i) => (
            <motion.p 
              key={i} 
              variants={animationConfig.fadeUp} 
              className="font-sans text-base md:text-lg text-text-secondary leading-relaxed mb-6 font-light"
            >
              {p}
            </motion.p>
          ))}

          {/* Minimal Stats */}
          <motion.div 
            variants={animationConfig.fadeUp}
            className="grid grid-cols-2 gap-x-8 gap-y-12 mt-12 pt-12 border-t border-border-subtle"
          >
            {ABOUT.stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="font-serif text-6xl md:text-7xl font-normal text-white tracking-tight">{value}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        
      </div>
    </SectionWrapper>
  );
}
