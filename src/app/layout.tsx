import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://endelea.com";
const SITE_NAME = "Endelea";
const SITE_DESCRIPTION =
  "Endelea helps SMEs cut operational waste, automate complex workflows, and launch scalable tech products. Custom software, AI automation, and IoT infrastructure with predictable timelines and measurable ROI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Endelea | Custom Software, AI Automation & IoT for Growing Businesses",
    template: "%s | Endelea",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Endelea",
    "custom software development",
    "AI automation",
    "IoT infrastructure",
    "business process automation",
    "software for SMEs",
    "workflow automation",
    "technology consulting",
  ],
  authors: [{ name: "Endelea" }],
  creator: "Endelea",
  publisher: "Endelea",
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: "Endelea | Custom Software, AI Automation & IoT for Growing Businesses",
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Endelea | Custom Software, AI Automation & IoT for Growing Businesses",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F2ED" },
    { media: "(prefers-color-scheme: dark)", color: "#14150f" },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: "contact@endelea.com",
  telephone: "+2536542082",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+2536542082",
    email: "contact@endelea.com",
    contactType: "customer service",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
