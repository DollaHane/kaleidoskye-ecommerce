import { headers } from "next/headers"
import { redis } from "@/server/upstash"
import { Ratelimit } from "@upstash/ratelimit"
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
    const { itemId } = body
    const cartKey = `cart:${session.user.id}`

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      await redis.lrem(cartKey, 2, itemId)
      await redis.del(itemId)

      return new Response(`Successfully removed ${itemId} from ${cartKey}`, {
        status: 200,
      })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(`Zod validation error: ${error.message}`, {
        status: 400,
      })
    }
    console.error("Failed to remove item from cart . ERROR:", error)
    return new Response(
      `Failed to remove item from cart . Please try again later`,
      {
        status: 500,
      }
    )
  }
}
