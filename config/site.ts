export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Kaleidoskye Powder Cannons",
  description:
    "Fully customisable powder and confetti cannon poppers for all celebratory occasions, delivered straight to your door. Environmentally friendly and vibrant in colour, sure to get your party going with a bang!",
  businessName: "Kaleidoskye (PE)",
  domain: "https://www.kaleidoskye.co.za",
  domainShort: "Kaleidoskye.co.za",
  supportEmail: "info@kaleidoskye.co.za",
  phone: "+27 (0)60 460 7320",
  defaultUserPassword: "Changeme2024!",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    home: "/",
    account: "/account",
    cart: "/cart",
    checkout: "/checkout",
    store: "/store",
    signin: "/signin",
  },
  socials: {
    facebook: {
      id: "facebook",
      href: "https://web.facebook.com/profile.php?id=61566775514311&mibextid=LQQJ4d&_rdc=1&_rdr",
    },
    instagram: {
      id: "instagram",
      href: "https://www.instagram.com/kaleidoskye_pe/",
    },
    tiktok: {
      id: "tiktok",
      href: "https://www.tiktok.com/@kaleidoskye.pe",
    },
    whatsapp: {
      id: "whatsapp",
      href: "https://api.whatsapp.com/send?phone=27604607320&text=Hey%20there!",
    },
    email: {
      id: "email",
      href: "mailto:info@kaleidoskye.co.za?subject=Hello!",
    },
  },
}
