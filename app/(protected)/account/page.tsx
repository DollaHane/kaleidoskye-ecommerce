import React from "react"
import { redirect } from "next/navigation"
import { db } from "@/server/db"
import { orders } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import OrderHistory from "@/components/PageAccount/OrderHistory"
import UserProfile from "@/components/PageAccount/UserProfile"

export default async function AccountPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  const order = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, session.user.id))

  return (
    <section className="container min-h-screen items-center bg-background">
      <div className="mx-auto h-full w-11/12 pt-10 md:w-10/12">
        <div className="pb-5 md:col-span-1">
          <UserProfile orders={order} />
        </div>
        <div className="pb-5 md:col-span-2">
          <OrderHistory orders={order} />
        </div>
      </div>
    </section>
  )
}
