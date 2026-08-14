"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import heroImage from "@/assets/hero-png.png";
import { ArrowRightIcon } from "@/components/icons";

// Outer 4 cards stay static color blocks; the center one is the real photo
// that grows into a fullscreen "video-style" moment as the user scrolls.
const CENTER_INDEX = 2;
const photos = [
  { color: "#D8CFC0", offset: "translate-y-4 sm:translate-y-6 lg:translate-y-10" },
  { color: "#8D9B87", offset: "translate-y-1.5 sm:translate-y-2 lg:translate-y-3" },
  { color: null, offset: "-translate-y-1.5 sm:-translate-y-2 lg:-translate-y-4" },
  { color: "#C9A876", offset: "translate-y-1.5 sm:translate-y-2 lg:translate-y-3" },
  { color: "#6E7B8B", offset: "translate-y-4 sm:translate-y-6 lg:translate-y-10" },
];

const lines = [
  "You don’t need a total overhaul just to move forward.",
  "You just need the right systems in place.",
  "Let’s collaborate to build, automate, and scale.",
];

// Fractions of the pinned scroll range.
const PHASE_A_END = 0.32; // cards+heading fade out, center card grows to fullscreen
const PHASE_B_END = 0.72; // fullscreen hold, text lines cross-fade over it
// PHASE_B_END -> 1: shrinks to a banner, stats section reveals beneath
const WRAPPER_VH = 480;
const BANNER_HEIGHT_RATIO = 0.45;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function lerpRect(a: Rect, b: Rect, t: number): Rect {
  return {
    top: a.top + (b.top - a.top) * t,
    left: a.left + (b.left - a.left) * t,
    width: a.width + (b.width - a.width) * t,
    height: a.height + (b.height - a.height) * t,
  };
}

function lineOpacity(progress: number, index: number, count: number) {
  const segStart = index / count;
  const segEnd = (index + 1) / count;
  const local = Math.min(Math.max((progress - segStart) / (segEnd - segStart), 0), 1);
  if (local < 0.25) return local / 0.25;
  if (local > 0.75) return (1 - local) / 0.25;
  return 1;
}

