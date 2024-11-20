export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Asset Management",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    dashboard: "/",
    assets: "/assets",
    settings: "/settings"
  },
}
