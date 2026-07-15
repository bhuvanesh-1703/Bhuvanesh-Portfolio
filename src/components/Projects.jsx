import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "../data/portfolio";
import { SectionWrapper, animationConfig } from "./DesignSystem";
import { useHoveredSkill } from "./SkillContext";
import { Github } from "./Icons";

const FILTERS = [
  "ALL",
  "REACT",
  "NODE.JS",
  "MONGODB",
  "EXPRESS.JS",
  "TAILWIND CSS",
  "JWT",
];

function techMatches(projectTech, filterTech) {
  return projectTech.toUpperCase().startsWith(filterTech);
}

function projectUsesSkill(project, skillName) {
  if (!skillName) return true;
  const normalized = skillName.toLowerCase();
  return project.tech.some((t) => t.toLowerCase().includes(normalized));
}

function formatDisplayUrl(url) {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function padIndex(n) {
  return String(n).padStart(2, "0");
}

function getProjectGithubLinks(project) {
  const links = [];
  if (project.github) {
    links.push({ label: "GitHub", url: project.github });
  }
  if (project.frontendUrl) {
    links.push({ label: "Frontend", url: project.frontendUrl });
  }
  if (project.backendUrl) {
    links.push({ label: "Backend", url: project.backendUrl });
  }
  return links;
}

function ProjectGithubLinks({ project, accent, compact = false }) {
  const links = getProjectGithubLinks(project);
  const liveUrl = project.liveUrl || project.demo;

  if (links.length === 0 && !liveUrl) return null;

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${compact ? "" : "gap-2.5"}`}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {links.map(({ label, url }) => (
        <a
          key={`${label}-${url}`}
          href={url}
          target="_blank"
          rel="noreferrer"
          title={`${label} on GitHub`}
          style={{ "--project-accent": accent }}
          className={`inline-flex items-center gap-1.5 border border-border-subtle font-mono uppercase tracking-wider text-text-secondary hover:text-[color:var(--project-accent)] hover:border-[color:var(--project-accent)] transition-colors ${
            compact
              ? "px-2 py-1 text-[9px]"
              : "px-4 py-2.5 text-[10px] tracking-widest text-text-primary"
          }`}
        >
          <Github size={compact ? 11 : 15} />
          {label}
        </a>
      ))}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          title="Open live demo"
          className={
            compact
              ? "inline-flex items-center gap-1.5 px-2 py-1 border border-border-subtle font-mono text-[9px] uppercase tracking-wider text-text-secondary hover:text-text-primary hover:border-text-tertiary transition-colors"
              : "inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-[10px] uppercase tracking-widest hover:bg-accent-lime hover:text-white transition-colors duration-300"
          }
        >
          <ExternalLink size={compact ? 11 : 15} />
          {compact ? "Live" : "Live Demo"}
        </a>
      )}
    </div>
  );
}

function BrowserMockup({ image, url, title, accent }) {
  const displayUrl = formatDisplayUrl(url);

  return (
    <div className="overflow-hidden border border-border-subtle bg-bg-primary shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle bg-bg-secondary">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div
          className="flex-1 min-w-0 px-3 py-1.5 border border-border-subtle bg-bg-primary font-mono text-[10px] sm:text-[11px] text-text-tertiary truncate"
          style={{ borderLeftColor: accent, borderLeftWidth: 2 }}
        >
          {displayUrl || "localhost:3000"}
        </div>
      </div>
      <div className="relative aspect-[16/10] bg-bg-primary">
        <img
          src={image}
          alt={`${title} screenshot`}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onSelect, isSelected }) {
  const cardRef = useRef(null);
  const { hoveredSkill } = useHoveredSkill();
  const accent = project.color || "var(--color-accent-lime)";
  const isDimmed = hoveredSkill && !projectUsesSkill(project, hoveredSkill);
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={cardRef}
      layout
      variants={animationConfig.fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`group ${isDimmed ? "opacity-30" : "opacity-100"} transition-opacity duration-500`}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
        
        {/* Content Side */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-text-tertiary">
              {padIndex(index + 1)}
            </span>
            <div className="w-8 h-[1px] bg-border-subtle" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent-lime">
              {project.year}
            </span>
            {project.featured && (
              <>
                <div className="w-8 h-[1px] bg-border-subtle" />
                <span className="px-2 py-0.5 border border-accent-lime/30 font-mono text-[9px] uppercase tracking-wider text-accent-lime bg-accent-lime/5">
                  Featured
                </span>
              </>
            )}
          </div>

          <h3 className="font-serif text-5xl md:text-6xl text-white leading-tight tracking-wide mb-6 font-normal">
            {project.title}
          </h3>
          
          <p className="font-sans text-lg md:text-xl text-text-secondary font-light leading-relaxed mb-6">
            {project.summary}
          </p>

          {project.impact && (
            <div className="flex items-start gap-3 mb-8 p-4 bg-bg-secondary/50 border-l-2 border-accent-lime">
              <span className="font-mono text-xs text-text-tertiary uppercase tracking-widest mt-1 shrink-0">Impact</span>
              <p className="font-sans text-sm md:text-base text-text-primary leading-relaxed">
                {project.impact}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 border border-border-subtle font-mono text-[10px] uppercase tracking-widest text-text-tertiary"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onSelect(project, cardRef)}
              aria-expanded={isSelected}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono text-[10px] uppercase tracking-widest hover:bg-accent-lime hover:text-white transition-colors duration-300"
            >
              View Case Study <ArrowUpRight size={16} />
            </button>
            <ProjectGithubLinks project={project} accent={accent} compact={false} />
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full lg:w-1/2 relative">
          <button
            type="button"
            onClick={() => onSelect(project, cardRef)}
            className="block w-full relative aspect-[4/3] lg:aspect-square overflow-hidden bg-bg-secondary border border-border-subtle transition-transform duration-700 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 project-cover-grain z-10 pointer-events-none" />
            <img
              src={project.image}
              alt={`${project.title} - ${project.summary}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain p-8 lg:p-12 transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
            />
          </button>
        </div>
        
      </div>
    </motion.article>
  );
}

