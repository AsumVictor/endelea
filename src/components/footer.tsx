import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons";

const pageLinks = [
  { label: "Services", href: "#services" },
  { label: "Work & Case Studies", href: "#work" },
  { label: "About Us", href: "#about" },
];

const moreLinks = [
  { label: "Contact Us", href: "#contact" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer className="bg-[#14150f] px-6 pt-16 pb-8 sm:px-10 lg:px-16">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/logo-white.svg" alt="Endelea" width={122} height={27} className="h-6 w-auto" />
          <div className="mt-6 flex flex-col gap-1 text-sm text-white/60">
            <a href="tel:+2536542082" className="transition-colors hover:text-white">
              +253 654 2082
            </a>
            <a
              href="mailto:contact@endelea.com"
              className="transition-colors hover:text-white"
            >
              contact@endelea.com
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium tracking-widest text-white/40 uppercase">
            Pages
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {pageLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium tracking-widest text-white/40 uppercase">
            More
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            {moreLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-3 sm:justify-end">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <p className="text-xs text-white/40">
          © 2026 Endelea. All rights reserved.
        </p>
        <p className="text-xs text-white/40">
          <a href="#privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </a>
          {" · "}
          <a href="#terms" className="transition-colors hover:text-white">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}
