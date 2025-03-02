import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { getServerSession, type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { siteConfig } from "@/config/site"

import { DrizzleAdapter } from "./drizzle-adapter"

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials) return null
        const { email, password } = credentials
        const user = await db
          .select()
          .from(users)
          .where(eq(users.emailVerified, email))

        if (user && user[0].password === siteConfig.defaultUserPassword) {
          if (password === siteConfig.defaultUserPassword) {
            return { id: user[0].id, name: user[0].name, email: user[0].email }
          }
        } else if (user && bcrypt.compareSync(password, user[0].password)) {
          return { id: user[0].id, name: user[0].name, email: user[0].email }
        } else {
          throw new Error("Invalid credentials")
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token, user }) {
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email || ""))
        .limit(1)

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    redirect() {
      return "/"
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
