"use client";

import { useRef } from "react";
import { useScrollMarquee } from "@/hooks/use-scroll-marquee";

interface Logo {
  name: string;
  className: string;
}

export function ClientLogosMarquee({ logos }: { logos: Logo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  useScrollMarquee(trackRef);

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
