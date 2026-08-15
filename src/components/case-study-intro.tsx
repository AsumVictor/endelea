"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import heroImage from "@/assets/hero-png.png";

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

const HOSPITALITY_EYEBROW = "Where it fits";
const HOSPITALITY_QUOTE =
  "Hospitality isn’t about adding more rooms. It’s about aligning what already welcomes. Through real-time availability and seamless booking, AquaView turned manual reservations into effortless stays.";

// Fraction of the pinned scroll range spent fading the cards out and
// growing the center one to fullscreen. The rest is a brief hold — just
// long enough to read the hospitality text — before the section unpins and
// normal scrolling reveals whatever comes next.
const PHASE_A_END = 0.8;
const WRAPPER_VH = 180;

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

export function CaseStudyIntro() {
  const wrapperRef = useRef<HTMLElement>(null);
  const fadeGroupRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const startRectRef = useRef<Rect | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const fadeGroup = fadeGroupRef.current;
    const centerCard = centerCardRef.current;
    const overlay = overlayRef.current;
    const quote = quoteRef.current;
    if (!wrapper || !sticky || !fadeGroup || !centerCard || !overlay || !quote)
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
      // The "stuck" scroll room is the wrapper's height minus the sticky
      // child's own height — not the viewport height, since the child is
      // now sized to its content rather than h-screen.
      const scrollableDistance = wrapper.offsetHeight - sticky.offsetHeight;
      if (scrollableDistance <= 0) return;

      const rectTop = wrapper.getBoundingClientRect().top;
      const raw = -rectTop / scrollableDistance;
      const overall = Math.min(Math.max(raw, 0), 1);

      // Once the hold ends (raw > 1), the sticky child stops being stuck and
      // needs to scroll its own height further to fully leave view. Track
      // that same distance here so the fixed overlay + quote slide up in
      // lockstep with it, instead of just vanishing in place.
      const extraScrolled = Math.max(-rectTop - scrollableDistance, 0);
      const exitProgress = Math.min(extraScrolled / sticky.offsetHeight, 1);
      const translateY = -exitProgress * 100;

      const start = startRectRef.current!;
      const fullscreen: Rect = { top: 0, left: 0, width: vw, height: vh };

      fadeGroup.style.opacity = `${1 - Math.min(overall / PHASE_A_END, 1)}`;

      const rect =
        overall <= PHASE_A_END
          ? lerpRect(start, fullscreen, overall / PHASE_A_END)
          : fullscreen;

      overlay.style.top = `${rect.top}px`;
      overlay.style.left = `${rect.left}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
      overlay.style.transform = `translateY(${translateY}%)`;
      overlay.style.opacity = raw > 0 && exitProgress < 1 ? "1" : "0";

      // No fade animation on the quote itself — it simply shows once the
      // zoom finishes, then scrolls away together with the overlay.
      quote.style.transform = `translateY(${translateY}%)`;
      quote.style.opacity = overall >= PHASE_A_END && exitProgress < 1 ? "1" : "0";
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
      <section
        ref={wrapperRef}
        style={{ height: `${WRAPPER_VH}vh` }}
        className="relative"
      >
        <div ref={stickyRef} className="sticky top-0 overflow-hidden bg-white">
          {/* Rest state: label, heading, 5 cards — fades out as the center one grows.
              Sized to its own content (not h-screen) so the section only needs to
              scroll its own height away once it unpins, instead of a full viewport. */}
          <div
            ref={fadeGroupRef}
            className="relative z-10 flex flex-col items-center justify-center bg-[#B7AC9C] px-6 py-20 sm:py-28"
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
        </div>
      </section>

      {/* Fixed overlay: the growing photo, driven entirely by scroll */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-20 overflow-hidden opacity-0"
      >
        <Image src={heroImage} alt="" fill sizes="100vw" className="object-cover" />
      </div>

      {/* Hospitality quote — a true sibling of the overlay so its z-index
          actually competes with it, rather than being trapped inside the
          sticky container's own stacking context. Appears once the zoom
          finishes; no animation of its own. */}
      <div
        ref={quoteRef}
        className="pointer-events-none fixed inset-0 z-30 flex flex-col items-center justify-center px-6 text-center opacity-0"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-indigo-500" />
          <span className="text-xs font-medium tracking-widest text-white/60 uppercase">
            {HOSPITALITY_EYEBROW}
          </span>
        </div>
        <p className="mt-6 max-w-4xl font-serif text-3xl leading-snug text-white/70 sm:text-5xl">
          {HOSPITALITY_QUOTE}
        </p>
      </div>
    </>
  );
}
