import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Endelea",
    short_name: "Endelea",
    description:
      "Custom software, AI automation, and IoT infrastructure for growing businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F2ED",
    theme_color: "#14150f",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
