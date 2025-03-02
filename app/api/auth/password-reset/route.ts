import { headers } from "next/headers"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import { redis } from "@/server/upstash"
import { Ratelimit } from "@upstash/ratelimit"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { userType } from "@/types/db"
import { validateForgotPassword } from "@/lib/validators/authValidation"

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "30 s"),
  analytics: true,
})

export async function POST(req: Request) {
  try {
    const ip = (await headers()).get("x-forwarded-for")
    const {
      remaining,
      limit,
      success: limitReached,
    } = await rateLimit.limit(ip!)
    console.log("Rate Limit Stats:", remaining, limit, limitReached)

    const body = await req.json()
    const { newPassword, email } = validateForgotPassword.parse(body)

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const user: userType[] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

      const currentDate = new Date().getTime()
      const tokenExpiry = new Date(user[0].resetPasswordTokenExpiry!).getTime()

      const diff = tokenExpiry - currentDate

      if (diff <= 0) {
        return new Response("Reset token expired", { status: 401 })
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      const post = await db
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.email, email))

      return new Response(JSON.stringify(post), { status: 200 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(`Zod validation error: ${error.message}`, {
        status: 400,
      })
    }
    console.error("Could not change password at this time. ERROR:", error)
    return new Response(
      "Could not change password at this time. Please try again later",
      { status: 500 }
    )
  }
}
