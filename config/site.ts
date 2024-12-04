export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "ACME Management",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  businessName: "ACME (Pty) Ltd",
  domain: "https://www.acme.com",
  domainShort: "ACME.com",
  supportEmail: "support@acme.com",
  defaultUserPassword: "Changeme2024!",
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
