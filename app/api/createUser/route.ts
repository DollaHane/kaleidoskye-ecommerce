import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import { ulid } from "ulid"
import { z } from "zod"

import { createUserValidation } from "@/lib/validators/createUserValidation"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("body:", body)
    const { admin, name, email } = createUserValidation.parse(body)

    const id = `user-${ulid()}`
    const createdAt = new Date()
    const response = await db.insert(users).values({
      id: id,
      admin: admin,
      name: name,
      email: email,
      password: "changeme",
      createdAt: createdAt,
      updatedAt: createdAt,
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
