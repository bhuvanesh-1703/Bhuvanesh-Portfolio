import { motion, useReducedMotion } from "framer-motion";
import { JOURNEY } from "../data/portfolio";
import { SectionWrapper } from "./DesignSystem";

export default function Journey() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionWrapper id="journey" hasBackground={false}>
      <div className="cinema-section">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="cinema-kicker text-accent">04 — JOURNEY</span>
            <h2 className="cinema-display text-5xl sm:text-6xl md:text-8xl mt-4 text-white font-display tracking-wide">
              THE PATH
            </h2>
          </div>
          <span className="cinema-kicker hidden md:block text-white/50 font-mono">
            MILESTONES &amp; EDUCATION
          </span>
        </div>

        <div className="relative border-t border-white/10">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-[160px] top-0 bottom-0 w-px bg-white/10 pointer-events-none" />

          {JOURNEY.map((item, i) => {
            const motionProps = reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-80px" },
                  transition: {
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                };

            return (
              <motion.div
                key={i}
                {...motionProps}
                className="group relative grid md:grid-cols-[160px_1fr] gap-6 md:gap-12 py-10 border-b border-white/10 hover:bg-white/[.02] transition-colors duration-300"
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-[160px] top-12 w-2 h-2 rounded-full bg-accent -translate-x-[3.5px] ring-4 ring-[#050505] group-hover:scale-150 transition-transform duration-300" />

                <span className="cinema-kicker text-accent font-mono font-bold text-xs pt-1">
                  {item.period}
                </span>

                <div>
                  <h3 className="cinema-display text-3xl sm:text-4xl md:text-5xl text-white group-hover:text-accent transition-colors duration-300 font-display font-normal">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-white/65 text-base md:text-lg leading-relaxed font-body">
                    {item.description}
                  </p>
                  <p className="mt-4 cinema-kicker text-white/50 font-mono">
                    {item.institution}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
