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
    const { quantity, product } = body
    const productKey = product.id
    const totalPrice =
      (await (product.cannonPrice +
        product.powderPrice +
        product.confettiPrice)) * quantity

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      await redis.hset(`${productKey}`, {
        quantity: quantity,
        totalPrice: totalPrice,
      })

      return new Response(
        `Successfully updated ${productKey} with quantity: ${quantity} : transaction`,
        {
          status: 200,
        }
      )
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
