import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { siteConfig } from "@/config/site"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    const user = await db
      .select()
      .from(users)
      .where(eq(users.emailVerified, email))

    if (user[0] === undefined) {
      return new Response("Email does not exist.", { status: 409 })
    }

    if (user[0] !== undefined) {
      if (
        user[0].firstSignin === true &&
        user[0].password === siteConfig.defaultUserPassword
      ) {
        if (user[0].password === password) {
          const response = { email: email, password: password }
          console.log("Successfully logged in!")
          return new Response(JSON.stringify(response), { status: 200 })
        }
      } else if (bcrypt.compareSync(password, user[0].password) === true) {
        const response = { email: email, password: password }
        console.log("Successfully logged in!")
        return new Response(JSON.stringify(response), { status: 200 })
      } else {
        return new Response("Password incorrect.", { status: 401 })
      }
    }
  } catch (error) {
    console.error("Failed to login, error:", error)
    return new Response("Failed to login.", { status: 500 })
  }
}
