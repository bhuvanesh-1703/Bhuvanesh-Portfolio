import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Mail,
} from "lucide-react";

import { HERO } from "../data/portfolio";
import { scrollToElement } from "../utils";

/* =========================================================
   LOAD FRAMES
========================================================= */

const modules = {
  ...import.meta.glob("../hero-frames/*.webp", {
    eager: true,
    query: "?url",
    import: "default",
  }),

  ...import.meta.glob("../assets/hero-frames/*.webp", {
    eager: true,
    query: "?url",
    import: "default",
  }),
};

/* =========================================================
   SORT FRAMES NUMERICALLY
========================================================= */

const byName = new Map();

for (const [path, url] of Object.entries(modules)) {
  const filename = path.split("/").pop();

  byName.set(filename, url);
}

const FRAMES = [...byName.entries()]
  .sort(([a], [b]) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  )
  .map(([, url]) => url);

const N = FRAMES.length;

/* =========================================================
   FORWARD SCROLL
========================================================= */

const REVERSE_SCROLL = false;

/*
  400vh = long scroll animation
*/
const SCROLL_VH = 400;

const FEATHER = 72;

/* =========================================================
   LOAD ORDER

   ALWAYS FRAME 0 FIRST
========================================================= */

const LOAD_ORDER = (() => {
  if (!N) return [];

  const order = [];
  const seen = new Set();

  const add = (index) => {
    if (
      index >= 0 &&
      index < N &&
      !seen.has(index)
    ) {
      seen.add(index);
      order.push(index);
    }
  };

  /*
   IMPORTANT:
   Frame 000 first
  */
  add(0);

  /*
   Coarse loading
  */
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < N; i += step) {
      add(i);
    }
  }

  /*
   Make sure last frame exists
  */
  add(N - 1);

  return order;
})();

/* =========================================================
   HELPERS
========================================================= */

const clamp01 = (value) =>
  Math.min(1, Math.max(0, value));

