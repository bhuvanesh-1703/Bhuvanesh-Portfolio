import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

function ProjectCard({ project, index }) {
  const { title, description, tech, github, demo, color, featured } = project;
  const delay = (index % 2) * 0.1;

  return (
    <motion.article
      {...fadeUp(delay)}
      className={`group relative flex flex-col rounded-2xl bg-[#0f0f1a] border transition-all duration-300 overflow-hidden ${
        featured
          ? 'border-white/[0.1] hover:border-white/[0.18]'
          : 'border-white/[0.06] hover:border-white/[0.12]'
      }`}
      style={{ '--project-color': color }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {/* Color stripe top */}
      <div
        className="h-0.5 w-full opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      {/* Mock browser preview */}
      <div className="relative h-40 overflow-hidden bg-[#080810]">
        {/* Fake browser chrome */}
        <div className="absolute top-3 left-4 flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="absolute top-2.5 left-14 right-14 h-3.5 bg-white/[0.04] rounded" />

        {/* Decorative code-preview grid */}
        <div className="absolute inset-0 top-10 p-4 flex flex-col gap-2 opacity-30 group-hover:opacity-50 transition-opacity">
          {[80, 60, 90, 40, 70].map((w, i) => (
            <div
              key={i}
              className="h-2 rounded-full"
              style={{
                width: `${w}%`,
                background: `linear-gradient(90deg, ${color}60, transparent)`,
                marginLeft: i % 2 === 1 ? '16px' : '0',
              }}
            />
          ))}
        </div>

        {/* Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 100%, ${color}15 0%, transparent 70%)` }}
        />

        {featured && (
          <div className="absolute top-3 right-4 flex items-center gap-1 px-2 py-1 bg-amber-500/15 border border-amber-500/25 rounded-md">
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <span className="text-amber-400 text-[10px] font-semibold uppercase tracking-wider">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-lg mb-2.5 leading-snug">{title}</h3>
        <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">{description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/[0.05] border border-white/[0.07] text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${title} GitHub`}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors duration-150"
          >
            <Github size={15} />
            Source
          </a>
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
            aria-label={`${title} Live Demo`}
            className="flex items-center gap-1.5 text-sm font-medium ml-auto transition-colors duration-150"
            style={{ color: `${color}cc` }}
            onMouseEnter={(e) => e.currentTarget.style.color = color}
            onMouseLeave={(e) => e.currentTarget.style.color = `${color}cc`}
          >
            Live Demo
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative bg-[#080810]">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Portfolio</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Selected Projects
            </h2>
            <a
              href="https://github.com/bhuvanesh"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-violet-400 transition-colors pb-1"
            >
              All projects on GitHub
              <ExternalLink size={13} />
            </a>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}