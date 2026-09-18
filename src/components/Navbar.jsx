import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Sparkles } from "lucide-react";
import { NAV_LINKS, HERO } from "../data/portfolio";
import { scrollToElement } from "../utils";

export default function Navbar() {
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>40);window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f)},[]);
  const nav=(href)=>{setOpen(false);scrollToElement(href)};
  const ask=()=>window.dispatchEvent(new Event("open-chat"));

  return <>
    <motion.header initial={{y:-60,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.7}} className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled?"bg-black/75 backdrop-blur-xl border-b border-white/10 py-4":"py-6"}`}>
      <nav className="px-5 sm:px-10 md:px-16 lg:px-20 flex items-center justify-between">
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="font-mono text-xs tracking-[.25em] uppercase text-white hover:text-[#e34b32] transition-colors">
          B / DEV
        </button>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l=><button key={l.href} onClick={()=>nav(l.href)} className="cinema-kicker hover:text-white transition-colors">{l.label}</button>)}
          <button onClick={ask} className="cinema-kicker text-[#e34b32] inline-flex items-center gap-2"><Sparkles size={12}/> ASK AI</button>
          <a href={HERO.resume.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:border-[#e34b32] hover:text-[#e34b32] transition-colors"><FileText size={12}/> Resume</a>
        </div>
        <button className="md:hidden text-white" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
      </nav>
    </motion.header>
    <AnimatePresence>{open&&<motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="fixed inset-x-0 top-0 z-40 min-h-screen bg-[#050505] pt-28 px-6 md:hidden">
      <div className="cinema-kicker mb-8">MENU / NAVIGATION</div>
      <div className="flex flex-col">{NAV_LINKS.map((l,i)=><button key={l.href} onClick={()=>nav(l.href)} className="text-left py-5 border-b border-white/10 cinema-display text-5xl text-white">{String(i+1).padStart(2,"0")} / {l.label}</button>)}</div>
      <div className="flex gap-4 mt-8"><button onClick={()=>{setOpen(false);ask()}} className="font-mono text-xs uppercase tracking-widest text-[#e34b32]">Ask AI</button><a href={HERO.resume.href} target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-widest text-white">Resume</a></div>
    </motion.div>}</AnimatePresence>
  </>;
}
