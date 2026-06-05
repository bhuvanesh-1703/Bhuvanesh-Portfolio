import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code } from "lucide-react";
import { NAV_LINKS } from "../data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Dynamic active section detection
      const sections = NAV_LINKS.map((link) =>
        document.querySelector(link.href),
      );
      const scrollPos = window.scrollY + 100;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActive(NAV_LINKS[i].href);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3.5 bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle"
            : "py-6 bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-terracotta to-accent-sage flex items-center justify-center shadow-lg shadow-accent-terracotta/10 transition-transform group-hover:scale-105 duration-200">
              <Code size={18} className="text-bg-primary stroke-[2.5]" />
            </div>
            <span className="font-display font-bold text-text-primary tracking-tight text-lg group-hover:text-accent-terracotta transition-colors duration-200">
              Bhuvanesh
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                    active === link.href
                      ? "text-accent-terracotta"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/[0.04] border border-white/[0.06] rounded-lg"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Hire CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#contact");
              }}
              className="px-4 py-2 text-sm font-medium text-text-primary hover:text-accent-terracotta border border-border-subtle hover:border-accent-terracotta/40 hover:bg-accent-terracotta/[0.04] rounded-xl transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary p-2 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-border-subtle transition-all duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 mx-6 p-4 bg-bg-secondary/95 backdrop-blur-xl border border-border-subtle rounded-2xl shadow-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-150 cursor-pointer ${
                      active === link.href
                        ? "text-accent-terracotta bg-white/[0.04]"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/[0.02]"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-border-subtle mt-1.5">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav("#contact");
                  }}
                  className="block text-center px-4 py-3 text-sm font-medium text-accent-terracotta bg-accent-terracotta/[0.06] border border-accent-terracotta/20 hover:bg-accent-terracotta/[0.1] rounded-xl transition-all duration-200"
                >
                  Contact Me →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
