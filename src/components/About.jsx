import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ABOUT } from "../data/portfolio";
import { SectionWrapper } from "./DesignSystem";

function StatCounter({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();

  const numeric = parseInt(value, 10) || 0;
  const suffix = value.replace(/^[0-9]+/, "") || "+";

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 45, damping: 18 });
  const displayVal = useTransform(springVal, (current) => `${Math.round(current)}${suffix}`);

  useEffect(() => {
    if (inView) {
      motionVal.set(numeric);
    }
  }, [inView, motionVal, numeric]);

  return (
    <div ref={ref} className="group">
      <div className="cinema-display text-6xl sm:text-7xl md:text-8xl text-accent font-display tracking-wider group-hover:scale-105 transition-transform origin-left duration-300">
        {reduceMotion ? (
          `${numeric}${suffix}`
        ) : (
          <motion.span>{displayVal}</motion.span>
        )}
      </div>
      <div className="cinema-kicker mt-2 text-white/70 font-mono">
        {label}
      </div>
    </div>
  );
}

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
      <div className="cinema-section">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="cinema-kicker text-accent">01 — ABOUT</span>
            <h2 className="cinema-display text-5xl sm:text-6xl md:text-8xl mt-4 text-white font-display tracking-wide">
              WHO I AM
            </h2>
          </div>
          <span className="cinema-kicker hidden md:block text-white/50 font-mono">
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

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mt-8">
              {ABOUT.stats.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
