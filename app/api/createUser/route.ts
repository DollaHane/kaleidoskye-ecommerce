import crypto from "crypto"
import { revalidatePath } from "next/cache"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import { Nodemail } from "@/server/mail/mail"
import { render } from "@react-email/components"
import { eq } from "drizzle-orm"
import { ulid } from "ulid"
import { z } from "zod"
import { siteConfig } from "@/config/site"
import { getAuthSession } from "@/lib/auth/auth-options"
import { createUserValidation } from "@/lib/validators/createUserValidation"
import { VerifyEmailTemplate } from "@/components/EmailTemplates/VerifyEmailTemplate"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    const body = await req.json()
    const { admin, name, email } = createUserValidation.parse(body)

    const id = `user-${ulid()}`
    const createdAt = new Date()
    const verifyEmailToken = crypto.randomBytes(32).toString("base64url")

    if (!session?.user.id) {
      return new Response("Unathorised", { status: 401 })
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))

    if (user[0].admin === false) {
      return new Response("Unauthorised", { status: 401 })
    }

    const response = await db.insert(users).values({
      id: id,
      admin: admin,
      name: name,
      email: email,
      password: siteConfig.defaultUserPassword,
      createdAt: createdAt,
      updatedAt: createdAt,
    })

    const template = await render(
      VerifyEmailTemplate({
        userName: name,
        userEmail: email,
        verifyEmailToken: verifyEmailToken,
      }) as React.ReactElement
    )

    Nodemail({
      recipient: email,
      sender: process.env.MAIL!,
      subject: "Rhenus Asset Manager: Verification Email",
      template: template,
    })

    console.log("response:", response)
    return new Response(JSON.stringify(response), { status: 200 })
  } catch (error) {
    console.error("error:", error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    return new Response("Failed to create user.", { status: 500 })
  }
}
