import { motion } from "framer-motion";
import { JOURNEY } from "../data/portfolio";
import { SectionWrapper } from "./DesignSystem";

export default function Journey() {
  return <SectionWrapper id="journey" hasBackground={false}>
    <div className="max-w-[1400px] mx-auto pt-20 md:pt-28">
      <div className="mb-12"><span className="cinema-kicker">05 — JOURNEY</span><h2 className="cinema-display text-7xl md:text-[10rem] mt-4 text-white">THE PATH</h2></div>
      <div className="border-t border-white/10">
        {JOURNEY.map((item,i)=><motion.div key={i} initial={{opacity:0,x:-25}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.07}} className="group grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 py-10 border-b border-white/10 hover:bg-white/[.02] transition-colors">
          <span className="cinema-kicker text-[#e34b32]">{item.period}</span>
          <div><h3 className="text-2xl md:text-4xl text-white">{item.title}</h3><p className="mt-3 max-w-3xl text-white/45 leading-relaxed">{item.description}</p><p className="mt-5 cinema-kicker">{item.institution}</p></div>
        </motion.div>)}
      </div>
    </div>
  </SectionWrapper>;
}
