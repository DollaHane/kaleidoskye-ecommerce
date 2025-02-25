import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import { redis } from "@/server/upstash"
import { Ratelimit } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth/auth-options"
import { validateEditProfile } from "@/lib/validators/editProfileValidation"

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "30 s"),
  analytics: true,
})

export async function PATCH(req: Request) {
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
    const { firstname, lastname, phone, shippingAddress } =
      validateEditProfile.parse(body)

    const currentDate = new Date()

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const transaction = await db
        .update(users)
        .set({
          firstname: firstname,
          lastname: lastname,
          phone: parseInt(phone),
          shippingAddress: shippingAddress,
          updatedAt: currentDate,
        })
        .where(eq(users.id, session.user.id))

      revalidatePath("/checkout")
      revalidatePath("/account")

      return new Response(
        `Successfully updated shipping information: ${transaction}`,
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
    console.error("Failed to update shipping information. ERROR:", error)
    return new Response(
      "Failed to update shipping information. Please try again later",
      {
        status: 500,
      }
    )
  }
}
