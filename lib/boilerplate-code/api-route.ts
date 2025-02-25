import { headers } from "next/headers"
import { db } from "@/server/db"
import { ulid } from "ulid"
import { redis } from "@/server/upstash"
import { Ratelimit } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth/auth-options"

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "30 s"),
  analytics: true,
})

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user.email) {
      return new Response("Unauthorised.", { status: 401 })
    }

    const ip = (await headers()).get("x-forwarded-for")
    const {
      remaining,
      limit,
      success: limitReached,
    } = await rateLimit.limit(ip!)
    console.log("Rate Limit Stats:", remaining, limit, limitReached)

    const body = await req.json()
    // const { x, x } = validator.parse(body)

    const id = `id-${ulid()}`
    const currentDate = new Date()

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const transaction = null

      return new Response(`Successfully *** : ${transaction}`, {
        status: 200,
      })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(`Zod validation error: ${error.message}`, {
        status: 400,
      })
    }
    console.error("Failed to *** . ERROR:", error)
    return new Response("Failed to *** . Please try again later", {
      status: 500,
    })
  }
}
