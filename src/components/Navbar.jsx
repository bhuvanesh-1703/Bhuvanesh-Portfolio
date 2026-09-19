import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { HERO, NAV_LINKS } from "../data/portfolio";
import { scrollToElement } from "../utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const reduceMotion = useReducedMotion();

  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  /* ------------------------------------------------
     SCROLLED STATE
  ------------------------------------------------ */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ------------------------------------------------
     ACTIVE SECTION INTERSECTION OBSERVER
  ------------------------------------------------ */
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ------------------------------------------------
     LOCK BODY SCROLL WHILE MOBILE MENU IS OPEN
  ------------------------------------------------ */
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  /* ------------------------------------------------
     ESCAPE TO CLOSE + FOCUS RETURN
  ------------------------------------------------ */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    menuRef.current?.querySelector("button, a")?.focus();
    const toggleEl = toggleRef.current;

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      toggleEl?.focus();
    };
  }, [open]);

  /* ------------------------------------------------
     FOCUS TRAP WHILE MENU IS OPEN
  ------------------------------------------------ */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll("button, a[href]");
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const nav = (href) => {
    setOpen(false);
    scrollToElement(href);
  };

  const goTop = () => {
    setOpen(false);
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const ask = () => {
    setOpen(false);
    window.dispatchEvent(new Event("open-chat"));
  };

  const headerMotion = reduceMotion
    ? {}
    : {
        initial: { y: -60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  const menuMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 },
      };

  return (
    <>
      <motion.header
        {...headerMotion}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl"
            : "py-6"
        }`}
      >
        <nav className="px-5 sm:px-10 md:px-16 lg:px-20 flex items-center justify-between">
          <button
            onClick={goTop}
            className="font-mono text-xs tracking-[.25em] uppercase text-white hover:text-accent transition-colors focus-visible:outline-none"
          >
            B / DEV
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => {
              const isActive = activeSection === l.href;
              return (
                <button
                  key={l.href}
                  onClick={() => nav(l.href)}
                  className={`cinema-kicker transition-colors relative py-1 ${
                    isActive ? "text-accent" : "text-white/65 hover:text-white"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            <button
              onClick={ask}
              className="cinema-kicker text-accent hover:opacity-80 transition-opacity inline-flex items-center gap-1.5"
            >
              <Sparkles size={12} className="animate-pulse" />
              ASK AI
            </button>

            <a
              href={HERO.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/90 hover:border-accent hover:text-accent transition-colors"
            >
              Resume
              <ArrowUpRight size={12} />
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="md:hidden text-white p-1 rounded-md hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            {...menuMotion}
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-x-0 top-0 z-40 min-h-[100svh] bg-[#050505] pt-28 px-6 md:hidden flex flex-col justify-between pb-12"
          >
            <div>
              <div className="cinema-kicker mb-8 text-accent">MENU / NAVIGATION</div>

              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((l, i) => (
                  <button
                    key={l.href}
                    onClick={() => nav(l.href)}
                    className={`text-left py-4 border-b border-white/10 cinema-display text-4xl sm:text-5xl transition-colors ${
                      activeSection === l.href ? "text-accent" : "text-white hover:text-accent"
                    }`}
                  >
                    <span className="font-mono text-sm tracking-widest opacity-40 mr-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 pt-8 border-t border-white/10">
              <button
                type="button"
                onClick={ask}
                className="font-mono text-xs uppercase tracking-widest text-accent inline-flex items-center gap-2"
              >
                <Sparkles size={14} />
                Ask AI
              </button>

              <a
                href={HERO.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-white/90 hover:text-accent inline-flex items-center gap-1"
              >
                Resume
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
