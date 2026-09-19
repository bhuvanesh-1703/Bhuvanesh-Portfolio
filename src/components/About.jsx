import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ABOUT } from "../data/portfolio";
import { SectionWrapper } from "./DesignSystem";

/* ------------------------------------------------
   STAT COUNTER (Count-Up Animation)
------------------------------------------------ */
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
      <div className="cinema-display text-5xl sm:text-6xl md:text-7xl text-accent font-display tracking-wider group-hover:scale-105 transition-transform origin-left duration-300">
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

/* ------------------------------------------------
   CODE TOKENS FOR SYNTAX HIGHLIGHTING
------------------------------------------------ */
const CODE_TOKENS = [
  { text: "const ", type: "keyword" },
  { text: "bhuvanesh", type: "variable" },
  { text: " = {\n", type: "punct" },
  { text: "  role: ", type: "key" },
  { text: '"Full Stack Engineer"', type: "string" },
  { text: ",\n", type: "punct" },
  { text: "  stack: [", type: "key" },
  { text: '"React"', type: "string" },
  { text: ", ", type: "punct" },
  { text: '"Node.js"', type: "string" },
  { text: ", ", type: "punct" },
  { text: '"MongoDB"', type: "string" },
  { text: ", ", type: "punct" },
  { text: '"Express"', type: "string" },
  { text: "],\n", type: "punct" },
  { text: "  focus: ", type: "key" },
  { text: '"shipping, not just building"', type: "string" },
  { text: ",\n", type: "punct" },
  { text: "  currentlyLearning: [", type: "key" },
  { text: '"TypeScript"', type: "string" },
  { text: ", ", type: "punct" },
  { text: '"testing"', type: "string" },
  { text: "],\n", type: "punct" },
  { text: "  status: ", type: "key" },
  { text: '"open to full-time roles"', type: "string" },
  { text: ",\n", type: "punct" },
  { text: "};\n\n", type: "punct" },
  { text: "export default ", type: "keyword" },
  { text: "bhuvanesh", type: "variable" },
  { text: ";", type: "punct" },
];

const FULL_CODE_TEXT = CODE_TOKENS.map((t) => t.text).join("");
const TOTAL_CHARS = FULL_CODE_TEXT.length;

/* ------------------------------------------------
   IDE WINDOW COMPONENT (DECORATIVE / ARIA-HIDDEN)
------------------------------------------------ */
function IDEWindow() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const [charCount, setCharCount] = useState(reduceMotion ? TOTAL_CHARS : 0);

  useEffect(() => {
    if (reduceMotion) {
      setCharCount(TOTAL_CHARS);
      return;
    }
    if (!inView) return;

    let currentIndex = 0;
    let timeoutId;

    const typeNext = () => {
      if (currentIndex >= TOTAL_CHARS) return;

      const char = FULL_CODE_TEXT[currentIndex];
      currentIndex++;
      setCharCount(currentIndex);

      if (currentIndex < TOTAL_CHARS) {
        // Human cadence: punctuation and newlines pause ~120ms longer
        const isPauseChar = /[.,{};:[\]\n]/.test(char);
        const delay = isPauseChar ? 120 + Math.random() * 30 : 18 + Math.random() * 12;
        timeoutId = setTimeout(typeNext, delay);
      }
    };

    // Initial slight pause before typing starts
    timeoutId = setTimeout(typeNext, 300);
    return () => clearTimeout(timeoutId);
  }, [inView, reduceMotion]);

  // Compute rendered tokens based on current charCount
  const renderedTokens = useMemo(() => {
    let remaining = charCount;
    return CODE_TOKENS.map((token, i) => {
      if (remaining <= 0) return null;
      const sliceLength = Math.min(token.text.length, remaining);
      remaining -= sliceLength;
      const text = token.text.slice(0, sliceLength);

      let colorClass = "text-white";
      if (token.type === "keyword") colorClass = "text-[#91ff00] font-semibold";
      else if (token.type === "string") colorClass = "text-accent";
      else if (token.type === "punct") colorClass = "text-white/40";
      else if (token.type === "key") colorClass = "text-white/90";
      else if (token.type === "variable") colorClass = "text-white font-medium";

      return (
        <span key={i} className={colorClass}>
          {text}
        </span>
      );
    });
  }, [charCount]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="w-full rounded-none border border-white/10 bg-[#060606] shadow-2xl overflow-hidden font-mono select-none"
    >
      {/* Editor Header / Chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0a] border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* Traffic-light dots (monochrome/neon theme) */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
          </div>

          {/* Active Tab */}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#060606] border-t border-accent border-r border-l border-white/10 text-xs text-white/90">
            <span className="text-accent text-[10px] font-bold">JS</span>
            <span>about-me.js</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[10px] text-white/30 tracking-widest uppercase">
          <span>UTF-8</span>
          <span>·</span>
          <span>JavaScript</span>
        </div>
      </div>

      {/* Editor Code Body */}
      <div className="p-5 sm:p-6 text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[260px] flex">
        {/* Line Numbers */}
        <div className="text-white/20 pr-4 select-none text-right flex flex-col font-mono text-xs">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>

        {/* Code Content */}
        <pre className="font-mono flex-1 whitespace-pre-wrap">
          {renderedTokens}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            className="inline-block w-2 h-4 bg-accent ml-0.5 align-middle shadow-[0_0_8px_#91ff00]"
          />
        </pre>
      </div>
    </div>
  );
}

/* ------------------------------------------------
   ABOUT SECTION
------------------------------------------------ */
export default function About() {
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <SectionWrapper id="about" hasBackground={false}>
      <div className="cinema-section">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-16">
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

        {/* 2-Column Grid: Accessible Bio & Decorative IDE Window */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center pt-8 border-t border-white/10">
          {/* Left Column: Accessible Semantic Text */}
          <motion.div {...motionProps} className="flex flex-col">
            <h3 className="text-2xl sm:text-3xl md:text-4xl leading-snug text-white font-body font-normal mb-6">
              {ABOUT.intro}
            </h3>

            <div className="space-y-4 text-white/70 text-base md:text-lg leading-relaxed font-body font-light">
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mt-8">
              {ABOUT.stats.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </motion.div>

          {/* Right Column: Decorative Interactive IDE Window */}
          <motion.div
            {...motionProps}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <IDEWindow />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
