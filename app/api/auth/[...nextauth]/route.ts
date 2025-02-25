import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"

console.log("authOptions", authOptions.callbacks?.session)

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
