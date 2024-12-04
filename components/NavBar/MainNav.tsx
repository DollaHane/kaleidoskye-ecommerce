import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Logo from "../Assets/Logo"

import { NavItem } from "@/types/nav"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex">
      <Link href="/" className="flex">
        <div className="w-20 h-12 flex items-center justify-center">
          <Logo/>
        </div>
      </Link>
    </div>
  )
}
