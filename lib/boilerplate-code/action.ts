import { db } from "@/server/db"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"

export async function get() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      console.log("... query unauthorised")
      return []
    }
    const user: any = []

    // const user: userType[] = await db.select().from(users)

    console.log(" ... query successful")
    return user
  } catch (error) {
    console.error(" ... query failed with error:", error)
    return []
  }
}
