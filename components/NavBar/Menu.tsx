"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { currentYear } from "@/lib/utils"
import Logo from "@/components/Assets/Logo.png"

import { Icons } from "../icons"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

export default function Menu() {
  const { data: session } = useSession()
  const linkStyles = "text-3xl text-zinc-700 hover:text-zinc-300 font-semibold"
  const links = [
    {
      id: "1",
      label: "Home",
      url: siteConfig.links.home,
    },
    {
      id: "2",
      label: "Start Shopping",
      url: siteConfig.links.store,
    },
    {
      id: "3",
      label: "Account",
      url: siteConfig.links.account,
    },
    {
      id: "4",
      label: "Cart",
      url: siteConfig.links.cart,
    },
  ]

  return (
    <div>
      <Sheet>
        <SheetTrigger>Menu</SheetTrigger>
        <SheetContent side="left" className="w-full sm:min-w-[50vw]">
          <SheetTitle />
          <SheetDescription />
          <div className="size-full flex flex-col relative p-5 items-left">
            <div className="w-full min-h-20 flex flex-col gap-5 items-center justify-center mb-10">
              <Image
                src={Logo}
                alt="kaleidoskye-party-cannons"
                className="w-1/2 min-w-52 sm:hidden"
              />
              <div className="w-full flex text-zinc-700 items-center justify-between px-5">
                <div className="size-10">
                  <Icons.facebook />
                </div>
                <div className="size-10">
                  <Icons.instagram />
                </div>
                <div className="size-10">
                  <Icons.tiktok />
                </div>
                <div className="size-10">
                  <Icons.whatsapp />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              {links.map((item) => (
                <Link key={item.id} href={item.url}>
                  <SheetClose className="z-50">
                    <p className={`${linkStyles}`}>{item.label}</p>
                  </SheetClose>
                </Link>
              ))}
              {session?.user.id ? (
                <SheetClose
                  className="z-50 text-start"
                  onClick={(event) => {
                    event.preventDefault()
                    signOut({
                      callbackUrl: `${window.location.origin}/signin`,
                    })
                  }}
                >
                  <p className={`${linkStyles}`}>Signout</p>
                </SheetClose>
              ) : (
                <Link href={siteConfig.links.signin}>
                  <SheetClose className="z-50">
                    <p className={`${linkStyles}`}>Signin</p>
                  </SheetClose>
                </Link>
              )}
            </div>
            <div className="absolute bottom-5 text-sm text-zinc-700">
              <p className="flex items-center">
                <span className="pr-1">Shipping only available in</span>
                <Icons.zar />
                <span className="pl-1">nation wide.</span>{" "}
              </p>
              <p>© {currentYear} Kaleidoskye Store. All rights reserved.</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
