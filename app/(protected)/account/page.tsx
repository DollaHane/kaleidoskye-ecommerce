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
    <section className="container bg-background items-center min-h-screen">
      <div className="w-11/12 md:w-10/12 h-full mx-auto pt-10">
        <div className="md:col-span-1 pb-5">
          <UserProfile orders={order} />
        </div>
        <div className="md:col-span-2 pb-5">
          <OrderHistory orders={order}/>
        </div>
      </div>
    </section>
  )
}
