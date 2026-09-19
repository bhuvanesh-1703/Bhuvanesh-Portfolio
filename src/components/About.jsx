import { motion, useReducedMotion } from "framer-motion";
import { ABOUT } from "../data/portfolio";
import { SectionWrapper } from "./DesignSystem";

export default function About() {
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <SectionWrapper id="about" hasBackground={false}>
      <div className="cinema-section max-w-[1400px] mx-auto py-24 md:py-32 lg:py-40 px-5 sm:px-10 md:px-16 lg:px-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="cinema-kicker text-accent">01 — ABOUT</span>
            <h2 className="cinema-display text-6xl sm:text-7xl md:text-9xl mt-4 text-white font-display tracking-wide">
              WHO I AM
            </h2>
          </div>
          <span className="cinema-kicker hidden md:block text-white/50">
            BUILD / ARCHITECT / SHIP
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 md:gap-20 py-12 border-t border-white/10">
          <motion.h3
            {...motionProps}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white/95 font-body font-normal"
          >
            {ABOUT.intro}
          </motion.h3>

          <motion.div
            {...motionProps}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/65 text-base md:text-lg leading-relaxed font-body"
          >
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="mb-6">
                {p}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10 mt-8">
              {ABOUT.stats.map((s) => (
                <div key={s.label} className="group">
                  <div className="cinema-display text-5xl md:text-6xl text-accent font-display tracking-wider group-hover:scale-105 transition-transform origin-left duration-300">
                    {s.value}
                  </div>
                  <div className="cinema-kicker mt-2 text-white/70 font-mono">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