const smoothstep = (value) => {
  const x = clamp01(value);

  return x * x * (3 - 2 * x);
};

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const imagesRef = useRef([]);
  const readyRef = useRef([]);

  /*
   ALWAYS START FROM ZERO
  */
  const progressRef = useRef(0);

  const reduceMotion = useReducedMotion();

  const [loadedPct, setLoadedPct] =
    useState(N ? 0 : 100);

  /* =======================================================
     SCROLL PROGRESS

     IMPORTANT:
     NO SPRING HERE
  ======================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,

    offset: [
      "start start",
      "end end",
    ],
  });

  /* =======================================================
     FIND NEAREST LOADED FRAME
  ======================================================= */

  const nearest = useCallback(
    (index) => {
      const ready = readyRef.current;

      if (!ready.length) {
        return null;
      }

      /*
       Exact frame first
      */
      if (ready[index]) {
        return imagesRef.current[index];
      }

      /*
       Search nearby
      */
      for (
        let distance = 1;
        distance < N;
        distance++
      ) {
        const left =
          index - distance;

        const right =
          index + distance;

        if (
          left >= 0 &&
          ready[left]
        ) {
          return imagesRef.current[left];
        }

        if (
          right < N &&
          ready[right]
        ) {
          return imagesRef.current[right];
        }
      }

      return null;
    },
    []
  );

  /* =======================================================
     RENDER FRAME
  ======================================================= */

  const render = useCallback(() => {
    const canvas =
      canvasRef.current;

    if (!canvas || !N) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const cw = canvas.width;
    const ch = canvas.height;

    if (!cw || !ch) {
      return;
    }

    /*
     * 0 = top
     * 1 = bottom
     */
    const p = clamp01(
      progressRef.current
    );

    /*
     * FORWARD SCROLL
     *
     * 0 → first frame
     * 1 → last frame
     */
    const fp =
      REVERSE_SCROLL
        ? 1 - p
        : p;

    /*
     * Convert progress to frame.
     */
    const position =
      fp * (N - 1);

    const currentIndex =
      Math.floor(position);

    const blend =
      position - currentIndex;

    const imgA =
      nearest(currentIndex);

    if (!imgA) {
      return;
    }

    const imgB =
      blend > 0.001 &&
      currentIndex + 1 < N
        ? nearest(
            currentIndex + 1
          )
        : null;

    const iw =
      imgA.naturalWidth;

    const ih =
      imgA.naturalHeight;

    if (!iw || !ih) {
      return;
    }

    const dpr =
      cw /
      (canvas.clientWidth || cw);

    /* =====================================================
       IMAGE SCALE
    ===================================================== */

    const contain =
      Math.min(
        cw / iw,
        ch / ih
      );

    const narrower =
      cw / ch <
      iw / ih;

    const focus =
      narrower
        ? Math.min(
            ch / ih,
            contain * 2.4
          )
        : contain;

    const pull =
      smoothstep(
        (fp - 0.45) / 0.4
      );

    const scale =
      focus +
      (contain - focus) *
        pull;

    const width =
      iw * scale;

    const height =
      ih * scale;

    const x =
      (cw - width) / 2;

    const y =
      (ch - height) / 2;

    /* =====================================================
       BACKGROUND
    ===================================================== */

    ctx.globalAlpha = 1;

    ctx.fillStyle =
      "#050505";

    ctx.fillRect(
      0,
      0,
      cw,
      ch
    );

    /* =====================================================
       FRAME A
    ===================================================== */

    ctx.drawImage(
      imgA,
      x,
      y,
      width,
      height
    );

    /* =====================================================
       FRAME B
    ===================================================== */

    if (
      imgB &&
      imgB !== imgA
    ) {
      ctx.globalAlpha =
        blend;

      ctx.drawImage(
        imgB,
        x,
        y,
        width,
        height
      );

      ctx.globalAlpha = 1;
    }

    /* =====================================================
       FEATHER
    ===================================================== */

    const feather =
      Math.min(
        FEATHER * dpr,
        width * 0.06,
        height * 0.06
      );

    const fade = (
      x0,
      y0,
      x1,
      y1,
      rx,
      ry,
      rw,
      rh
    ) => {
      const gradient =
        ctx.createLinearGradient(
          x0,
          y0,
          x1,
          y1
        );

      gradient.addColorStop(
        0,
        "rgba(5,5,5,1)"
      );

      gradient.addColorStop(
        1,
        "rgba(5,5,5,0)"
      );

      ctx.fillStyle =
        gradient;

      ctx.fillRect(
        rx,
        ry,
        rw,
        rh
      );
    };

    if (x > 1) {
      fade(
        x,
        0,
        x + feather,
        0,
        x,
        y,
        feather,
        height
      );
    }

    if (
      x + width <
      cw - 1
    ) {
      fade(
        x + width,
        0,
        x + width - feather,
        0,
        x + width - feather,
        y,
        feather,
        height
      );
    }

    if (y > 1) {
      fade(
        0,
        y,
        0,
        y + feather,
        x,
        y,
        width,
        feather
      );
    }

    if (
      y + height <
      ch - 1
    ) {
      fade(
        0,
        y + height,
        0,
        y + height - feather,
        x,
        y + height - feather,
        width,
        feather
      );
    }
  }, [nearest]);

  /* =======================================================
     PRELOAD
  ======================================================= */

  useEffect(() => {
    if (!N) {
      return;
    }

    let cancelled = false;

    let done = 0;

    imagesRef.current =
      new Array(N);

    readyRef.current =
      new Array(N).fill(false);

    /*
     * FORCE INITIAL FRAME = 0
     */
    progressRef.current = 0;

    LOAD_ORDER.forEach(
      (index) => {
        const img =
          new Image();

        img.decoding =
          "async";

        img.onload = () => {
          if (cancelled) {
            return;
          }

          imagesRef.current[
            index
          ] = img;

          readyRef.current[
            index
          ] = true;

          done++;

          /*
           * FRAME 0 LOADED
           *
           * Immediately show it.
           */
          if (index === 0) {
            progressRef.current = 0;

            requestAnimationFrame(
              () => {
                render();
              }
            );
          } else {
            render();
          }

          if (
            done % 6 === 0 ||
            done === N
          ) {
            setLoadedPct(
              Math.round(
                (done / N) * 100
              )
            );
          }
        };

        img.onerror = () => {
          if (cancelled) {
            return;
          }

          done++;

          if (
            done % 6 === 0 ||
            done === N
          ) {
            setLoadedPct(
              Math.round(
                (done / N) * 100
              )
            );
          }
        };

        img.src =
          FRAMES[index];
      }
    );

    return () => {
      cancelled = true;
    };
  }, [render]);

  /* =======================================================
     RESIZE
  ======================================================= */

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const resize = () => {
      const dpr =
        Math.min(
          window.devicePixelRatio ||
            1,
          2
        );

      canvas.width =
        Math.round(
          canvas.clientWidth *
            dpr
        );

      canvas.height =
        Math.round(
          canvas.clientHeight *
            dpr
        );

      render();
    };

    resize();

    const observer =
      new ResizeObserver(
        resize
      );

    observer.observe(canvas);

    return () =>
      observer.disconnect();
  }, [render]);

  /* =======================================================
     REDUCED MOTION
  ======================================================= */

  useEffect(() => {
    if (!reduceMotion) {
      return;
    }

    /*
     * Forward mode:
     * show final frame
     */
    progressRef.current = 1;

    render();
  }, [
    reduceMotion,
    render,
  ]);

  /* =======================================================
     SCROLL → FRAME
  ======================================================= */

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (value) => {
      if (reduceMotion) {
        return;
      }

      /*
       * Direct scroll value.
       *
       * Scroll DOWN:
       * 0 → 1
       *
       * Scroll UP:
       * 1 → 0
       */
      progressRef.current =
        clamp01(value);

      render();
    }
  );

  /* =======================================================
     OVERLAY
  ======================================================= */

  const introOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.05, 0.1],
      [1, 1, 0]
    );

  const ctaOpacity =
    useTransform(
      scrollYProgress,
      [0.86, 0.94],
      [0, 1]
    );

  const ctaY =
    useTransform(
      scrollYProgress,
      [0.86, 0.94],
      [16, 0]
    );

  const ctaEvents =
    useTransform(
      scrollYProgress,
      (value) =>
        value > 0.88
          ? "auto"
          : "none"
    );

  const barScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, 1]
    );

  const ctaStyle =
    reduceMotion
      ? { opacity: 1 }
      : {
          opacity:
            ctaOpacity,
          y: ctaY,
          pointerEvents:
            ctaEvents,
        };

  /* =======================================================
     JSX
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        height: reduceMotion
          ? "100svh"
          : `${SCROLL_VH}vh`,
      }}
      className="relative bg-[#050505]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">

        {/* ACCESSIBILITY */}

        <h1 className="sr-only">
          Bhuvanesh — Full Stack
          Developer
          (MERN · AI · Automation)
        </h1>

        {/* CANVAS */}

        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Bhuvanesh walks toward the camera as his name BHUVANESH fills the screen"
          className="absolute inset-0 h-full w-full"
        />

        {/* NO FRAMES */}

        {import.meta.env.DEV &&
          !N && (
            <p className="absolute left-1/2 top-24 z-20 -translate-x-1/2 cinema-kicker text-accent">
              No frames found in
              src/hero-frames/ or
              src/assets/hero-frames/
            </p>
          )}

        {/* OPENING */}

        {!reduceMotion && (
          <motion.div
            style={{
              opacity:
                introOpacity,
            }}
            className="pointer-events-none absolute inset-x-0 bottom-6 z-10 px-5 sm:px-10 md:px-16 lg:px-20"
          >
            <div className="mx-auto flex max-w-[1500px] items-center justify-between">

              <span className="cinema-kicker flex items-center gap-3">
                <ArrowDown
                  size={14}
                  className="animate-bounce text-accent"
                />

                SCROLL TO EXPLORE
              </span>

              <span className="cinema-kicker hidden sm:block">
                PORTFOLIO / 2026
              </span>

            </div>
          </motion.div>
        )}

        {/* LOADING */}

        {loadedPct < 100 && (
          <span className="cinema-kicker pointer-events-none absolute left-5 top-24 z-10 sm:left-10 md:left-16 lg:left-20">
            LOADING {loadedPct}%
          </span>
        )}

        {/* CTA */}

        <motion.div
          style={ctaStyle}
          className="absolute inset-x-0 bottom-6 z-20 flex flex-wrap justify-center gap-3 px-5 sm:inset-x-auto sm:right-8 sm:justify-end sm:px-0 md:right-12"
        >

          <button
            onClick={() =>
              scrollToElement(
                "#projects",
                100
              )
            }
            className="inline-flex items-center gap-2.5 bg-accent px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-black transition-transform hover:scale-[1.03]"
          >
            View Work

            <ArrowUpRight
              size={14}
            />
          </button>

          <a
            href={
              HERO.resume.href
            }
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 border border-white/25 bg-black/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-white/85 backdrop-blur-md transition-all hover:border-white/60 hover:text-white"
          >
            <FileText
              size={14}
            />

            Resume
          </a>

          <button
            onClick={() =>
              scrollToElement(
                "#contact",
                100
              )
            }
            className="inline-flex items-center gap-2.5 border border-white/25 bg-black/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-white/85 backdrop-blur-md transition-all hover:border-white/60 hover:text-white"
          >
            <Mail
              size={14}
            />

            Contact
          </button>

        </motion.div>

        {/* PROGRESS BAR */}

        {!reduceMotion && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-white/10">

            <motion.div
              style={{
                scaleX:
                  barScale,
              }}
              className="h-full w-full origin-left bg-accent"
            />

          </div>
        )}

      </div>
    </section>
  );
}