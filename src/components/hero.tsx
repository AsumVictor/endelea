"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import heroImage from "@/assets/hero-png.png";
import { StepsOverlay } from "@/components/steps-overlay";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M4 10h12m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MIN_HEIGHT_PERCENT = 9;
const MAX_HEIGHT_PERCENT = 35;

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      ticking = false;
      const section = sectionRef.current;
      if (!section) return;
      const height = section.offsetHeight || window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / height, 0), 1);
      setScrollProgress(progress);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen w-full overflow-hidden bg-black"
    >
      <Image
        src={heroImage}
        alt="Timber frame of a house under construction"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/35 to-black/10" />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
      {/* Extra top darkening so the transparent navbar stays legible over the photo */}
      <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-black/60 to-transparent" />

      <StepsOverlay
        count={3}
        minHeightPercent={lerp(MIN_HEIGHT_PERCENT, 100, scrollProgress)}
        maxHeightPercent={lerp(MAX_HEIGHT_PERCENT, 100, scrollProgress)}
        corner="bottom-right"
        color="#F4F2ED"
        showDividers
      />

      <div className="relative z-10 flex min-h-screen w-full items-center pr-6 pl-6 sm:pl-10 lg:pl-16">
        <div className="max-w-2xl py-32">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            We build what scales{" "}
            <span className="block text-[#D4EC3A]">Your Business.</span>
            <span className="block">Right. On. Time.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-200 sm:text-lg">
            We help SMEs cut operational waste, automate complex workflows,
            and launch scalable tech products. Our engineering team delivers
            custom software, AI pipelines, and IoT infrastructure with
            predictable timelines and measurable ROI.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#D4EC3A] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#c3da2f]"
            >
              Request a Bid
              <ArrowIcon />
            </a>
            <a
              href="#work"
              className="inline-flex items-center bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
