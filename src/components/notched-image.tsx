"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

// Cuts an ascending-steps notch out of the bottom-left corner, mirroring the
// StepsOverlay motif used elsewhere on the page. Each stage below shares the
// same 8 points so the browser can smoothly interpolate clip-path between
// them; only the y-values of the step points move.
const STAGE_CLIP_PATHS = [
  // 0: flat rectangle, no notch yet
  "polygon(0% 0%, 100% 0%, 100% 100%, 51% 100%, 51% 100%, 25% 100%, 25% 100%, 0% 100%)",
  // 1: first (wider, shorter) step rises in
  "polygon(0% 0%, 100% 0%, 100% 100%, 51% 100%, 51% 76%, 25% 76%, 25% 76%, 0% 76%)",
  // 2: second (narrower, deeper) step cuts in after the first
  "polygon(0% 0%, 100% 0%, 100% 100%, 51% 100%, 51% 76%, 25% 76%, 25% 65%, 0% 65%)",
] as const;

const STAGE_TRANSITION_MS = 550;
const STAGE_STAGGER_MS = 650;

interface NotchedImageProps {
  src: StaticImageData;
  alt: string;
  objectPosition?: string;
  className?: string;
  /** Reveal the steps one at a time once the image scrolls into view. */
  animateReveal?: boolean;
}

export function NotchedImage({
  src,
  alt,
  objectPosition,
  className = "",
  animateReveal = false,
}: NotchedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(animateReveal ? 0 : 2);

  useEffect(() => {
    if (!animateReveal) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(2);
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setStage(1);
        timeouts.push(setTimeout(() => setStage(2), STAGE_STAGGER_MS));
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [animateReveal]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        clipPath: STAGE_CLIP_PATHS[stage],
        transition: animateReveal
          ? `clip-path ${STAGE_TRANSITION_MS}ms ease-out`
          : undefined,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
