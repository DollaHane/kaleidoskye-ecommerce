import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import Logo from "@/components/Assets/Logo.png"

import { Button } from "../ui/button"
import CartNavigation from "./CartNavigation"
import LinkNavigation from "./LinkNavigation"
import Menu from "./Menu"

export default async function NavBar() {
  const session = await getServerSession(authOptions)
  const queryClient = new QueryClient()

  return (
    <header className="sticky top-0 z-50 flex flex-col items-center justify-center bg-accent shadow-md backdrop-blur-md">
      <div className="container relative flex h-20 w-11/12 items-center justify-between px-8">
        {/* LEFT */}
        <div className="z-50">
          <Menu />
        </div>

        {/* CENTER */}
        <div className="absolute left-0 top-0 z-40 flex w-full items-center justify-center">
          <Image
            src={Logo}
            alt="kaleidoskye-party-cannons"
            className="hidden w-36 sm:block"
          />
        </div>

        {/* RIGHT */}
        {session?.user ? (
          <div className="z-50 flex gap-8">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <LinkNavigation href="/account" label="Account" />
              <CartNavigation />
            </HydrationBoundary>
          </div>
        ) : (
          <Button
            variant="icon"
            className="hover:text-customAccent z-50 flex size-10 rounded-full border border-transparent text-primary"
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
