"use client";

import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-png.png";
import { NotchedImage } from "@/components/notched-image";
import { ArrowRightIcon, GlobeIcon } from "@/components/icons";

interface Service {
  title: string;
  description: string;
  category: string;
  features: { title: string; description: string }[];
  objectPosition: string;
}

const services: Service[] = [
  {
    title: "Information Management & Systems",
    description:
      "Centralized cloud databases and modern backend architecture designed to clean up messy records and make operational reporting seamless. Includes:",
    category: "Ground-up commercial",
    objectPosition: "85% 15%",
    features: [
      {
        title: "Unified Company Records",
        description:
          "Eliminate scattered spreadsheets and keep all vital business data safely organized in one place.",
      },
      {
        title: "Real-Time Operational Visibility",
        description:
          "Access instant insights into your daily workflows so you can make faster, smarter decisions.",
      },
      {
        title: "Secure Data Architecture",
        description:
          "Protect critical company and customer information with robust, enterprise-grade storage systems.",
      },
    ],
  },
  {
    title: "AI Automation & Intelligent Workflows",
    description:
      "Practical, high-impact AI solutions tailored for growing businesses to cut manual overhead and accelerate daily operations. Includes:",
    category: "Ground-up commercial",
    objectPosition: "60% 20%",
    features: [
      {
        title: "24/7 Voice & Call Handling",
        description:
          "Deploy intelligent AI that answers phone calls instantly, resolves client inquiries, and books appointments around the clock.",
      },
      {
        title: "Instant Social Engagement",
        description:
          "Automatically triage, manage, and reply to customer comments and direct messages in real time without human delay.",
      },
      {
        title: "Eliminated Manual Paperwork",
        description:
          "Streamline data extraction and routine tasks so your team can focus entirely on high-value work.",
      },
    ],
  },
  {
    title: "IoT Hardware & Smart Monitoring",
    description:
      "Connected physical devices and live telemetry dashboards built to track facility resources, monitor equipment health, and manage utility consumption in real time. Includes:",
    category: "Ground-up commercial",
    objectPosition: "30% 25%",
    features: [
      {
        title: "Live Resource Tracking",
        description:
          "Monitor real-time water, electricity, and utility consumption to instantly spot waste and lower costs.",
      },
      {
        title: "Proactive Facility Oversight",
        description:
          "Keep constant watch over physical equipment health to prevent unexpected breakdowns before they happen.",
      },
      {
        title: "Automated Operational Alerts",
        description:
          "Receive instant notifications the moment a physical metric or facility threshold requires your attention.",
      },
    ],
  },
  {
    title: "Strategic Technology Consulting",
    description:
      "Expert guidance on tech stack selection, infrastructure audits, and digital transformation roadmaps to help leadership teams scale without technical debt. Includes:",
    category: "Ground-up commercial",
    objectPosition: "50% 40%",
    features: [
      {
        title: "Clear Technology Roadmaps",
        description:
          "Gain a step-by-step plan for adopting the right tools so you never waste money on the wrong tech stack.",
      },
      {
        title: "Operational Bottleneck Audits",
        description:
          "Identify hidden inefficiencies in your current software, hardware, and workflows to unlock immediate productivity.",
      },
      {
        title: "Executive Technical Guidance",
        description:
          "Leverage seasoned engineering leadership to navigate complex scaling decisions with absolute confidence.",
      },
    ],
  },
  {
    title: "Web Development & Digital Platforms",
    description:
      "Fast, high-performance web applications and corporate websites built to anchor your digital presence and drive continuous growth. Includes:",
    category: "Ground-up commercial",
    objectPosition: "70% 60%",
    features: [
      {
        title: "High-Converting Digital Presence",
        description:
          "Build instant credibility and turn casual web visitors into loyal enterprise clients.",
      },
      {
        title: "Seamless User Experience",
        description:
          "Deliver lightning-fast, responsive applications that keep your audience engaged effortlessly.",
      },
      {
        title: "Reliable Digital Foundations",
        description:
          "Establish secure, scalable web architecture that supports your business as it expands.",
      },
    ],
  },
];

function ServiceCard({
  title,
  description,
  category,
  features,
  objectPosition,
  variant,
}: Service & { variant: "cream" | "white" }) {
  return (
    <div
      className={`grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_140px_320px] lg:gap-10 ${
        variant === "cream" ? "bg-[#F4F1E7]" : "bg-white"
      }`}
    >
      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          {description}
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-[#D4EC3A] text-zinc-950">
                <GlobeIcon className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm text-zinc-600">
                <span className="font-semibold text-zinc-950">
                  {feature.title}:
                </span>{" "}
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <a
          href="#work"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-950"
        >
          <span className="flex h-6 w-6 items-center justify-center bg-[#D4EC3A]">
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
          View Projects
        </a>
      </div>

      <div className="hidden lg:block">
        <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
          Services
        </p>
        <p className="mt-1 text-sm text-zinc-700">{category}</p>
      </div>

      {/* Decorative — the same construction photo repeats across every card
          and adds no information the adjacent title/description doesn't
          already convey, so it's marked decorative rather than given a
          misleading per-service caption. */}
      <NotchedImage
        src={heroImage}
        alt=""
        objectPosition={objectPosition}
        className="hidden aspect-4/3 w-full lg:block lg:aspect-auto"
      />
    </div>
  );
}

const STICKY_STEP = 24; // px of the previous card left peeking above each new one

export function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingHeight, setHeadingHeight] = useState(0);
  // Measured live from the actual fixed <header> rather than assumed, so the
  // stacking trigger always lines up with the navbar's real height — the
  // navbar's own height changes between the desktop nav and the mobile bar.
  const [navbarHeight, setNavbarHeight] = useState(112);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const update = () => setHeadingHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const update = () => setNavbarHeight(header.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="scroll-mt-32 bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-16"
    >
      <div
        ref={headingRef}
        className="sticky flex flex-col items-start justify-between gap-6 bg-white py-4 sm:flex-row sm:items-center"
        style={{ top: `${navbarHeight}px`, zIndex: services.length + 1 }}
      >
        <h2 className="text-5xl font-semibold tracking-tight text-[#14150f] sm:text-7xl">
          Our Services
        </h2>
        <a
          href="#services"
          className="inline-flex items-center border border-[#14150f] px-5 py-2.5 text-sm font-semibold text-[#14150f] transition-colors hover:bg-[#14150f]/5"
        >
          View Services
        </a>
      </div>

      <div className="mt-8 sm:mt-12">
        {services.map((service, i) => (
          <div
            key={service.title}
            className="sticky"
            style={{
              top: `${navbarHeight + headingHeight + i * STICKY_STEP}px`,
              zIndex: i + 1,
            }}
          >
            <ServiceCard
              {...service}
              variant={i % 2 === 0 ? "cream" : "white"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
