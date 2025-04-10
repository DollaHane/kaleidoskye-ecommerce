import { headers } from "next/headers"
import { db } from "@/server/db"
import { redis } from "@/server/upstash"
import { Ratelimit } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"
import { ulid } from "ulid"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth/auth-options"
import { addToCartValidation } from "@/lib/validators/addToCartValidation"

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

    const userId = session.user.id
    const productKey = `product:${ulid()}`
    const cartKey = `cart:${userId}`
    const currentDate = new Date()

    const body = await req.json()
    console.log("body:", body)
    const {
      totalPrice,
      quantity,
      confetti,
      confettiPrice,
      powder,
      powderPrice,
      noConfetti,
      noPowder,
      cannonName,
      cannonPrice,
      cannonSize,
    } = addToCartValidation.parse(body)

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      await redis.hset(productKey, {
        id: productKey,
        userId: userId,
        quantity: quantity,
        cannonSize: cannonSize,
        cannonName: cannonName,
        powder: powder,
        confetti: confetti,
        noPowder: noPowder,
        noConfetti: noConfetti,
        cannonPrice: cannonPrice,
        powderPrice: powderPrice,
        confettiPrice: confettiPrice,
        totalPrice: totalPrice,
        createdAt: currentDate,
      })

      const addToCart = await redis.lpush(cartKey, productKey)

      return new Response(`Successfully added to cart : ${addToCart}`, {
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
