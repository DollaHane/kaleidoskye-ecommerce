import React from "react"
import Link from "next/link"

interface LinkProps {
  href: string
  label: string
}

export default function LinkNavigation({ href, label }: LinkProps) {
  return (
    <div className="flex items-center justify-center">
      <Link href={href} className="flex text-center text-sm">
        {label}
      </Link>
    </div>
  )
}
