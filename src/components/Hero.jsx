import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, Mail, ChevronDown } from "lucide-react";
import { HERO } from "../data/portfolio";
import { scrollToElement } from "../utils";
import { animationConfig } from "./DesignSystem";

// Detect and numerically sort all 192 frame images inside hero image/video_frames_24fps/
const frameModules = import.meta.glob("../hero image/video_frames_24fps/*.png", {
  eager: true,
  import: "default",
});

const framePaths = Object.keys(frameModules)
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  )
  .map((key) => frameModules[key]);

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const loadedImagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [scrollStarted, setScrollStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [currentFrameNum, setCurrentFrameNum] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const { scrollY } = useScroll();

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const x = Math.round((e.clientX / window.innerWidth) * 100);
    const y = Math.round((e.clientY / window.innerHeight) * 100);
    setMousePos({ x, y });
  };

  // Check screen width & reduced motion preference
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", checkScreen);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  // Subtle scroll transforms for Hero content overlay
  const yText = useTransform(scrollY, [0, 1500], [0, isMobile ? 0 : 60]);
  const opacityText = useTransform(scrollY, [0, 1200, 1600], [1, 1, 0.5]);

  // High-DPI canvas render maintaining image aspect ratio without distortion
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = loadedImagesRef.current;
    let img = images[frameIndex];

    // Fallback to nearest loaded frame during rapid scroll
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = 1; i < framePaths.length; i++) {
        if (frameIndex - i >= 0 && images[frameIndex - i]?.complete) {
          img = images[frameIndex - i];
          break;
        }
        if (frameIndex + i < framePaths.length && images[frameIndex + i]?.complete) {
          img = images[frameIndex + i];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Calculate aspect-ratio contain/cover fit without distortion
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let renderW, renderH;
    if (canvasRatio > imgRatio) {
      renderW = displayWidth;
      renderH = displayWidth / imgRatio;
    } else {
      renderH = displayHeight;
      renderW = displayHeight * imgRatio;
    }

    const offsetX = (displayWidth - renderW) / 2;
    const offsetY = (displayHeight - renderH) / 2;

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  }, []);

  // Preload frame sequence with high priority on Frame 0
  useEffect(() => {
    let isMounted = true;
    const total = framePaths.length;
    const imageArray = new Array(total);
    loadedImagesRef.current = imageArray;

    if (total === 0) return;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = framePaths[0];
    firstImg.onload = () => {
      if (!isMounted) return;
      imageArray[0] = firstImg;
      drawFrame(0);
      setImagesLoaded(true);
    };

    // Preload remaining frames in sequence
    framePaths.forEach((src, idx) => {
      if (idx === 0) return;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!isMounted) return;
        imageArray[idx] = img;
        if (currentFrameRef.current === idx) {
          drawFrame(idx);
        }
      };
    });

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Scroll mapping to frame sequence using requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateFrameOnScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const scrolled = -rect.top;
    window.addEventListener("resize", handleResize);

    updateFrameOnScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, scrollStarted, prefersReducedMotion]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-[320vh] bg-bg-primary overflow-x-hidden"
    >
      {/* Full viewport sticky container pinned while frame sequence scrolls */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center px-6 sm:px-12 md:px-24">
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem",
          }}
        />

        {/* Cinematic Canvas Frame Sequence Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: imagesLoaded ? 0.7 : 0 }}
          />
        </div>

        {/* Gradient Scrim Overlay for crisp text legibility */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-bg-primary via-bg-primary/50 to-bg-primary/70" />

        {/* Hero Content Layer */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col items-start justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={animationConfig.staggerContainer}
              className="flex flex-col w-full max-w-4xl"
              style={{ y: yText, opacity: opacityText }}
            >
              {/* Status / Role Badge */}
              <motion.div variants={animationConfig.fadeUp} className="mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
                  <span className="relative flex h-2 w-2 ml-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="font-mono text-xs tracking-wider uppercase text-text-secondary">
                    Bhuvanesh • Full-Stack Developer
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div
                variants={animationConfig.fadeUp}
                className="flex flex-col gap-3 mb-6"
              >
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.05] tracking-tight text-white font-normal">
                  Engineering <span className="italic text-text-secondary">digital</span>{" "}
                  <br />
                  experiences <br />
                  with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-lime to-yellow-200 italic font-serif pr-2">
                    precision.
                  </span>
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                variants={animationConfig.fadeUp}
                className="font-sans text-base md:text-lg text-text-tertiary max-w-xl leading-relaxed mb-8"
              >
                {HERO.tagline}
              </motion.p>
            </motion.div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToElement("#projects", 100)}
                className="group relative px-6 py-3 bg-white text-black rounded-full font-medium text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 overflow-hidden shadow-lg shadow-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10">Explore Projects</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                />
              </button>

              <a
                href={HERO.resume.href}
                target="_blank"
                rel="noreferrer"
                className="group px-6 py-3 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full font-medium text-sm hover:bg-white/10 transition-all active:scale-[0.98] flex items-center gap-2"
              >
                <FileText
                  size={16}
                  className="text-text-tertiary group-hover:text-white transition-colors"
                />
                View Resume
              </a>

              <a
                href={`mailto:${HERO.social.email.replace("mailto:", "")}`}
                className="group px-6 py-3 bg-transparent text-white border border-white/10 rounded-full font-medium text-sm hover:bg-white/10 transition-all active:scale-[0.98] flex items-center gap-2"
              >
                <Mail
                  size={16}
                  className="transition-transform group-hover:scale-110"
                />
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500 pointer-events-none ${
            scrollStarted ? "opacity-0" : "opacity-80 hover:opacity-100"
          }`}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-text-tertiary uppercase">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-text-secondary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
