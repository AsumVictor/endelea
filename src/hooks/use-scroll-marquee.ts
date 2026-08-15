import { useEffect, type RefObject } from "react";

const BASE_SPEED = 0.5; // px per frame at rest
const SCROLL_BOOST = 0.8; // extra px per frame, per px of scroll delta
const MAX_SPEED = 8; // px per frame cap
const DECAY = 0.94; // per-frame ease back toward BASE_SPEED

/**
 * Drives a track element (expected to contain its content duplicated once,
 * back to back) in a continuous horizontal loop, speeding up whenever the
 * page is scrolled and easing back down to a slow drift otherwise.
 */
export function useScrollMarquee(
  trackRef: RefObject<HTMLDivElement | null>,
  { reverse = false }: { reverse?: boolean } = {}
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
      const offset = reverse ? position - half : -position;
      track.style.transform = `translateX(${offset}px)`;

      speed = BASE_SPEED + (speed - BASE_SPEED) * DECAY;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [trackRef, reverse]);
}
