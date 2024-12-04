import crypto from "crypto"
import { headers } from "next/headers"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import { Nodemail } from "@/server/mail/mail"
import { redis } from "@/server/upstash"
import { render } from "@react-email/components"
import { Ratelimit } from "@upstash/ratelimit"
import { eq } from "drizzle-orm"

import { siteConfig } from "@/config/site"
import { ForgotPasswordTemplate } from "@/components/EmailTemplates/ForgotPasswordTemplate"

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
    const { email } = body

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url")
    const currentDate = new Date()
    const expiryDate = new Date(currentDate.setDate(currentDate.getDate() + 1)) // 24 Hours

    if (!limitReached) {
      return new Response("API request limit reached", { status: 429 })
    } else {
      const post = await db
        .update(users)
        .set({
          resetPasswordToken: resetPasswordToken,
          resetPasswordTokenExpiry: expiryDate,
        })
        .where(eq(users.email, email))

      try {
        
        const template = await render(
          ForgotPasswordTemplate({
            userEmail: email,
            resetPasswordToken: resetPasswordToken,
          }) as React.ReactElement
        )

        Nodemail({
          recipient: email,
          sender: siteConfig.supportEmail!,
          subject: `${siteConfig.name}: Forgot Password`,
          template: template,
        })

        console.log("Successfully sent update password email")
      } catch (error) {
        console.error("Error sending update password email:", error)
        return new Response("Error sending update password email:", {
          status: 500,
        })
      }

      return new Response(JSON.stringify(post), { status: 200 })
    }
  } catch (error) {
    console.error("Could not change password at this time. ERROR:", error)
    return new Response(
      "Could not change password at this time. Please try again later",
      { status: 500 }
    )
  }
}
