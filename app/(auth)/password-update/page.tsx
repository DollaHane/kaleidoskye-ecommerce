import UpdatePasswordForm from "@/components/PageAuth/UpdatePasswordForm"
import { db } from "@/server/db"
import Logo from "@/components/Assets/Logo"
import React from 'react'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/auth-options"
import { redirect } from "next/navigation"
import { users } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export default async function page() {
  const session = await getServerSession(authOptions)

  if (!session?.user.email) {
    redirect('/signin')
  }

  const user = await db.select().from(users).where(eq(users.email, session.user.email))

  return (
    <section className="container flex flex-col items-center min-h-screen py-10 gap-10">
      <div className="md:mt-16 w-full md:w-4/12 flex-col items-center justify-center bg-background">
        <Logo/>
      </div>
      <UpdatePasswordForm user={user}/>
    </section>
  )
}
