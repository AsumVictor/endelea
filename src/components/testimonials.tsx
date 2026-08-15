"use client";

import { useRef } from "react";
import { useScrollMarquee } from "@/hooks/use-scroll-marquee";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  cardBg: string;
  photoBg: string;
}

const row1: Testimonial[] = [
  {
    quote:
      "The kind of site that doesn’t rush. It feels considered, steady, and already trusted, like a business that’s been here longer than it needs to prove.",
    name: "Jessica Mercedes",
    title: "Chief Systems Officer",
    cardBg: "#F4EFE3",
    photoBg: "#8A97A6",
  },
  {
    quote:
      "Clear navigation. Familiar patterns. You understand business before you understand the details.",
    name: "Zofia Chrzanowska",
    title: "Director of First Impressions",
    cardBg: "#EDEDED",
    photoBg: "#B79C82",
  },
];

const row2: Testimonial[] = [
  {
    quote:
      "Nothing fights for attention. Every element has a reason to exist, and nothing is trying too hard.",
    name: "Władysława Szymańska",
    title: "Solutions Architect",
    cardBg: "#DCE3EA",
    photoBg: "#5B6B54",
  },
  {
    quote:
      "Growth, change, new chapters — all without friction. The structure adapts without breaking the story.",
    name: "Kazimiera Bednarska",
    title: "Lead Brand Evangelist",
    cardBg: "#EDEDED",
    photoBg: "#C77B4E",
  },
];

function TestimonialCard({ quote, name, title, cardBg }: Testimonial) {
  return (
    <div
      className="flex h-56 w-48 shrink-0 flex-col justify-between rounded-2xl p-4 sm:h-80 sm:w-72 sm:p-6 lg:h-105 lg:w-96 lg:p-8"
      style={{ backgroundColor: cardBg }}
    >
      <p className="text-xs leading-relaxed text-zinc-900 sm:text-base lg:text-lg">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <p className="text-sm font-semibold text-zinc-950 sm:text-base">
          {name}
        </p>
        <p className="text-xs text-zinc-500 sm:text-sm">{title}</p>
      </div>
    </div>
  );
}

function TestimonialRow({
  testimonials,
  reverse = false,
}: {
  testimonials: Testimonial[];
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  useScrollMarquee(trackRef, { reverse });

  const items = [...testimonials, ...testimonials];

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-4 will-change-transform sm:gap-6 lg:gap-10"
      >
        {items.map((t, i) => (
          <div key={i} className="flex shrink-0 gap-3 sm:gap-4 lg:gap-6">
            <div
              className="h-56 w-48 shrink-0 rounded-2xl sm:h-80 sm:w-72 lg:h-105 lg:w-96"
              style={{ backgroundColor: t.photoBg }}
            />
            <TestimonialCard {...t} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-[#E5E3E1] px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="h-2 w-2 bg-indigo-500" />
          <span className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
            Signals of trust
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-semibold text-zinc-950 sm:text-5xl">
          Endelea is not about overcomplicating your operations.
        </h2>
        <p className="mt-4 text-zinc-500">
          A reliable digital foundation for businesses that already work,
          built to support trust, operational proof, and long-term regional
          growth.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-6">
        <TestimonialRow testimonials={row1} />
        <TestimonialRow testimonials={row2} reverse />
      </div>
    </section>
  );
}
