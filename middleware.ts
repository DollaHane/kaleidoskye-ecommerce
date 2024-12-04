import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { getAuthSession } from "./lib/auth/auth-options"
import { db } from "./server/db"
import { users } from "./server/db/schema"

export async function middleware() {
  const session = await getAuthSession()

  if (!session?.user.email) {
    redirect("/signin")
  }

  const user = await db
    .select({ firstSignin: users.firstSignin })
    .from(users)
    .where(eq(users.emailVerified, session.user.email))

  if (user[0].firstSignin === true) {
    redirect("/password-update")
  }
}

export const config = {
  matcher: "/:path*",
}
