"use client";

import { useEffect, useRef, useState } from "react";

interface HighlightTextProps {
  text: string;
  highlights: string[];
  className?: string;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function HighlightText({
  text,
  highlights,
  className = "",
}: HighlightTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const terms = highlights.filter(Boolean);
  const pattern = terms
    .slice()
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");
  const parts = pattern ? text.split(new RegExp(`(${pattern})`, "gi")) : [text];

  let highlightIndex = -1;

  return (
    <p ref={ref} className={className}>
      {parts.map((part, i) => {
        const isHighlight = terms.some(
          (term) => term.toLowerCase() === part.toLowerCase()
        );
        if (!isHighlight) return <span key={i}>{part}</span>;

        highlightIndex++;
        return (
          <span
            key={i}
            className={`box-decoration-clone font-semibold transition-all duration-700 ease-out ${
              visible ? "bg-[#D4EC3A]/40 text-zinc-950" : "bg-transparent"
            }`}
            style={{ transitionDelay: `${highlightIndex * 150}ms` }}
          >
            {part}
          </span>
        );
      })}
    </p>
  );
}
