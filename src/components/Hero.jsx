import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { HERO } from "../data/portfolio";
import { scrollToElement } from "../utils";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 180]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden px-5 sm:px-10 md:px-16 lg:px-20 flex items-center pt-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-20 top-20 w-[45vw] h-[45vw] rounded-full bg-[#e34b32]/[.07] blur-[100px]" />
        <div className="absolute left-[8%] bottom-[8%] w-px h-40 bg-gradient-to-t from-[#e34b32] to-transparent" />
        <div className="absolute right-[8%] top-28 w-px h-48 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute inset-0 opacity-[.025]" style={{backgroundImage:"linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",backgroundSize:"80px 80px"}} />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-[1500px] mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-10 h-px bg-[#e34b32]" />
          <span className="cinema-kicker text-white/50">PORTFOLIO / 2026</span>
        </div>

        <div className="max-w-[1250px]">
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.15,duration:.7}} className="cinema-kicker mb-5">
            FULL STACK DEVELOPER · MERN · AI · AUTOMATION
          </motion.p>

          <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:.25,duration:1,ease:[.16,1,.3,1]}} className="cinema-display text-[18vw] sm:text-[16vw] lg:text-[13vw] text-[#f4f1ea]">
            BHUVANESH
          </motion.h1>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-7">
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.8}} className="max-w-xl text-base md:text-lg leading-relaxed text-white/55">
              I build practical web products with React, Node.js, MongoDB and AI — from customer-facing interfaces to automation and real-time systems.
            </motion.p>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollToElement("#projects", 100)} className="group inline-flex items-center gap-3 border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[.18em] hover:border-[#e34b32] hover:bg-[#e34b32] transition-all">
                View Work <ArrowUpRight size={15} />
              </button>
              <a href={HERO.resume.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-white/65 hover:text-white hover:border-white/40 transition-all">
                <FileText size={14} /> Resume
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="cinema-kicker">SCROLL TO EXPLORE</span>
          <ArrowDown size={15} className="text-[#e34b32] animate-bounce" />
          <span className="cinema-kicker hidden sm:block">RAJAPALAYAM / INDIA</span>
        </div>
      </motion.div>
    </section>
  );
}
