import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "THE WORKS | Business & Experiences",
    short_name: "THE WORKS",
    description: "Discover specialist businesses, products and services through THE WORKS.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f6f5f0",
    theme_color: "#294735",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["business", "productivity"],
    prefer_related_applications: false,
    icons: [
      { src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-180.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      
      { src: "/iteration13-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }
    ],
    shortcuts: [
      {
        name: "Find a service",
        short_name: "Services",
        description: "Search services and products",
        url: "/#works-discovery",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "My Account",
        short_name: "Account",
        description: "Open your customer account",
        url: "/account",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Owner Briefcase",
        short_name: "Briefcase",
        description: "Open the owner and staff workspace",
        url: "/admin",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      }
    ]
  };
}