export function CaseStudyIntro() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fadeGroupRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const finalVideoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const startRectRef = useRef<Rect | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const fadeGroup = fadeGroupRef.current;
    const centerCard = centerCardRef.current;
    const overlay = overlayRef.current;
    const finalVideo = finalVideoRef.current;
    const stats = statsRef.current;
    if (
      !wrapper ||
      !sticky ||
      !fadeGroup ||
      !centerCard ||
      !overlay ||
      !finalVideo ||
      !stats
    )
      return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotionRef.current) return;

    // Measured relative to the sticky container, not the viewport — this
    // stays correct no matter where on the page the container currently is,
    // avoiding a stale measurement from before the section has scrolled
    // into view.
    const captureStartRect = () => {
      const containerRect = sticky.getBoundingClientRect();
      const cardRect = centerCard.getBoundingClientRect();
      startRectRef.current = {
        top: cardRect.top - containerRect.top,
        left: cardRect.left - containerRect.left,
        width: cardRect.width,
        height: cardRect.height,
      };
    };
    captureStartRect();

    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const scrollableDistance = wrapper.offsetHeight - vh;
      if (scrollableDistance <= 0) return;

      const rectTop = wrapper.getBoundingClientRect().top;
      const raw = -rectTop / scrollableDistance;
      const overall = Math.min(Math.max(raw, 0), 1);

      const start = startRectRef.current!;
      const fullscreen: Rect = { top: 0, left: 0, width: vw, height: vh };
      const banner: Rect = { top: 0, left: 0, width: vw, height: vh * BANNER_HEIGHT_RATIO };

      fadeGroup.style.opacity = `${1 - Math.min(overall / PHASE_A_END, 1)}`;

      let rect: Rect;
      if (overall <= PHASE_A_END) {
        rect = lerpRect(start, fullscreen, overall / PHASE_A_END);
      } else if (overall <= PHASE_B_END) {
        rect = fullscreen;
      } else {
        const phaseC = (overall - PHASE_B_END) / (1 - PHASE_B_END);
        rect = lerpRect(fullscreen, banner, phaseC);
      }

      overlay.style.top = `${rect.top}px`;
      overlay.style.left = `${rect.left}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
      overlay.style.opacity = raw > 0 && raw < 1 ? "1" : "0";

      const textProgress = Math.min(
        Math.max((overall - PHASE_A_END) / (PHASE_B_END - PHASE_A_END), 0),
        1
      );
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = `${lineOpacity(textProgress, i, lines.length)}`;
      });

      const phaseC = Math.min(
        Math.max((overall - PHASE_B_END) / (1 - PHASE_B_END), 0),
        1
      );
      const statsProgress = Math.min(Math.max((phaseC - 0.3) / 0.7, 0), 1);
      stats.style.opacity = `${statsProgress}`;
      stats.style.transform = `translateY(${(1 - statsProgress) * 32}px)`;
      finalVideo.style.opacity = phaseC >= 0.97 ? "1" : "0";
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    const onResize = () => {
      captureStartRect();
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
    <div ref={wrapperRef} style={{ height: `${WRAPPER_VH}vh` }} className="relative">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        {/* Rest state: label, heading, 5 cards — fades out as the center one grows */}
        <div
          ref={fadeGroupRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#B7AC9C] px-6"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-widest text-[#4B453C] uppercase">
              Ready to scale?
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2B271F] italic sm:text-4xl">
              Built for impact. Engineered for growth.
            </h2>
          </div>

          <div className="mt-14 flex items-center justify-center gap-2 sm:mt-16 sm:gap-3 lg:gap-5">
            {photos.map((photo, i) =>
              i === CENTER_INDEX ? (
                <div
                  key={i}
                  ref={centerCardRef}
                  className={`relative h-16 w-10 shrink-0 overflow-hidden sm:h-32 sm:w-20 lg:h-56 lg:w-40 ${photo.offset}`}
                >
                  <Image
                    src={heroImage}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  key={i}
                  className={`h-16 w-10 shrink-0 sm:h-32 sm:w-20 lg:h-56 lg:w-40 ${photo.offset}`}
                  style={{ backgroundColor: photo.color ?? undefined }}
                />
              )
            )}
          </div>
        </div>

        {/* Final resting content: banner photo + stats, revealed as the overlay shrinks */}
        <div className="absolute inset-0 z-0 flex flex-col">
          <div ref={finalVideoRef} className="relative opacity-0" style={{ height: `${BANNER_HEIGHT_RATIO * 100}%` }}>
            <Image src={heroImage} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div
            ref={statsRef}
            className="flex flex-1 flex-col justify-center bg-[#2a1216] px-6 py-10 opacity-0 sm:px-10 lg:px-16"
          >
            <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
              <p className="max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
                This isn&rsquo;t about a total overhaul. It&rsquo;s the right
                systems, in place, so you can build, automate, and scale.
              </p>

              <div className="flex gap-8">
                <div>
                  <p className="text-xs tracking-widest text-white/50 uppercase">
                    Projects Shipped
                  </p>
                  <p className="mt-2 font-serif text-4xl text-white sm:text-5xl">
                    40+
                  </p>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-white/50 uppercase">
                    Repeat Clients
                  </p>
                  <p className="mt-2 font-serif text-4xl text-white sm:text-5xl">
                    90%
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#request-service"
              className="mt-8 inline-flex w-fit items-center gap-2 bg-[#D4EC3A] px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#c3da2f]"
            >
              Request a Service
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Fixed overlay: the growing/shrinking photo, driven entirely by scroll */}
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-20 overflow-hidden opacity-0"
    >
      <Image src={heroImage} alt="" fill sizes="100vw" className="object-cover" />
    </div>

    {/* Text lines cross-fade over the fullscreen photo — a true sibling of
        the overlay so its z-index actually competes with it, rather than
        being trapped inside the sticky container's own stacking context. */}
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center px-6 text-center">
      {lines.map((line, i) => (
        <p
          key={line}
          ref={(el) => {
            lineRefs.current[i] = el;
          }}
          className="absolute max-w-3xl font-serif text-2xl text-white opacity-0 sm:text-4xl"
        >
          {line}
        </p>
      ))}
    </div>
    </>
  );
}
