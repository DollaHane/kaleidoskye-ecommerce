import React from "react"
import { userType } from "@/types/db"

interface UserListProps {
  user: userType[]
}
export default async function UserList({ user }: UserListProps) {
  return (
    <div className="w-full p-5">
      <h2 className=" text-lg font-semibold mb-10">Users:</h2>
      <div>
        {user.map((user) => (
          <div key={user.id}>{user.email}</div>
        ))}
      </div>
    </div>
  )
}
