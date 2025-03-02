"use server"
import { getServerSession } from "next-auth"

import { userType } from "@/types/db"
import { authOptions } from "@/lib/auth/auth-options"

import { db } from "./db"
import { users } from "./db/schema"
import { eq } from "drizzle-orm"

export async function getUserInfo() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      console.log("Unauthorised.")
      return null
    }

    if (session) {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, session?.user.id))
      console.log("User info query successful", user)
      return user
    }
  } catch (error) {
    console.error("Server Error: Failed to fetch user info - ", error)
  }
}
