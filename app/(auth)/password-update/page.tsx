import React from "react"
import { redirect } from "next/navigation"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import Logo from "@/components/Assets/Logo"
import UpdatePasswordForm from "@/components/PageAuth/UpdatePasswordForm"

export default async function page() {
  const session = await getServerSession(authOptions)

  if (!session?.user.email) {
    redirect("/signin")
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))

  return (
    <section className="container flex min-h-screen flex-col items-center gap-10 py-10">
      <div className="w-full flex-col items-center justify-center bg-background md:mt-16 md:w-4/12">
        <Logo />
      </div>
      <UpdatePasswordForm user={user} />
    </section>
  )
}
