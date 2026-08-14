type Corner = "bottom-left" | "bottom-right" | "top-left" | "top-right";

interface StepsOverlayProps {
  /** How many step columns to render. */
  count: number;
  /** Height of the shortest step, as a percent of the overlay's height. */
  minHeightPercent: number;
  /** Height of the tallest step, sitting nearest the corner, as a percent of the overlay's height. */
  maxHeightPercent: number;
  /** Which corner the steps hug and ascend toward. */
  corner?: Corner;
  /** Tailwind width classes applied to every step column. */
  stepWidthClassName?: string;
  /** Fill color for each step. */
  color?: string;
  /** Show a divider on the left edge of each step column. Off by default. */
  showDividers?: boolean;
  /** Divider color. Defaults to matching the step fill color. */
  dividerColor?: string;
  className?: string;
}

export function StepsOverlay({
  count,
  minHeightPercent,
  maxHeightPercent,
  corner = "bottom-right",
  stepWidthClassName = "w-[18vw] max-w-[260px]",
  color = "#F4F1E7",
  showDividers = false,
  dividerColor = color,
  className = "",
}: StepsOverlayProps) {
  const isBottom = corner.startsWith("bottom");
  const isRight = corner.endsWith("right");

  const heights = Array.from({ length: count }, (_, i) =>
    count === 1
      ? maxHeightPercent
      : minHeightPercent +
        (i / (count - 1)) * (maxHeightPercent - minHeightPercent)
  );
  // Steps are laid out left-to-right; ascend toward whichever side the corner is on.
  const ordered = isRight ? heights : [...heights].reverse();

  return (
    <div
      className={`absolute inset-y-0 z-10 flex ${isRight ? "right-0" : "left-0"} ${className}`}
    >
      {ordered.map((height, i) => (
        <div
          key={i}
          className={`flex h-full ${stepWidthClassName} ${isBottom ? "items-end" : "items-start"}`}
          style={
            showDividers ? { borderLeft: `1px solid ${dividerColor}` } : undefined
          }
        >
          <div
            className="w-full"
            style={{ height: `${height}%`, backgroundColor: color }}
          />
        </div>
      ))}
    </div>
  );
}
