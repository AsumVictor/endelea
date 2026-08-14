"use client";

import { useEffect, useRef } from "react";

interface Logo {
  name: string;
  className: string;
}

const BASE_SPEED = 0.5; // px per frame at rest
const SCROLL_BOOST = 0.8; // extra px per frame, per px of scroll delta
const MAX_SPEED = 8; // px per frame cap
const DECAY = 0.94; // per-frame ease back toward BASE_SPEED

export function ClientLogosMarquee({ logos }: { logos: Logo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let position = 0;
    let speed = BASE_SPEED;
    let lastScrollY = window.scrollY;
    let frame: number;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = Math.abs(y - lastScrollY);
      lastScrollY = y;
      speed = Math.min(speed + delta * SCROLL_BOOST, MAX_SPEED);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      const half = track.scrollWidth / 2;
      position += speed;
      if (half > 0 && position >= half) position -= half;
      track.style.transform = `translateX(-${position}px)`;

      speed = BASE_SPEED + (speed - BASE_SPEED) * DECAY;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const items = [...logos, ...logos];

  return (
    <div
      className="overflow-hidden bg-zinc-200/50 py-10"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center gap-20 pr-20 will-change-transform"
      >
        {items.map((logo, i) => (
          <span
            key={i}
            className={`shrink-0 text-2xl text-zinc-400 ${logo.className}`}
          >
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  );
}
