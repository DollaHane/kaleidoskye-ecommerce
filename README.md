# Build Studio Template

The Build Software starter template. 

This template was created to kickstart internal business management projects where the auth 
is configured for a closed system for internal use.

<!-- ![Project Image](https://github.com/) -->

## Features

- Next.js 15 App Directory
- Next-Auth (Credentials - Sign-in only)
- Shadcn Components
- Tailwind CSS
- ZOD Validation
- Drizzle ORM
- NEON Database
- TanStack Query
- Nodemailer
- React Email Templates
- Icons from [Lucide](https://lucide.dev)
- Dark mode with `next-themes`
- Tailwind CSS class sorting, merging and linting.


## Getting started

Download the repository to a directory of your choice and run:

```bash
  npm install
```

Copy these variables into a .env file:

```bash
DATABASE_URL=

NEXTAUTH_SECRET=
NEXTAUTH_URL="http://localhost:3000"

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

URL="http://localhost:3000"

MAIL="your@domain.com"
MAIL_USER="your@domain.com"
MAIL_PASSWORD="password"
```

Edit the site.ts file in the config folder:

```bash
export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "ACME Management",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  businessName: "ACME (Pty) Ltd",
  domain: "https://www.acme.com",
  domainShort: "ACME.com",
  supportEmail: "support@acme.com",
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
```

Push the pre-generated schema to your Neon database and create your first user with a password of "changeme" (after logging in you will be directed to update your password).

```bash
  npm run db:push
```

You can also add a user via Drizzle Studio. Make sure you have Drizzle Kit installed.

```bash
 npm install drizzle-orm -D drizzle-kit
```

```bash
  npx drizzle-kit studio
```

## Documentation Links

- [Drizzle ORM](https://orm.drizzle.team/docs/get-started/neon-new): Get started with Drizzle and Neon.
- [Neon DB](https://neon.tech/docs/guides/drizzle): Learn how to connect to Neon from Drizzle.
- [Upstash Rate Limiting](https://upstash.com/blog/nextjs-ratelimiting): Redis rate limiting.
- [Next Auth Credentials](https://next-auth.js.org/providers/credentials): Sign in with email & password.
- [Shadcn](https://ui.shadcn.com): UI Components

## Acknowledgements

- Shadcn's [NEXT Template](https://github.com/shadcn/next-template) which this repository was forked from

## License

[MIT](https://choosealicense.com/licenses/mit/)