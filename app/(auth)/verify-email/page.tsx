import React from "react"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import { eq } from "drizzle-orm"

import { userType } from "@/types/db"

interface ResetPasswordProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ResetPassword({
  searchParams,
}: ResetPasswordProps) {
  const params = await searchParams
  const { token } = params

  const user: userType[] = await db
    .select()
    .from(users)
    .where(eq(users.emailVerified, JSON.stringify(token)))

  const userEmail = user[0].email

  if (user[0].emailVerified !== undefined) {
    await db
      .update(users)
      .set({ emailVerified: userEmail })
      .where(eq(users.email, userEmail))
    return (
      <div className="z-20 mx-auto mb-52 min-h-screen w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
        <h1 className="mt-10 text-xl font-bold text-primary">
          {`Success! Email address ${userEmail} is verified.`}
        </h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <p className="mt-5 w-full text-center">
          You may now proceed to the login.
        </p>
      </div>
    )
  } else {
    return (
      <div className="z-20 mx-auto mb-52 min-h-screen w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
        <h1 className="mt-10 text-xl font-bold text-primary">
          ERROR: Invalid Token
        </h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <p className="mt-5 w-full text-center">
          You have supplied an invalid token and cannot verify your email at
          this time.
        </p>
      </div>
    )
  }
}
