import Image from "next/image";
import heroImage from "@/assets/hero-png.png";

const photos = [
  { color: "#D8CFC0", offset: "translate-y-4 sm:translate-y-6 lg:translate-y-10" },
  { color: "#8D9B87", offset: "translate-y-1.5 sm:translate-y-2 lg:translate-y-3" },
  { color: null, offset: "-translate-y-1.5 sm:-translate-y-2 lg:-translate-y-4" },
  { color: "#C9A876", offset: "translate-y-1.5 sm:translate-y-2 lg:translate-y-3" },
  { color: "#6E7B8B", offset: "translate-y-4 sm:translate-y-6 lg:translate-y-10" },
];

const CENTER_INDEX = 2;

export function CaseStudyIntro() {
  return (
    <section className="bg-[#B7AC9C] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium tracking-widest text-[#4B453C] uppercase">
          Ready to scale?
        </p>
        <h2 className="mt-3 font-serif text-3xl text-[#2B271F] italic sm:text-4xl">
          Built for impact. Engineered for growth.
        </h2>
      </div>

      <div className="mt-14 flex items-center justify-center gap-2 sm:mt-16 sm:gap-3 lg:gap-5">
        {photos.map((photo, i) =>
          i === CENTER_INDEX ? (
            <div
              key={i}
              className={`relative h-16 w-10 shrink-0 overflow-hidden sm:h-32 sm:w-20 lg:h-56 lg:w-40 ${photo.offset}`}
            >
              <Image
                src={heroImage}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              key={i}
              className={`h-16 w-10 shrink-0 sm:h-32 sm:w-20 lg:h-56 lg:w-40 ${photo.offset}`}
              style={{ backgroundColor: photo.color ?? undefined }}
            />
          )
        )}
      </div>
    </section>
  );
}
