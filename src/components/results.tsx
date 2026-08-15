import Image from "next/image";
import heroImage from "@/assets/hero-png.png";
import { ClientLogosMarquee } from "@/components/client-logos-marquee";
import { HighlightText } from "@/components/highlight-text";
import { CountUp } from "@/components/count-up";

const clientLogos = [
  { name: "NurtureHer Foundation", className: "font-serif italic" },
  { name: "H2 Energies", className: "font-mono font-semibold tracking-tight" },
  {
    name: "Northfield Logistics",
    className: "font-sans font-bold tracking-wide uppercase text-sm",
  },
  { name: "Brightwell Health", className: "font-serif" },
  { name: "Arcadia Robotics", className: "font-mono tracking-tight" },
  { name: "Coldstream Freight", className: "font-sans font-semibold" },
];

const stats = [
  {
    label: "Operational costs reduced",
    value: "-32%",
    client: "Northfield Logistics",
    variant: "photo" as const,
  },
  {
    label: "Project delivery accelerated",
    value: "2.4x",
    client: "Brightwell Health",
    variant: "cream" as const,
  },
  {
    label: "Automation coverage achieved",
    value: "89%",
    client: "Arcadia Robotics",
    variant: "white" as const,
  },
];

function StatCard({
  label,
  value,
  client,
  variant,
}: (typeof stats)[number]) {
  if (variant === "photo") {
    return (
      <div className="relative flex min-h-105 flex-col justify-between overflow-hidden p-7">
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover brightness-75 grayscale-[15%]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/40" />

        <p className="relative z-10 font-mono text-xs tracking-widest text-white/80 uppercase">
          {label}
        </p>
        <div className="relative z-10">
          <CountUp
            value={value}
            className="font-serif text-6xl text-white sm:text-7xl"
          />
          <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-white">
            <span className="h-1.5 w-1.5 bg-white" />
            {client}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-105 flex-col justify-between p-7 ${
        variant === "cream" ? "bg-[#F4F1E7]" : "bg-white"
      }`}
    >
      <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
        {label}
      </p>
      <div>
        <CountUp
          value={value}
          className="font-serif text-6xl text-zinc-950 sm:text-7xl"
        />
        <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-zinc-800">
          <span className="h-1.5 w-1.5 bg-zinc-800" />
          {client}
        </p>
      </div>
    </div>
  );
}

export function Results() {
  return (
    <section className="relative overflow-hidden bg-[#F4F2ED]">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/60 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-80 w-80 rounded-full bg-white/50 blur-3xl" />

      <div className="relative pt-16 sm:pt-20">
        <div className="flex items-center gap-2 pl-6 sm:pl-10 lg:pl-16">
          <span className="h-2 w-2 bg-indigo-500" />
          <span className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
            Our Clients
          </span>
        </div>

        <div className="mt-8">
          <ClientLogosMarquee logos={clientLogos} />
        </div>

        <HighlightText
          className="mt-16 max-w-2xl pl-6 text-2xl leading-snug text-zinc-900 sm:pl-10 sm:text-3xl lg:pl-16"
          text="With years of shipping high-quality software on time and on budget, Endelea has become a trusted partner for growing businesses. Our team brings clarity, precision, and engineering discipline to every project we build."
          highlights={["quality", "growing businesses", "precision"]}
        />
      </div>

      <div className="relative mt-20 bg-[#E7E4DD] sm:mt-28">
        <span className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-indigo-500" />

        <div className="px-6 pt-20 pb-16 text-center">
          <h2 className="font-serif text-5xl text-zinc-900 italic sm:text-6xl">
            We&rsquo;ve helped a lot
          </h2>
          <p className="mt-4 text-base text-zinc-500 sm:text-lg">
            Same principle: less friction, more clarity, better decisions.
          </p>
          <a
            href="#work"
            className="mt-8 inline-flex items-center bg-white/70 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white"
          >
            Read case studies
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 px-6 pb-20 sm:grid-cols-3 sm:gap-6 sm:px-10 lg:px-16">
          {stats.map((stat) => (
            <StatCard key={stat.client} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
