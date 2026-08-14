"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

function parseValue(value: string) {
  const match = value.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", target: 0, decimals: 0, suffix: value };
  const [, prefix, numberStr, suffix] = match;
  const decimals = numberStr.includes(".") ? numberStr.split(".")[1].length : 0;
  return { prefix, target: parseFloat(numberStr), decimals, suffix };
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function CountUp({ value, duration = 1400, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, target, decimals, suffix } = parseValue(value);
  const [display, setDisplay] = useState(`${prefix}${(0).toFixed(decimals)}${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const current = target * easeOutExpo(t);
          setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, target, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
