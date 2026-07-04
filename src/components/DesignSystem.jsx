import { motion } from "framer-motion";
import { useRef, useState } from "react";

// ─── ANIMATION CONFIG ───
// eslint-disable-next-line react-refresh/only-export-components
export const animationConfig = {
  easing: {
    smooth: [0.16, 1, 0.3, 1],
    springy: { type: "spring", stiffness: 120, damping: 20 },
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

// ─── MAGNETIC BUTTON ───
export function MagneticButton({ children, className = "", onClick, ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`group relative overflow-hidden rounded-none border border-text-primary px-8 py-3 text-sm font-medium tracking-widest text-text-primary uppercase transition-colors duration-300 hover:text-white ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="absolute inset-0 -translate-y-full bg-text-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}

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
          <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-text-secondary mb-6">
            [ {subtitle} ]
          </span>
        )}
        <h2 className="font-sans font-bold text-5xl sm:text-7xl md:text-[100px] leading-[0.9] text-text-primary tracking-tighter relative z-10">
          {title}
        </h2>
      </div>
      <div className={`mt-12 h-[1px] bg-border-subtle ${align === "center" ? "w-24 mx-auto" : "w-full max-w-[200px]"}`} />
    </motion.div>
  );
}

export function GithubIcon({ size = 20, className = "", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, className = "", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
