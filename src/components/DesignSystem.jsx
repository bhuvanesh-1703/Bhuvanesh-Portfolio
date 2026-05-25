/* eslint-disable react-refresh/only-export-components */
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PREMIUM DESIGN SYSTEM - 2026 Level Frontend Engineering
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This file exports reusable components, animations, and utilities that ensure
 * consistent, professional UI/UX across the entire portfolio.
 */

import { motion } from "framer-motion";

// ─── ANIMATION VARIANTS ───
export const animationConfig = {
  // Ease functions for premium feel
  easing: {
    smooth: [0.16, 1, 0.3, 1], // Apple-like smooth easing
    springy: { type: "spring", stiffness: 120, damping: 20 },
    snappy: { type: "spring", stiffness: 150, damping: 25 },
  },

  // Standard fade-up for section reveals
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.08,
      },
    }),
  },

  // Staggered container for lists
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },

  // Individual item animations
  staggerItem: {
    hidden: { opacity: 0, y: 20, rotateX: 10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  },

  // Hover lift effect
  hoverLift: {
    y: -6,
    transition: { type: "spring", stiffness: 120, damping: 22 },
  },

  // Scale on hover
  hoverScale: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 150, damping: 25 },
  },
};

// ─── REUSABLE BUTTON COMPONENT ───
export function PremiumButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyles =
    "font-semibold tracking-wide rounded-lg transition-all duration-300 flex items-center gap-2 justify-center font-display uppercase";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] text-bg-primary hover:brightness-110 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30",
    secondary:
      "bg-white/10 border border-white/20 text-text-primary hover:bg-white/15 hover:border-accent/30 shadow-md",
    accent:
      "bg-accent-teal/10 border border-accent-teal/30 text-accent-teal hover:bg-accent-teal/15 hover:border-accent-teal/50",
    ghost: "text-text-primary hover:text-accent transition-colors",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
    xl: "px-9 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ─── REUSABLE CARD COMPONENT ───
export function PremiumCard({
  children,
  className = "",
  hoverable = true,
  ...props
}) {
  return (
    <motion.div
      whileHover={hoverable ? "hover" : undefined}
      variants={hoverable ? { hover: animationConfig.hoverLift } : {}}
      className={`
        relative rounded-2xl bg-white/5 border border-white/10
        backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.85)]
        ${hoverable ? "hover:border-white/20 hover:shadow-[0_35px_70px_rgba(0,0,0,0.95)]" : ""}
        transition-all duration-300 overflow-hidden group
        ${className}
      `}
      {...props}
    >
      {/* Premium top border glow on hover */}
      {hoverable && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-teal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Inner corner glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-xl pointer-events-none transition-all duration-500 group-hover:bg-accent-teal/[0.08]" />

      {children}
    </motion.div>
  );
}

// ─── SECTION WRAPPER (Enforces spacing rhythm) ───
export function SectionWrapper({
  children,
  id,
  className = "",
  hasBackground = false,
}) {
  return (
    <section
      id={id}
      className={`
        relative py-24 md:py-32
        ${hasBackground ? "bg-bg-secondary/30" : ""}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">{children}</div>
    </section>
  );
}

// ─── SECTION HEADER (Consistent styling across sections) ───
export function SectionHeader({
  label,
  title,
  description = "",
  center = false,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={animationConfig.fadeUp}
      className={`mb-16 ${center ? "text-center max-w-3xl mx-auto" : ""}`}
    >
      <p className="text-accent-teal text-xs font-semibold tracking-[3px] uppercase mb-4 font-mono">
        {label}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight mb-5">
        {title}
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-accent-teal to-accent rounded-full" />
      {description && (
        <p className="mt-6 text-text-secondary text-base leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}

// ─── TEXT VARIANTS ───
export const TextVariants = {
  // Hero heading - maximum impact
  heroHeading:
    "font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]",

  // Section heading
  sectionHeading:
    "font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight",

  // Subsection heading
  subsectionHeading:
    "font-display text-xl sm:text-2xl font-bold tracking-tight",

  // Card heading
  cardHeading: "font-display text-lg font-extrabold tracking-tight",

  // Body text
  bodyText: "font-sans text-sm sm:text-base leading-relaxed",

  // Small text
  smallText: "font-sans text-xs sm:text-sm text-text-secondary",

  // Label
  label:
    "text-xs font-mono font-bold uppercase tracking-[2px] text-text-secondary/60",
};

// ─── SPACING SCALE (8px base unit) ───
export const spacingScale = {
  xs: "0.5rem", // 8px
  sm: "1rem", // 16px
  md: "1.5rem", // 24px
  lg: "2rem", // 32px
  xl: "3rem", // 48px
  "2xl": "4rem", // 64px
  "3xl": "6rem", // 96px
};

// ─── RESPONSIVE GRID ───
export const gridClasses = {
  // 2 column on mobile, 3 on tablet, 4 on desktop
  auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  // 2 column on mobile, 3 on desktop
  projects: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  // 2 column always
  double: "grid-cols-1 md:grid-cols-2",
  // Full width
  single: "grid-cols-1",
};

// ─── SHADOW SYSTEM ───
export const shadowSystem = {
  sm: "shadow-[0_10px_25px_rgba(0,0,0,0.7)]",
  md: "shadow-[0_20px_50px_rgba(0,0,0,0.85)]",
  lg: "shadow-[0_35px_70px_rgba(0,0,0,0.95)]",
  hover: "hover:shadow-[0_40px_80px_rgba(0,0,0,0.95)]",
};

// ─── GRADIENT UTILITIES ───
export const gradients = {
  goldAccent: "from-[#BF953F] to-[#FCF6BA]",
  tealAccent: "from-accent-teal to-[#0D9488]",
  darkMesh: "from-bg-secondary via-bg-primary to-bg-tertiary",
};

// ─── CUSTOM BRAND ICONS ───
export function GithubIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default animationConfig;
