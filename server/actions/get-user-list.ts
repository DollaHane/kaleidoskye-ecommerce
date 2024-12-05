import { getServerSession } from "next-auth"

import { userType } from "@/types/db"
import { authOptions } from "@/lib/auth/auth-options"

import { db } from "../db"
import { users } from "../db/schema"

export async function getUserList() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      console.log("User list query unauthorised")
      return []
    }

    const user: userType[] = await db.select().from(users)
    console.log("User list query successful")
    return user
  } catch (error) {
    console.error("User list query failed with error:", error)
    return []
  }
}
