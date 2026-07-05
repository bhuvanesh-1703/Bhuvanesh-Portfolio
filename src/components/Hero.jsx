import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Sparkles,
  Code2,
  ChevronRight,
} from "lucide-react";
import { HERO } from "../data/portfolio";
import { animationConfig } from "./DesignSystem";
import { scrollToElement } from "../utils";

export default function Hero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat"));
  };

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
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Typography & CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationConfig.staggerContainer}
            className="flex flex-col w-full lg:col-span-7 xl:col-span-7"
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
              className="flex flex-col gap-2 mb-8"
            >
              <h1 className="font-sans font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-tight text-white">
                Engineering <span className="text-text-secondary">digital</span>{" "}
                <br />
                experiences <br />
                with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 italic font-serif">
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

            {/* Premium CTAs */}
            <motion.div
              variants={animationConfig.fadeUp}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollToElement("#projects", 100)}
                className="group relative px-6 py-3 bg-white text-black rounded-full font-medium text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                Explore Projects{" "}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
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
            </motion.div>
          </motion.div>

          {/* Right Side: Abstract Visual / Code Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-5 xl:col-span-5 justify-end"
            style={{ y: yText }}
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl bg-white/[0.02] border border-white/[0.05] p-1 overflow-hidden shadow-2xl">
              {/* Internal abstract glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-accent-gold/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="w-full h-full rounded-xl bg-black/40 backdrop-blur-sm border border-white/[0.05] p-6 flex flex-col relative z-10">
                {/* Mock code editor header */}
                <div className="flex items-center justify-between mb-6 border-b border-white/[0.05] pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="font-mono text-[10px] text-text-tertiary flex items-center gap-2">
                    <Code2 size={12} /> index.js
                  </div>
                </div>

                {/* Mock code content */}
                <div className="font-mono text-xs leading-loose text-text-secondary flex-1">
                  <p>
                    <span className="text-text-secondary">const</span> developer{" "}
                    <span className="text-accent-gold">=</span> {"{"}
                  </p>
                  <p className="pl-4">
                    name: <span className="text-accent-gold">'Bhuvanesh'</span>,
                  </p>
                  <p className="pl-4">
                    role:{" "}
                    <span className="text-accent-gold">
                      'Full Stack Engineer'
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    skills: [<span className="text-accent-gold">'React'</span>,{" "}
                    <span className="text-accent-gold">'Node.js'</span>,{" "}
                    <span className="text-accent-gold">'Next.js'</span>],
                  </p>
                  <p className="pl-4">
                    passion:{" "}
                    <span className="text-accent-gold">
                      'Building scalable experiences'
                    </span>
                  </p>
                  <p>{"}"};</p>
                  <br />
                  <p>
                    <span className="text-text-secondary">await</span> developer.
                    <span className="text-accent-gold">build</span>();
                  </p>
                </div>

                {/* Integrated AI Trigger */}
                <button
                  onClick={openChat}
                  className="mt-auto w-full group relative flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles
                      size={14}
                      className="text-white/50 group-hover:text-white transition-colors"
                    />
                    <span className="font-sans text-xs font-medium text-text-secondary group-hover:text-white transition-colors">
                      Ask Jarvis AI
                    </span>
                  </div>
                  <ChevronRight
                    size={14}
                    className="text-white/30 group-hover:text-white transition-colors group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
