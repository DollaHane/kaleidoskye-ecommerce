import React from "react"
import { redirect } from "next/navigation"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import { and, eq, sql } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { userType } from "@/types/db"
import { authOptions } from "@/lib/auth/auth-options"
import CreateUserForm from "@/components/PageSettings/CreateUserForm"
import UserList from "@/components/PageSettings/UserList"

export default async function CommandCentre() {
  const session = await getServerSession(authOptions)

  const admin: userType[] = await db
    .select()
    .from(users)
    .where(eq(users.admin, true))

  if (!session) {
    redirect("/signin")
  }

  if (session.user.id !== admin[0].id) {
    redirect("/")
  }

  return (
    <section className="container items-center min-h-screen py-5 md:py-10">
      <h1 className="p-10 text-2xl font-semibold">Settings</h1>
      <hr></hr>
      <UserList />
      <hr></hr>
      <CreateUserForm />
      <hr></hr>
    </section>
  )
}
