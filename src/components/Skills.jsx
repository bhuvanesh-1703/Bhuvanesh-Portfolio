import { motion } from "framer-motion";
import { SKILLS } from "../data/portfolio";
import { SectionWrapper, animationConfig } from "./DesignSystem";
import { useHoveredSkill } from "./SkillContext";

function SkillRow({ category, index }) {
  const { setHoveredSkill } = useHoveredSkill();
  return (
    <motion.div
      initial={{opacity:0,y:35}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true,margin:"-80px"}}
      transition={{duration:.7,delay:index*.06}}
      className="group grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-5 md:gap-10 py-8 border-t border-white/10"
    >
      <span className="cinema-kicker text-[#e34b32] pt-1">{String(index+1).padStart(2,"0")}</span>
      <div>
        <h3 className="cinema-display text-4xl md:text-6xl lg:text-7xl text-white/90 group-hover:text-[#e34b32] transition-colors duration-500">
          {category.category}
        </h3>
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
          {category.items.map((skill) => (
            <span key={skill.name} onMouseEnter={()=>setHoveredSkill(skill.name)} onMouseLeave={()=>setHoveredSkill(null)} className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-default">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills" hasBackground={false}>
      <div className="max-w-[1400px] mx-auto pt-16 md:pt-24">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <span className="cinema-kicker">03 — TOOLBOX</span>
            <h2 className="cinema-display text-6xl md:text-8xl mt-4 text-white">MY STACK</h2>
          </div>
          <span className="cinema-kicker hidden md:block">{SKILLS.reduce((a,c)=>a+c.items.length,0)} TOOLS / SYSTEMS</span>
        </div>
        <div>
          {SKILLS.map((category,index)=><SkillRow key={category.category} category={category} index={index}/>)}
        </div>
      </div>
    </SectionWrapper>
  );
}
