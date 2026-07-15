import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Mail,
} from "lucide-react";
import { HERO } from "../data/portfolio";
import { animationConfig } from "./DesignSystem";
import { scrollToElement } from "../utils";

export default function Hero() {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Disable parallax on mobile to avoid jank on mid-range devices
  const yText = useTransform(scrollY, [0, 1000], [0, isMobile ? 0 : 150]);
  const opacityText = useTransform(scrollY, [0, 500], [1, isMobile ? 1 : 0]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-32 pb-24 md:pt-40 px-6 sm:px-12 md:px-24 bg-bg-primary"
    >
      {/* Subtle Grid Background (Premium Modern touch) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />
      {/* Soft gradient wash at the top/bottom to fade the grid */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col items-start justify-center">
          {/* Animated content: badge + headline + tagline */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationConfig.staggerContainer}
            className="flex flex-col w-full max-w-4xl"
            style={{ y: yText, opacity: opacityText }}
          >
            {/* Version / Status badge */}
            <motion.div variants={animationConfig.fadeUp} className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset]">
                <span className="relative flex h-1.5 w-1.5 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span className="font-sans text-[11px] tracking-wide text-text-secondary">
                  Open to new opportunities
                </span>
              </div>
            </motion.div>

            {/* Premium Typography */}
            <motion.div
              variants={animationConfig.fadeUp}
              className="flex flex-col gap-4 mb-10"
            >
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.05] tracking-tight text-white font-normal">
                Engineering <span className="italic text-text-secondary">digital</span>{" "}
                <br />
                experiences <br />
                with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-lime to-yellow-200 italic font-serif pr-2">
                  precision.
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={animationConfig.fadeUp}
              className="font-sans text-base md:text-lg text-text-tertiary max-w-lg leading-relaxed mb-10"
            >
              {HERO.tagline}
            </motion.p>
          </motion.div>

          {/* CTAs — OUTSIDE animation container for instant visibility */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToElement("#projects", 100)}
              className="group relative px-6 py-3 bg-white text-black rounded-full font-medium text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">Explore Projects</span>
              <ArrowRight
                size={16}
                className="relative z-10 transition-transform group-hover:translate-x-1"
              />
            </button>

            <a
              href={HERO.resume.href}
              target="_blank"
              rel="noreferrer"
              className="group px-6 py-3 bg-transparent text-white border border-white/10 rounded-full font-medium text-sm hover:bg-white/5 transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <FileText
                size={16}
                className="text-text-tertiary group-hover:text-white transition-colors"
              />
              View Resume
            </a>

            <a
              href={`mailto:${HERO.social.email.replace("mailto:", "")}`}
              className="group px-6 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-[#d4694e] transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <Mail
                size={16}
                className="transition-transform group-hover:scale-110"
              />
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
