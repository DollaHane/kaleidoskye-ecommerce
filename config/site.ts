export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "ACME Management",
  description:
    "A template for kickstarting internal business management projects, the auth is configured as a closed system for internal use.",
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
