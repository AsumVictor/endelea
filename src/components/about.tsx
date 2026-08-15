import heroImage from "@/assets/hero-png.png";
import { NotchedImage } from "@/components/notched-image";
import { GlobeIcon, LayersIcon, UsersIcon } from "@/components/icons";

const pillars = [
  {
    icon: UsersIcon,
    title: "Partnership First",
    description: "Building lasting alignment through collaboration and trust.",
  },
  {
    icon: LayersIcon,
    title: "Built with Precision",
    description: "Accuracy and reliability are at the core of everything we deploy.",
  },
  {
    icon: GlobeIcon,
    title: "Future-Ready Systems",
    description:
      "Forward-thinking architectures designed for long-term growth.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-32 bg-[#F4F2ED] px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-16">
        <NotchedImage
          src={heroImage}
          alt="Timber-frame house under construction"
          objectPosition="75% 35%"
          className="aspect-723/680 w-full"
          animateReveal
        />

        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#D4EC3A]" />
            <span className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
              Our Company
            </span>
          </div>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            Building the future with precision and purpose.
          </h2>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600">
            Founded on engineering excellence, operational clarity, and
            unwavering commitment, Endelea has been partnering with ambitious
            companies to scale through modern technology. From custom
            software ecosystems to advanced AI and hardware infrastructure,
            our approach blends rigorous technical execution with
            collaborative partnership.
          </p>

          <a
            href="#about"
            className="mt-8 inline-flex items-center border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:border-zinc-950"
          >
            Our company
          </a>

          <div className="mt-10 flex flex-col gap-6">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#D4EC3A] text-zinc-950">
                  <Icon />
                </span>
                <div>
                  <p className="font-semibold text-zinc-950">{title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
