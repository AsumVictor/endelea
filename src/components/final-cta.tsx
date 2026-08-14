import Image from "next/image";
import heroImage from "@/assets/hero-png.png";
import { ArrowRightIcon } from "@/components/icons";

export function FinalCta() {
  return (
    <section className="relative flex min-h-[520px] w-full items-end overflow-hidden bg-black">
      <Image
        src={heroImage}
        alt="Endelea team on a build site"
        fill
        className="object-cover"
        style={{ objectPosition: "30% 40%" }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      <div className="relative z-10 w-full px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <h2 className="text-4xl leading-tight font-semibold tracking-tight text-white sm:text-6xl">
          We Build It
          <br />
          Right. On Time.
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 bg-[#D4EC3A] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#c3da2f]"
          >
            Request a Bid
            <ArrowRightIcon />
          </a>
          <a
            href="#work"
            className="inline-flex items-center bg-white/90 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
}
