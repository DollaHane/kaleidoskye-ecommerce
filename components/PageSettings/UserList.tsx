import React from "react"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"

export default async function UserList() {

  const user = await db.select().from(users)

  return (
    <div className="w-full p-5">
      <h2 className=" text-lg font-semibold mb-10">Users:</h2>
      <div>
        {user.map((user) => (
          <div key={user.id}>
            {user.email}
          </div>
        ))}
      </div>
    </div>
  )
}
