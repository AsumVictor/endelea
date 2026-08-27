import { useEffect, type RefObject } from "react";

const SPEED = 0.4; // px per frame while idle

/**
 * Drives a track element (expected to contain its content duplicated once,
 * back to back) in a continuous, seamless horizontal loop — never stopping,
 * never leaving a gap, since wrapping happens purely at render time against
 * whatever the current position is. Pauses on hover or keyboard focus, and
 * lets the user grab and drag it to look through the content at their own
 * pace; releasing resumes the drift from wherever the drag left it.
 */
export function useMarquee(
  trackRef: RefObject<HTMLDivElement | null>,
  { reverse = false }: { reverse?: boolean } = {}
) {
  useEffect(() => {
    const track = trackRef.current;
    const container = track?.parentElement;
    if (!track || !container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let position = 0;
    let paused = false;
    let dragging = false;
    let moved = false;
    let dragStartX = 0;
    let dragStartPosition = 0;
    let frame: number;

    container.style.cursor = "grab";

    const tick = () => {
      if (!reducedMotion && !paused && !dragging) {
        position += reverse ? SPEED : -SPEED;
      }
      // `position` accumulates freely (drag sets it directly to
      // dragStartPosition + dx) — only the value used for the transform
      // gets wrapped, computed fresh each frame from whatever `position`
      // currently is. Wrapping `position` itself would fight drag's direct
      // assignment on the very next frame and cause a visible snap/flicker.
      const half = track.scrollWidth / 2;
      let rendered = position;
      if (half > 0) {
        rendered = (((position % half) + half) % half) - half;
      }
      track.style.transform = `translateX(${rendered}px)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    const onFocusIn = () => {
      paused = true;
    };
    const onFocusOut = () => {
      paused = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      dragStartX = e.clientX;
      dragStartPosition = position;
      container.setPointerCapture(e.pointerId);
      container.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 3) moved = true;
      position = dragStartPosition + dx;
    };
    const endDrag = () => {
      dragging = false;
      container.style.cursor = "grab";
    };
    // Dragging shouldn't also fire a click on whatever's underneath the pointer.
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("focusin", onFocusIn);
    container.addEventListener("focusout", onFocusOut);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);
    container.addEventListener("click", onClickCapture, true);

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("focusin", onFocusIn);
      container.removeEventListener("focusout", onFocusOut);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", endDrag);
      container.removeEventListener("pointercancel", endDrag);
      container.removeEventListener("click", onClickCapture, true);
    };
  }, [trackRef, reverse]);
}
