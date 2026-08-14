import Image, { type StaticImageData } from "next/image";
import { PauseIcon } from "@/components/icons";

interface CaseStudyHeroProps {
  eyebrow: string;
  quote: string;
  image: StaticImageData;
  imageAlt: string;
  objectPosition?: string;
}

export function CaseStudyHero({
  eyebrow,
  quote,
  image,
  imageAlt,
  objectPosition,
}: CaseStudyHeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-[#3a1f26]/60 to-[#2a1216]/90" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-indigo-500" />
          <span className="text-xs font-medium tracking-widest text-white/60 uppercase">
            {eyebrow}
          </span>
        </div>

        <p className="mt-6 max-w-4xl font-serif text-3xl leading-snug text-white/70 sm:text-5xl">
          {quote}
        </p>
      </div>

      <button
        type="button"
        aria-label="Pause background"
        className="absolute right-6 bottom-6 z-10 flex h-9 w-9 items-center justify-center bg-black/40 text-white transition-colors hover:bg-black/60"
      >
        <PauseIcon className="h-3.5 w-3.5" />
      </button>
    </section>
  );
}
