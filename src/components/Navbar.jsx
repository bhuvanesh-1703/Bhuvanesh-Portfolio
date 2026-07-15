import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Sparkles } from "lucide-react";
import { NAV_LINKS, HERO } from "../data/portfolio";
import { Github } from "./Icons";
import { scrollToElement } from "../utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const observerRef = useRef(null);

  // Scroll detection for navbar background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: IntersectionObserver updates active state based on which section is visible
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    scrollToElement(href);
  };

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat"));
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-bg-primary/70 backdrop-blur-2xl border-b border-white/[0.03] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "py-8 bg-transparent"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-serif text-2xl md:text-3xl tracking-wide text-text-primary transition-all duration-300 hover:text-accent-lime"
          >
            Bhuvanesh.
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`font-mono text-xs lg:text-sm tracking-widest uppercase transition-colors duration-300 ${
                    active === link.href
                      ? "text-white font-bold"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={openChat}
              className="group inline-flex items-center gap-2 px-4 py-2 border border-border-subtle text-text-secondary hover:text-text-primary hover:border-[#e07a5f] hover:text-[#e07a5f] font-mono text-[10px] uppercase tracking-widest transition-colors duration-300"
            >
              Ask AI
              <Sparkles size={12} className="transition-transform group-hover:scale-110" />
            </button>
            <a
              href={HERO.resume.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 bg-text-primary text-bg-primary hover:bg-accent-lime hover:text-bg-primary font-mono text-[10px] uppercase tracking-widest transition-colors duration-300"
            >
              Resume
              <FileText size={12} className="transition-transform group-hover:scale-110" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              className="text-text-primary transition-colors p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle overflow-hidden md:hidden"
          >
            <ul className="flex flex-col py-8 px-6 gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-text-primary transition-colors min-h-[48px] flex items-center"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openChat();
                  }}
                  className="inline-flex items-center gap-3 font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#e07a5f] transition-colors min-h-[48px]"
                >
                  Ask AI <Sparkles size={24} />
                </button>
              </li>
              <li>
                <a
                  href={HERO.social.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-3 font-sans text-3xl sm:text-4xl font-bold tracking-tight text-text-primary transition-colors min-h-[48px]"
                >
                  GitHub <Github size={24} />
                </a>
              </li>
              <li>
                <a
                  href={HERO.resume.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-3 font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#e07a5f] transition-colors min-h-[48px]"
                >
                  Resume <FileText size={24} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
