"use client";

import { useEffect, useState } from "react";

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path
        d="M6 14 14 6M14 6H7M14 6v7"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const primaryLinks = [
  { label: "Services", href: "#services" },
  { label: "Work & Case Studies", href: "#work" },
  { label: "About Us", href: "#about" },
  { label: "Insights", href: "#insights" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-[#14150f] px-6 py-2 text-center text-xs font-medium tracking-widest text-white uppercase">
        Now Booking Projects for Spring 2025 &ndash; Secure Your Spot Today.
      </div>

      <nav
        className={`grid grid-cols-[1fr_auto_1fr] items-center px-6 py-5 transition-colors duration-300 sm:px-10 lg:px-16 ${
          scrolled ? "bg-white" : "bg-transparent"
        }`}
      >
        <div
          className={`flex max-w-md items-center justify-between gap-6 text-sm font-medium transition-colors duration-300 ${
            scrolled
              ? "text-zinc-500"
              : "text-white/80"
          }`}
        >
          {primaryLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors ${
                scrolled ? "hover:text-zinc-950" : "hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="/"
          className={`shrink-0 px-8 text-lg font-semibold tracking-tight transition-colors duration-300 ${
            scrolled ? "text-zinc-950" : "text-white"
          }`}
        >
          Endelea
        </a>

        <div className="flex items-center justify-end gap-6 text-sm font-medium">
          <a
            href="#contact"
            className={`font-medium transition-colors duration-300 ${
              scrolled ? "text-zinc-950" : "text-white"
            }`}
          >
            Contact Us
          </a>
          <a
            href="#consultation"
            className="inline-flex items-center gap-3 bg-[#D4EC3A] py-2 pr-2 pl-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#c3da2f]"
          >
            Book a Consultation
            <span className="flex h-8 w-8 items-center justify-center bg-[#F5A524] text-white">
              <ArrowUpRightIcon />
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
