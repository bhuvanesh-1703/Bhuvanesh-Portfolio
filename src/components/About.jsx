import { motion } from "framer-motion";
import { ABOUT } from "../data/portfolio";
import { SectionWrapper } from "./DesignSystem";

export default function About() {
  return <SectionWrapper id="about" hasBackground={false}>
    <div className="cinema-section max-w-[1400px] mx-auto pt-20 md:pt-28">
      <div className="flex items-end justify-between mb-12">
        <div><span className="cinema-kicker">02 — ABOUT</span><h2 className="cinema-display text-7xl md:text-[10rem] mt-4 text-white">WHO I AM</h2></div>
        <span className="cinema-kicker hidden md:block">BUILD / LEARN / SHIP</span>
      </div>
      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 md:gap-20 py-12 border-t border-white/10">
        <motion.h3 initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-3xl md:text-5xl leading-tight text-white/90">
          {ABOUT.intro}
        </motion.h3>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-white/50 text-base md:text-lg leading-relaxed">
          {ABOUT.paragraphs.map((p,i)=><p key={i} className="mb-6">{p}</p>)}
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10 mt-8">
            {ABOUT.stats.map(s=><div key={s.label}><div className="cinema-display text-5xl text-white">{s.value}</div><div className="cinema-kicker mt-2">{s.label}</div></div>)}
          </div>
        </motion.div>
      </div>
    </div>
  </SectionWrapper>;
}
