import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { HERO } from "../data/portfolio";
import { animationConfig } from "./DesignSystem";

export default function Hero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const element = document.querySelector("#projects");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-32 pb-24 md:pt-40 px-6 sm:px-12 md:px-24">
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationConfig.staggerContainer}
          className="flex flex-col w-full"
          style={{ y: yText, opacity: opacityText }}
        >
          {/* Overline Info */}
          <motion.div variants={animationConfig.fadeUp} className="mb-12 md:mb-16">
            <div className="inline-flex flex-col items-start border-y border-border-subtle py-2">
              <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-text-secondary">
                PORTFOLIO · 2026 · TAMIL NADU, INDIA
              </span>
            </div>
          </motion.div>

          {/* Massive Typography */}
          <motion.div variants={animationConfig.fadeUp} className="flex flex-col gap-0 mb-12">
            <h1 className="font-script text-7xl sm:text-8xl md:text-9xl lg:text-[160px] leading-[0.9] tracking-tight">
              <span className="block text-text-primary">Build.</span>
              <span className="block italic text-text-secondary">Ship.</span>
              <span className="block text-[#e07a5f]">Refine.</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={animationConfig.fadeUp}
            className="font-sans text-lg md:text-xl lg:text-2xl text-text-secondary font-light max-w-2xl leading-relaxed mb-16"
          >
            {HERO.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={animationConfig.fadeUp} className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={handleScrollToWork}
              className="w-full sm:w-auto px-8 py-4 bg-[#e07a5f] text-white hover:bg-[#e07a5f]/90 transition-colors flex items-center justify-center gap-3 font-mono text-xs font-bold uppercase tracking-widest border border-transparent"
            >
              See Selected Work <ArrowDown size={14} />
            </button>
            <a
              href={HERO.resume.href}
              target="_blank"
              rel="noreferrer"
              className="group/btn w-full sm:w-auto px-8 py-4 bg-transparent border border-border-subtle text-text-primary hover:border-text-primary transition-colors flex items-center justify-center gap-3 font-mono text-xs font-bold uppercase tracking-widest"
            >
              {HERO.resume.label}
              <FileText size={14} className="transition-transform group-hover/btn:scale-110" />
            </a>
            <button 
              onClick={handleScrollToContact}
              className="group/btn w-full sm:w-auto px-8 py-4 bg-transparent border border-border-subtle text-text-primary hover:border-text-primary transition-colors flex items-center justify-center gap-3 font-mono text-xs font-bold uppercase tracking-widest"
            >
              Start A Project 
              <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </button>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}
