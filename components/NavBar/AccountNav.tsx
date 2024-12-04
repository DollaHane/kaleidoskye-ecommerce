import { redirect } from "next/navigation"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

import { userType } from "@/types/db"
import { authOptions } from "@/lib/auth/auth-options"

import { UserAccountNav } from "./UserAccountNav"

export async function AccountNav() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))

  const admin: userType[] = await db
    .select()
    .from(users)
    .where(eq(users.admin, true))

  return (
    <div className="absolute right-0 top-[26px] flex flex-1 items-center justify-end space-x-4">
      {/* SIGN IN */}
      {session?.user && user && (
        <div className="flex items-center space-x-6">
          {/* <PostAd /> */}
          <UserAccountNav
            adminId={admin[0].id}
            user={{
              id: session.user.id || "",
              name: session.user.name || "",
              email: session.user.email || "",
              image: session.user.image || "",
            }}
          />
        </div>
      )}
    </div>
  )
}
