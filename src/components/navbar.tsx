"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CloseIcon, MenuIcon } from "@/components/icons";

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
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the mobile menu automatically if the viewport grows past the
  // breakpoint where the desktop nav takes over.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 64rem)");
    const onChange = () => setMenuOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">

      {/* Desktop nav */}
      <nav
        className={`hidden grid-cols-[1fr_auto_1fr] items-center px-6 py-5 transition-colors duration-300 sm:px-10 lg:grid lg:px-16 ${
          scrolled ? "bg-white" : "bg-transparent"
        }`}
      >
        <div
          className={`flex max-w-md items-center justify-between gap-6 text-sm font-medium transition-colors duration-300 ${
            scrolled ? "text-zinc-500" : "text-white/80"
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
          <a
            href="#contact"
            className={`font-medium transition-colors duration-300 ${
              scrolled ? "text-zinc-950" : "text-white"
            }`}
          >
            Contact Us
          </a>
        </div>

        <Link href="/" className="shrink-0 px-8">
          <Image
            src={scrolled ? "/logo-black.svg" : "/logo-white.svg"}
            alt="Endelea"
            width={122}
            height={27}
            className="h-6 w-auto"
          />
        </Link>

        <div className="flex items-center justify-end gap-6 text-sm font-medium">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#D4EC3A] py-2 pr-2 pl-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#c3da2f]"
          >
            Book a Consultation
            <span className="flex h-8 w-8 items-center justify-center bg-[#F5A524] text-white">
              <ArrowUpRightIcon />
            </span>
          </a>
        </div>
      </nav>

      {/* Mobile bar */}
      <nav
        className={`flex items-center justify-between px-6 py-5 transition-colors duration-300 sm:px-10 lg:hidden ${
          scrolled || menuOpen ? "bg-white" : "bg-transparent"
        }`}
      >
        <Link href="/">
          <Image
            src={scrolled || menuOpen ? "/logo-black.svg" : "/logo-white.svg"}
            alt="Endelea"
            width={122}
            height={27}
            className="h-6 w-auto"
          />
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className={`flex h-10 w-10 items-center justify-center transition-colors duration-300 ${
            scrolled || menuOpen ? "text-zinc-950" : "text-white"
          }`}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="flex flex-col gap-1 bg-white px-6 pb-8 sm:px-10 lg:hidden">
          {primaryLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-zinc-100 py-4 text-base font-medium text-zinc-700"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="border-b border-zinc-100 py-4 text-base font-medium text-zinc-700"
          >
            Contact Us
          </a>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-3 bg-[#D4EC3A] py-3 pr-2 pl-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#c3da2f]"
          >
            Book a Consultation
            <span className="flex h-8 w-8 items-center justify-center bg-[#F5A524] text-white">
              <ArrowUpRightIcon />
            </span>
          </a>
        </div>
      )}
    </header>
  );
}
