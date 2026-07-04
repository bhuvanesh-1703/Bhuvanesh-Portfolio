import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/portfolio";
import { SectionWrapper, animationConfig } from "./DesignSystem";

const ALL_TECH = [
  "ALL",
  "REACT",
  "NODE.JS",
  "MONGODB",
  "EXPRESS.JS",
  "TAILWIND CSS",
  "JWT",
];

function ProjectCard({ project }) {
  const {
    id,
    title,
    summary,
    description,
    features,
    tech,
    github,
    demo,
    liveUrl,
    frontendUrl,
  } = project;

  const displayId = id < 10 ? `0${id}` : id;
  const year = "2024";

  return (
    <motion.div
      layout
      variants={animationConfig.fadeUp}
      initial="hidden"
      whileInView="visible"
      exit={{ opacity: 0, y: 20 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col md:flex-row gap-10 md:gap-16 mb-24 md:mb-32 group"
    >
      {/* Image Side */}
      <div className="w-full md:w-1/2 relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-secondary">
          <img
            src={project.image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-1000 ease-[0.16,1,0.3,1]"
          />
        </div>
      </div>

      {/* Details Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center relative">
        {/* Date / ID */}
        <div className="text-text-tertiary font-mono text-[10px] tracking-[0.2em] mb-4 uppercase flex items-center gap-2">
          <span>{displayId}</span>
          <span>-</span>
          <span>{year}</span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-script text-4xl md:text-5xl lg:text-6xl text-text-primary mb-2 md:mb-3">
          {title}
        </h3>
        <p className="font-script italic text-lg md:text-xl lg:text-2xl text-text-secondary mb-6 md:mb-8">
          {summary || "Full-stack web application"}
        </p>

        {/* Description */}
        <p className="font-sans text-text-primary/90 text-sm md:text-base leading-relaxed font-light mb-8 max-w-lg">
          {description}
        </p>

        {/* Role & Stack */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2 md:mb-3">
              Role
            </h4>
            <p className="font-sans text-xs md:text-sm text-text-secondary font-light">
              Full-Stack Developer
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2 md:mb-3">
              Stack
            </h4>
            <p className="font-sans text-xs md:text-sm text-text-secondary font-light leading-relaxed">
              {tech.slice(0, 4).join(", ")}
            </p>
          </div>
        </div>

        {/* Features / Highlights */}
        <div className="flex flex-col gap-2 md:gap-3 mb-8">
          {features?.map((feature, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-[#e07a5f] mt-[2px] font-bold">—</span>
              <span className="font-sans text-xs md:text-sm text-text-secondary font-light">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 md:px-3 py-1 border border-border-subtle font-mono text-[8px] md:text-[10px] uppercase tracking-[0.1em] text-text-tertiary hover:border-text-secondary transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action link */}
        {(liveUrl || demo || frontendUrl || github) && (
          <a
            href={liveUrl || demo || frontendUrl || github}
            target="_blank"
            rel="noreferrer"
            className="group/btn inline-flex items-center gap-2 md:gap-3 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-text-primary hover:text-[#e07a5f] transition-colors mt-auto w-fit"
          >
            Ask About This Project 
            <ArrowUpRight size={14} className="md:w-4 md:h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("ALL");

  const filteredProjects = useMemo(() => {
    if (filter === "ALL") return PROJECTS;
    return PROJECTS.filter(p => p.tech.some(t => t.toUpperCase() === filter.toUpperCase()));
  }, [filter]);

  return (
    <SectionWrapper id="projects" hasBackground={false}>
      
      {/* Custom Header Matching Screenshot */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 md:gap-12 mb-16 md:mb-24 mt-12 md:mt-16">
        
        {/* Massive Title */}
        <div className="flex flex-col">
          <h2 className="font-script italic text-6xl sm:text-7xl md:text-8xl lg:text-[110px] text-text-primary leading-[1] md:leading-[0.9] tracking-tight">
            not
          </h2>
          <h2 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-[110px] text-text-primary leading-[1] md:leading-[0.9] tracking-tight">
            screenshots.
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 xl:pb-4 max-w-2xl">
          {ALL_TECH.map(tech => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-3 py-1.5 border font-mono text-[10px] uppercase tracking-widest transition-colors ${
                filter === tech 
                  ? 'border-[#e07a5f] bg-[#e07a5f] text-white' 
                  : 'border-border-subtle text-text-tertiary hover:border-text-secondary hover:text-text-primary'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full mt-12 md:mt-16">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>

    </SectionWrapper>
  );
}
