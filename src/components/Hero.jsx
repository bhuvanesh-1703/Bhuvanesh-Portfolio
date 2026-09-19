import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";
import { HERO } from "../data/portfolio";
import { scrollToElement } from "../utils";

/**
 * Scroll-scrubbed hero.
 *
 * The 192 frames live in  src/assets/hero-frames/  (WebP, ~12 MB total).
 * They're sorted by filename, so frame_000002 comes before frame_000010.
 * Scrolling drives a smoothed 0 → 1 progress value, and the canvas shows the
 * matching frame (neighbouring frames cross-fade for sub-frame smoothness).
 */
const modules = import.meta.glob("../assets/hero-frames/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

const FRAMES = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url);
const N = FRAMES.length;

// Total scroll length of the hero, in viewport heights (1 screen is the pinned view).
const SCROLL_VH = 400;

// Soft edge (px) used where the frame doesn't reach the screen edge (letterboxing).
const FEATHER = 72;

// Load every 16th frame first, then fill the gaps, so scrubbing works almost immediately.
const LOAD_ORDER = (() => {
  const seen = new Set();
  const order = [];
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < N; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
})();

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smoothstep = (v) => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const readyRef = useRef([]);
  const progressRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [loadedPct, setLoadedPct] = useState(N ? 0 : 100);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // The spring turns choppy wheel/trackpad steps into a smooth glide.
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0002,
  });

  /* ---------- canvas rendering ---------- */

  // Closest frame that has actually loaded (covers fast scrolling on slow networks).
  const nearest = useCallback((index) => {
    const ready = readyRef.current;
    for (let d = 0; d < N; d++) {
      if (ready[index - d]) return imagesRef.current[index - d];
      if (ready[index + d]) return imagesRef.current[index + d];
    }
    return null;
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !N) return;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    if (!cw || !ch) return;

    const p = clamp01(progressRef.current);
    const pos = p * (N - 1);
    const a = Math.floor(pos);
    const t = pos - a;

    const imgA = nearest(a);
    if (!imgA) return;
    const imgB = t > 0.001 && a + 1 < N ? nearest(a + 1) : null;

    const iw = imgA.naturalWidth;
    const ih = imgA.naturalHeight;
    const dpr = cw / (canvas.clientWidth || cw);

    // "contain" always shows the whole frame (needed at the end: the title spans the full width).
    // On screens narrower than 16:9 the frame starts zoomed-in on the person (only the black
    // sides are cropped) and pulls back to "contain" as the title lands.
    const contain = Math.min(cw / iw, ch / ih);
    const narrower = cw / ch < iw / ih;
    const focus = narrower ? Math.min(ch / ih, contain * 2.4) : contain;
    const pull = smoothstep((p - 0.45) / 0.4);
    const scale = focus + (contain - focus) * pull;

    const w = iw * scale;
    const h = ih * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(imgA, x, y, w, h);
    if (imgB && imgB !== imgA) {
      ctx.globalAlpha = t;
      ctx.drawImage(imgB, x, y, w, h);
      ctx.globalAlpha = 1;
    }

    // Feather any frame edge that sits inside the screen so there's never a visible seam.
    const f = Math.min(FEATHER * dpr, w * 0.06, h * 0.06);
    const fade = (x0, y0, x1, y1, rx, ry, rw, rh) => {
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, "rgba(5,5,5,1)");
      g.addColorStop(1, "rgba(5,5,5,0)");
      ctx.fillStyle = g;
      ctx.fillRect(rx, ry, rw, rh);
    };
    if (x > 1) fade(x, 0, x + f, 0, x, y, f, h);
    if (x + w < cw - 1) fade(x + w, 0, x + w - f, 0, x + w - f, y, f, h);
    if (y > 1) fade(0, y, 0, y + f, x, y, w, f);
    if (y + h < ch - 1) fade(0, y + h, 0, y + h - f, x, y + h - f, w, f);
  }, [nearest]);

  // Preload frames (coarse → fine).
  useEffect(() => {
    if (!N) return;
    let cancelled = false;
    let done = 0;
    imagesRef.current = new Array(N);
    readyRef.current = new Array(N).fill(false);

    LOAD_ORDER.forEach((index) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        imagesRef.current[index] = img;
        readyRef.current[index] = true;
        done += 1;
        if (done % 6 === 0 || done === N) setLoadedPct(Math.round((done / N) * 100));
        render();
      };
      img.src = FRAMES[index];
    });

    return () => {
      cancelled = true;
    };
  }, [render]);

  // Keep the canvas sharp and correctly sized.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      render();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [render]);

  // Reduced motion: no scrubbing, just show the finished composition.
  useEffect(() => {
    if (reduceMotion) {
      progressRef.current = 1;
      render();
    }
  }, [reduceMotion, render]);

  useMotionValueEvent(progress, "change", (v) => {
    if (reduceMotion) return;
    progressRef.current = v;
    render();
  });

  /* ---------- overlay choreography ---------- */
  const introOpacity = useTransform(progress, [0, 0.05, 0.1], [1, 1, 0]);
  const ctaOpacity = useTransform(progress, [0.86, 0.94], [0, 1]);
  const ctaY = useTransform(progress, [0.86, 0.94], [16, 0]);
  const ctaEvents = useTransform(progress, (v) => (v > 0.88 ? "auto" : "none"));
  const barScale = useTransform(progress, [0, 1], [0, 1]);

  const ctaStyle = reduceMotion
    ? { opacity: 1 }
    : { opacity: ctaOpacity, y: ctaY, pointerEvents: ctaEvents };

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{ height: reduceMotion ? "100svh" : `${SCROLL_VH}vh` }}
      className="relative bg-[#050505]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <h1 className="sr-only">Bhuvanesh — Full Stack Developer (MERN · AI · Automation)</h1>

        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Bhuvanesh walks toward the camera as his name, BHUVANESH, fills the screen"
          className="absolute inset-0 h-full w-full"
        />

        {import.meta.env.DEV && !N && (
          <p className="absolute top-24 left-1/2 -translate-x-1/2 z-20 cinema-kicker text-[#e34b32]">
            No frames found in src/assets/hero-frames/
          </p>
        )}

        {/* opening kicker + scroll hint */}
        {!reduceMotion && (
          <motion.div
            style={{ opacity: introOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-6 z-10 px-5 sm:px-10 md:px-16 lg:px-20"
          >
            <div className="mx-auto flex max-w-[1500px] items-center justify-between">
              <span className="cinema-kicker flex items-center gap-3">
                <ArrowDown size={14} className="animate-bounce text-[#91ff00]" />
                SCROLL TO EXPLORE
              </span>
              <span className="cinema-kicker hidden sm:block">PORTFOLIO / 2026</span>
            </div>
          </motion.div>
        )}

        {/* frame-loading indicator (disappears once everything is cached) */}
        {loadedPct < 100 && (
          <span className="cinema-kicker pointer-events-none absolute left-5 top-24 z-10 sm:left-10 md:left-16 lg:left-20">
            LOADING {loadedPct}%
          </span>
        )}

        {/* end-of-sequence actions */}
        <motion.div
          style={ctaStyle}
          className="absolute inset-x-0 bottom-6 z-20 flex flex-wrap justify-center gap-3 px-5 sm:inset-x-auto sm:right-8 sm:justify-end sm:px-0 md:right-12"
        >
          <button
            onClick={() => scrollToElement("#projects", 100)}
            className="inline-flex items-center gap-2.5 bg-[#91ff00] px-5 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-black transition-transform hover:scale-[1.03]"
          >
            View Work <ArrowUpRight size={14} />
          </button>
          <a
            href={HERO.resume.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 border border-white/25 bg-black/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-white/85 backdrop-blur-md transition-all hover:border-white/60 hover:text-white"
          >
            <FileText size={14} /> Resume
          </a>
          <button
            onClick={() => scrollToElement("#contact", 100)}
            className="inline-flex items-center gap-2.5 border border-white/25 bg-black/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-white/85 backdrop-blur-md transition-all hover:border-white/60 hover:text-white"
          >
            <Mail size={14} /> Contact
          </button>
        </motion.div>

        {/* scroll progress hairline */}
        {!reduceMotion && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-white/10">
            <motion.div style={{ scaleX: barScale }} className="h-full w-full origin-left bg-[#91ff00]" />
          </div>
        )}
      </div>
    </section>
  );
}
