import Image from "next/image"
import { AvatarProps } from "@radix-ui/react-avatar"
import { UserCheck } from "lucide-react"

import { User } from "@/types/user"

import { Avatar, AvatarFallback } from "./Avatar"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            className="shadow-lg"
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only relative">{user?.name}</span>
          <UserCheck className="absolute right-1 h-5 w-5" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
