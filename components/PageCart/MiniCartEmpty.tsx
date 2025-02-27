import React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

export default function MiniCartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="relative mb-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-black text-sm text-white">
          0
        </div>
      </div>
      <p className="text-muted-foreground">Your shopping cart is empty.</p>
      <Link href={siteConfig.links.store}>
        <Button variant="default" className="mt-2">
          Explore products
        </Button>
      </Link>
    </div>
  )
}
