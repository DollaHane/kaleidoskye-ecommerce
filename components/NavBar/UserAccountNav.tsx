"use client"

import Link from "next/link"
import { BookOpen, Cog, Home, PieChart } from "lucide-react"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { User } from "@/types/user"

import { ThemeToggle } from "../theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu"
import { UserAvatar } from "../ui/UserAvatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email" | "id">
  adminId: string
}

export function UserAccountNav({ user, adminId }: UserAccountNavProps) {
  const { setTheme, theme } = useTheme()

  const userName = user?.name
  const userImage = user?.image
  const userId = user?.id

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar
          user={{ name: userName, image: userImage }}
          className="size-8 shadow-lg"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-bold">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-primary">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="flex flex-col space-y-1">
          {adminId === userId && (
            <DropdownMenuItem asChild>
              <div>
                <div className="relative flex size-8 items-center justify-center">
                  <Cog className="absolute size-6" />
                </div>
                <Link href="/admin-dash" className="pl-2">
                  Admin
                </Link>
              </div>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild>
            <div>
              <div className="relative flex size-8 items-center justify-center">
                <Home className="absolute size-6" />
              </div>
              <Link href="/" className="pl-2">
                Home
              </Link>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <div>
              <div className="relative flex size-8 items-center justify-center">
                <PieChart className="absolute size-6" />
              </div>
              <Link href="/assets" className="pl-2">
                Assets
              </Link>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <div>
              <ThemeToggle />
              <p className="pl-2 dark:hidden">Dark Mode</p>
              <p className="hidden pl-2 dark:block">Light Mode</p>
            </div>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer border-2 text-red-500 focus:border-red-500 focus:text-red-500"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/signin`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
