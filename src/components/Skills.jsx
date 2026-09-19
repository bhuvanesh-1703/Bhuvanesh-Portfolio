import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SKILLS } from "../data/portfolio";
import { SectionWrapper } from "./DesignSystem";
import { useHoveredSkill } from "./SkillContext";

/* ------------------------------------------------
   SYSTEM PANEL COMPONENT (SIGNAL DECK)
------------------------------------------------ */
function SystemPanel({ category, index }) {
  const { setHoveredSkill } = useHoveredSkill();
  const reduceMotion = useReducedMotion();
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const panelMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: {
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        },
      };

  return (
    <motion.div
      {...panelMotion}
      className="relative group/panel bg-[#080808] border border-white/10 p-6 rounded-none flex flex-col justify-between overflow-hidden shadow-xl hover:border-accent/40 transition-colors duration-300 h-full"
    >
      {/* 1-Frame Scanline Flicker Bar on Entrance */}
      {!reduceMotion && (
        <motion.div
          initial={{ top: "0%", opacity: 0 }}
          whileInView={{ top: ["0%", "100%"], opacity: [0, 0.7, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.08 + 0.08, ease: "easeInOut" }}
          className="absolute left-0 right-0 h-[2px] bg-accent/30 pointer-events-none z-20 shadow-[0_0_12px_#91ff00]"
        />
      )}

      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-accent font-bold text-xs tracking-widest">
              {String(index + 1).padStart(2, "0")} ·
            </span>
            <span className="font-mono text-[11px] text-white/90 uppercase tracking-[.2em] font-semibold">
              {category.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          </div>
        </div>

        {/* Tool Rows with Signal Bars */}
        <div className="space-y-3.5">
          {category.items.map((item, rowIdx) => {
            const isHovered = hoveredRowIndex === rowIdx;
            const tierClass =
              item.tier ||
              (item.level === "strong"
                ? "w-full"
                : item.level === "comfortable"
                ? "w-2/3"
                : "w-1/3");

            const barMotion = reduceMotion
              ? {}
              : {
                  initial: { scaleX: 0 },
                  whileInView: { scaleX: 1 },
                  viewport: { once: true },
                  transition: {
                    duration: 0.5,
                    delay: index * 0.08 + rowIdx * 0.04 + 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  },
                };

            return (
              <div
                key={item.name}
                tabIndex={0}
                onFocus={() => {
                  setHoveredRowIndex(rowIdx);
                  setHoveredSkill?.(item.name);
                }}
                onBlur={() => {
                  setHoveredRowIndex(null);
                  setHoveredSkill?.(null);
                }}
                onMouseEnter={() => {
                  setHoveredRowIndex(rowIdx);
                  setHoveredSkill?.(item.name);
                }}
                onMouseLeave={() => {
                  setHoveredRowIndex(null);
                  setHoveredSkill?.(null);
                }}
                className="group/row flex flex-col gap-1.5 cursor-pointer py-1 outline-none"
              >
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`font-body text-sm transition-colors duration-200 ${
                      isHovered
                        ? "text-accent font-medium"
                        : "text-white/80 group-hover/row:text-white"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Hover-revealed 1-3 word Mono Tag */}
                  {item.tag && (
                    <span
                      className={`font-mono text-[10px] text-accent/80 uppercase tracking-widest transition-opacity duration-200 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      [{item.tag}]
                    </span>
                  )}
                </div>

                {/* Signal Bar */}
                <div className="w-full bg-white/10 h-[3px] rounded-full overflow-hidden relative">
                  <motion.div
                    {...barMotion}
                    style={{ originX: 0 }}
                    className={`h-full ${tierClass} transition-all duration-300 ${
                      isHovered
                        ? "bg-accent shadow-[0_0_10px_#91ff00]"
                        : "bg-accent/60 group-hover/row:bg-accent/80"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------
   SKILLS SECTION (SIGNAL DECK)
------------------------------------------------ */
export default function Skills() {
  const totalTools = SKILLS.reduce((a, c) => a + c.items.length, 0);

  return (
    <SectionWrapper id="skills" hasBackground={false}>
      <div className="cinema-section">
        <div className="flex items-end justify-between gap-6 mb-16">
          <div>
            <span className="cinema-kicker text-accent">02 — SIGNAL DECK</span>
            <h2 className="cinema-display text-5xl sm:text-6xl md:text-8xl mt-4 text-white font-display tracking-wide">
              MY STACK
            </h2>
          </div>
          <span className="cinema-kicker hidden md:block text-white/50 font-mono">
            {totalTools} ACTIVE SYSTEMS
          </span>
        </div>

        {/* 6-Category System Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SKILLS.map((category, index) => (
            <SystemPanel
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
