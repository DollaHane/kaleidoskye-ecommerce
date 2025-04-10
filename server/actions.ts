"use server"

import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"

import { db } from "./db"
import { users } from "./db/schema"
import { redis } from "./upstash"

export async function getUserInfo() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      console.log("Unauthorised.")
      return null
    }

    if (session) {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, session?.user.id))
      console.log("User info query successful", user)
      return user
    }
  } catch (error) {
    console.error("Server Error: Failed to fetch user info - ", error)
  }
}

export async function getUserCart() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      console.log("Unauthorised")
      return null
    }

    if (session) {
      const cartKey = `cart:${session.user.id}`
      const cartlength = await redis.llen(cartKey)
      const cartContents = await redis.lrange(cartKey, 0, cartlength)

      let cart = []
      if (cartContents) {
        for (let i = 0; i < cartContents.length; i++) {
          const product = await redis.hgetall(cartContents[i])
          cart.push(product)
        }
      }
      console.log("cart:", cart)
      return cart
    }
  } catch (error) {
    console.error("Could not fetch cart keys: ", error)
  }
}