function ProjectDetail({ project, onClose, onPrev, onNext, hasPrev, hasNext, triggerRef }) {
  const panelRef = useRef(null);
  const accent = project.color || "var(--color-accent-lime)";
  const liveUrl = project.liveUrl || project.demo;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(timer);
  }, [project.id]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        ref={panelRef}
        key={project.id}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="relative w-full max-w-6xl max-h-[90vh] border border-border-subtle bg-bg-secondary overflow-y-auto shadow-2xl flex flex-col"
        style={{ borderTopColor: accent, borderTopWidth: 3 }}
      >
      {/* Panel toolbar */}
      <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-border-subtle bg-bg-primary/50">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className="w-9 h-9 flex items-center justify-center border border-border-subtle text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className="w-9 h-9 flex items-center justify-center border border-border-subtle text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-text-tertiary ml-2">
            Navigate
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            onClose();
            triggerRef.current?.focus();
          }}
          className="flex items-center gap-2 px-3 py-1.5 border border-border-subtle font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors"
        >
          <X size={14} />
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Screenshot side */}
        <div className="p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-primary/30">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrowserMockup
              image={project.image}
              url={liveUrl}
              title={project.title}
              accent={accent}
            />
          </motion.div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
            Live preview · {formatDisplayUrl(liveUrl) || "Not deployed"}
          </p>
        </div>

        {/* Content side */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: accent }}
            />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">
              {project.year} · Full-Stack MERN
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-text-primary tracking-wide mb-2 font-normal">
            {project.title}
          </h3>
          <p className="font-serif italic text-base sm:text-lg text-text-secondary mb-6">
            {project.summary}
          </p>

          {/* Case Study: Problem → Role/Decisions → Outcome */}
          <div className="mb-8 space-y-4">
            {project.problem && (
              <div className="p-4 bg-bg-primary/50 border-l-2 border-[#e07a5f]">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#e07a5f] mb-2">Problem</h4>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.roleDecisions && (
              <div className="p-4 bg-bg-primary/50 border-l-2 border-text-tertiary">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2">My Role & Decisions</h4>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">{project.roleDecisions}</p>
              </div>
            )}
            {project.outcome && (
              <div className="p-4 bg-bg-primary/50 border-l-2 border-accent-lime">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-lime mb-2">Outcome</h4>
                <p className="font-sans text-sm text-text-primary leading-relaxed">{project.outcome}</p>
              </div>
            )}
          </div>

          {project.features?.length > 0 && (
            <div className="mb-8">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
                Key features
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <span className="font-sans text-sm text-text-secondary font-light leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-8">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-3">
              Tech stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 border border-border-subtle font-mono text-[10px] uppercase tracking-[0.08em] text-text-tertiary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-border-subtle">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-3">
              Links
            </h4>
            <ProjectGithubLinks project={project} accent={accent} />
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);
  const triggerRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (filter === "ALL") return PROJECTS;
    return PROJECTS.filter((p) =>
      p.tech.some((t) => techMatches(t, filter))
    );
  }, [filter]);

  const selectedIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handleSelect = useCallback((project, ref) => {
    setSelectedProject((prev) => {
      if (prev?.id === project.id) {
        triggerRef.current = null;
        return null;
      }
      triggerRef.current = ref.current;
      return project;
    });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
    triggerRef.current?.focus();
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedProject(filteredProjects[selectedIndex - 1]);
    }
  }, [selectedIndex, filteredProjects]);

  const handleNext = useCallback(() => {
    if (selectedIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[selectedIndex + 1]);
    }
  }, [selectedIndex, filteredProjects]);

  useEffect(() => {
    setSelectedProject(null);
  }, [filter]);

  return (
    <>
      <SectionWrapper id="projects" hasBackground={true}>
      {/* Section header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 mb-12 md:mb-16 mt-12 md:mt-16 relative z-10">
        <motion.div
          variants={animationConfig.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-5 max-w-2xl"
        >
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-text-secondary border-b border-border-subtle pb-2 w-fit">
            — Selected Work
          </span>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white tracking-wide leading-[1.05] font-normal">
            Things I&apos;ve built
            <span className="italic text-text-secondary"> &amp; shipped.</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-text-secondary font-light leading-relaxed max-w-lg">
            Full-stack MERN projects with live deployments — from AI-powered
            platforms to real-time apps. Click a card to explore the build.
          </p>
        </motion.div>

        <motion.div
          variants={animationConfig.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-start lg:items-end gap-3 lg:pb-2"
        >
          <span className="font-mono text-[10px] md:text-xs text-text-tertiary uppercase tracking-widest">
            {filteredProjects.length} of {PROJECTS.length} projects
          </span>
          <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-wider">
            {PROJECTS.filter((p) => p.liveUrl || p.demo).length} live demos
          </span>
        </motion.div>
      </div>

      {/* Filter bar */}
      <motion.div
        variants={animationConfig.fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mb-10 md:mb-12"
      >
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {FILTERS.map((tech) => {
            const count =
              tech === "ALL"
                ? PROJECTS.length
                : PROJECTS.filter((p) =>
                    p.tech.some((t) => techMatches(t, tech))
                  ).length;
            const isActive = filter === tech;

            return (
              <button
                key={tech}
                type="button"
                onClick={() => setFilter(tech)}
                disabled={count === 0}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 border font-mono text-[10px] uppercase tracking-widest transition-colors disabled:opacity-30 disabled:pointer-events-none ${
                  isActive
                    ? "border-accent-lime bg-accent-lime text-white"
                    : "border-border-subtle text-text-tertiary hover:border-accent-lime hover:text-white bg-bg-secondary"
                }`}
              >
                {tech}
                <span
                  className={`text-[9px] ${isActive ? "text-white/70" : "text-text-tertiary"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Project grid */}
      <motion.div layout className="relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-32 pb-16"
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onSelect={handleSelect}
                  isSelected={selectedProject?.id === project.id}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center border border-dashed border-border-subtle"
            >
              <p className="font-mono text-sm uppercase tracking-widest text-text-tertiary">
                No projects match this filter
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>

    {/* Detail panel — full width below grid */}
    <AnimatePresence mode="wait">
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < filteredProjects.length - 1}
          triggerRef={triggerRef}
        />
      )}
    </AnimatePresence>
  </>
  );
}
