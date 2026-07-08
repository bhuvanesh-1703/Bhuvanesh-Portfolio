import { motion } from "framer-motion";

// ─── ANIMATION CONFIG ───
// eslint-disable-next-line react-refresh/only-export-components
export const animationConfig = {
  easing: {
    smooth: [0.16, 1, 0.3, 1],
    springy: { type: "spring", stiffness: 120, damping: 20 },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.1,
      },
    }),
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  },
  hoverLift: {
    y: -4,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

// ─── SECTION WRAPPER ───
export function SectionWrapper({ children, id, className = "", hasBackground = false }) {
  return (
    <section
      id={id}
      className={`relative py-32 md:py-48 overflow-hidden transition-colors duration-300 ${
        hasBackground ? "bg-bg-secondary border-y border-border-subtle" : ""
      } ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24">{children}</div>
    </section>
  );
}

// ─── SECTION HEADER ───
export function SectionHeader({ title, subtitle, align = "left", className = "" }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={animationConfig.fadeUp}
      className={`relative mb-24 z-10 ${align === "center" ? "flex flex-col items-center text-center" : "text-left"} ${className}`}
    >
      <div className={`relative inline-flex flex-col ${align === "center" ? "items-center" : "items-start"}`}>
        {subtitle && (
          <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-accent-lime mb-6">
            [ {subtitle} ]
          </span>
        )}
        <h2 className="font-serif font-normal text-5xl sm:text-7xl md:text-[100px] leading-[0.9] text-white tracking-tight relative z-10">
          {title}
        </h2>
      </div>
      <div className={`mt-12 h-[1px] bg-border-subtle ${align === "center" ? "w-24 mx-auto" : "w-full max-w-[200px]"}`} />
    </motion.div>
  );
}

