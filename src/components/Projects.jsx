import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { PROJECTS } from "../data/portfolio";
import { Github } from "./Icons";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

function ProjectCard({ project, index }) {
  const {
    title,
    description,
    features,
    tech,
    github,
    demo,
    liveUrl,
    frontendUrl,
    backendUrl,
    color,
    featured,
  } = project;
  const delay = (index % 2) * 0.08;

  return (
    <motion.article
      {...fadeUp(delay)}
      className="group relative flex flex-col rounded-2xl bg-bg-secondary border border-border-subtle hover:border-[var(--project-color)]/30 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 overflow-hidden hover:-translate-y-1.5"
      style={{ "--project-color": color }}
    >
      {/* Top Accent Stripe */}
      <div
        className="h-1 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-20"
        style={{ backgroundColor: color }}
      />

      {/* Project Image Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-bg-primary border-b border-border-subtle/50 z-10">
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent opacity-90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-bg-secondary/30 via-transparent to-transparent opacity-50 z-10" />

        {/* Lazy Loaded Image with smooth hover scale */}
        <img
          src={project.image}
          alt={`${title} Preview`}
          loading="lazy"
          className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"
        />
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-10">
        {/* Title and Featured Badge */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-text-primary font-display font-bold text-lg sm:text-xl leading-snug group-hover:text-accent-terracotta transition-colors duration-200">
            {title}
          </h3>
          {featured && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-sage/10 border border-accent-sage/20 text-accent-sage text-[10px] font-mono font-bold uppercase tracking-wider">
              <Star size={10} className="fill-accent-sage" />
              Core Project
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          {description}
        </p>

        {/* Key Features/Highlights - Recruiter-friendly addition */}
        <div className="mb-5 flex-1">
          <h4 className="text-text-tertiary text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
            Key Implementations
          </h4>
          <ul className="space-y-1.5">
            {features &&
              features.map((f, i) => (
                <li
                  key={i}
                  className="text-text-secondary/80 text-xs flex items-start gap-2"
                >
                  <span className="text-accent-terracotta mt-1 select-none">
                    •
                  </span>
                  <span>{f}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-bg-primary border border-border-subtle text-text-secondary hover:text-text-primary transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-border-subtle mt-auto w-full">
          {liveUrl || frontendUrl || backendUrl ? (
            <>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {frontendUrl && (
                  <a
                    href={frontendUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-bg-primary border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-tertiary hover:border-text-tertiary/20 transition-all duration-200"
                    aria-label={`View Frontend Source Code for ${title}`}
                  >
                    <Github size={13} />
                    Frontend Code
                  </a>
                )}
                {backendUrl && (
                  <a
                    href={backendUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-bg-primary border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-tertiary hover:border-text-tertiary/20 transition-all duration-200"
                    aria-label={`View Backend Source Code for ${title}`}
                  >
                    <Github size={13} />
                    Backend Code
                  </a>
                )}
              </div>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all duration-200 shadow-sm ml-auto w-full sm:w-auto justify-center sm:justify-start"
                  style={{
                    backgroundColor: `${color}15`,
                    borderColor: `${color}30`,
                    color: color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${color}25`;
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.boxShadow = `0 0 12px ${color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${color}15`;
                    e.currentTarget.style.borderColor = `${color}30`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  aria-label={`View Live Demo of ${title}`}
                >
                  Live Demo
                  <ExternalLink size={12} />
                </a>
              )}
            </>
          ) : (
            <>
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-bg-primary border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-tertiary hover:border-text-tertiary/20 transition-all duration-200"
                  aria-label={`View Source Code for ${title}`}
                >
                  <Github size={13} />
                  Source Code
                </a>
              )}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all duration-200 shadow-sm ml-auto w-full sm:w-auto justify-center sm:justify-start"
                  style={{
                    backgroundColor: `${color}15`,
                    borderColor: `${color}30`,
                    color: color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${color}25`;
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.boxShadow = `0 0 12px ${color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${color}15`;
                    e.currentTarget.style.borderColor = `${color}30`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  aria-label={`View Live Demo of ${title}`}
                >
                  Live Demo
                  <ExternalLink size={12} />
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-28 relative bg-bg-primary">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-accent-terracotta/3 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <p className="text-accent-terracotta text-xs font-semibold tracking-[3px] uppercase mb-4 font-mono">
            Portfolio
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Selected Work
            </h2>
            <a
              href="https://github.com/bhuvanesh-1703"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-accent-terracotta transition-colors duration-200 pb-1"
            >
              All Projects on GitHub
              <ExternalLink size={12} />
            </a>
          </div>
          <div className="w-12 h-1 bg-accent-terracotta rounded-full mt-4" />
        </motion.div>

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
