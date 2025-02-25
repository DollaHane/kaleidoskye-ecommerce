import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import { User } from "lucide-react"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import Logo from "@/components/Assets/Logo.png"

import { ThemeToggle } from "../theme-toggle"
import { Button } from "../ui/button"
import CartNavigation from "./CartNavigation"
import LinkNavigation from "./LinkNavigation"
import Menu from "./Menu"

export default async function NavBar() {
  const session = await getServerSession(authOptions)
  const queryClient = new QueryClient()

  return (
    <header className="sticky top-0 z-50 flex flex-col items-center justify-center bg-accent shadow-md backdrop-blur-md">
      <div className="container relative h-20 flex w-11/12 items-center justify-between px-8">
        {/* LEFT */}
        <div className="z-50">
          <Menu />
        </div>

        {/* CENTER */}
        <div className="absolute top-0 left-0 flex w-full items-center justify-center z-40">
          <Image
            src={Logo}
            alt="kaleidoskye-party-cannons"
            className=" w-36 hidden sm:block"
          />
        </div>

        {/* RIGHT */}
        {session?.user ? (
          <div className="flex gap-8 z-50">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <LinkNavigation href="/account" label="Account" />
              <CartNavigation href="/cart" label="Cart" />
            </HydrationBoundary>
          </div>
        ) : (
          <Button
            variant="icon"
            className="flex h-10 w-10 rounded-full border border-transparent text-primary hover:text-customAccent z-50"
          >
            <Link href="/signin" className="w-auto">
              Signin
            </Link>
          </Button>
        )}
      </div>
    </header>
  )
}
