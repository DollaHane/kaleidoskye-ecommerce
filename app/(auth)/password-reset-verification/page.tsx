import React from "react"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import { eq } from "drizzle-orm"

import { userType } from "@/types/db"
import ForgotPasswordForm from "@/components/PageAuth/ForgotPasswordForm"

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
    // @ts-ignore
    .where(eq(users.resetPasswordToken, token))

  if (user && token) {
    return (
      <div className="z-20 mx-auto mb-52 min-h-screen w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
        <h1 className="mt-10 text-xl font-bold text-primary">Reset Password</h1>
        <hr className="my-2 border border-t-muted-foreground" />
        <ForgotPasswordForm />
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
          You have supplied an invalid token and cannot reset your password at
          this time.
        </p>
      </div>
    )
  }
}
