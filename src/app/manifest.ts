import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "THE WORKS | Digital Services Directory",
    short_name: "THE WORKS",
    description: "Browse Botswana's digital directory of specialist services and service providers.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f6f5f0",
    theme_color: "#294735",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["business", "productivity"],
    prefer_related_applications: false,
    icons: [{ src: "/works-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
    shortcuts: [
      {
        name: "Find a service",
        short_name: "Services",
        description: "Search services and products",
        url: "/#works-discovery",
        icons: [{ src: "/works-icon.svg", sizes: "any", type: "image/svg+xml" }]
      },
      {
        name: "My Account",
        short_name: "Account",
        description: "Open your customer account",
        url: "/account",
        icons: [{ src: "/works-icon.svg", sizes: "any", type: "image/svg+xml" }]
      },
      {
        name: "Owner Briefcase",
        short_name: "Briefcase",
        description: "Open the owner and staff workspace",
        url: "/admin",
        icons: [{ src: "/works-icon.svg", sizes: "any", type: "image/svg+xml" }]
      }
    ]
  };
}
