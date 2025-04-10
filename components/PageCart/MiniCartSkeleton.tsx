import React from "react"
import Link from "next/link"
import { Image, Loader2, Trash2 } from "lucide-react"

import { siteConfig } from "@/config/site"
import { products } from "@/lib/product-attributes"

import { Button } from "../ui/button"

export default function MiniCartSkeleton() {
  return (
    <>
      <div className="flex animate-pulse flex-row items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border text-muted-foreground">
          <Image className="size-8" />
        </div>

        <div className="w-full flex-1 space-y-1">
          <div className="mb-2 flex w-full flex-row items-start justify-between">
            <h3 className="font-medium text-muted-foreground">
              {products[0].heading}
            </h3>
            <p className="font-medium text-muted-foreground">R 0.00</p>
          </div>

          <div className="mb-2 flex w-full flex-row items-start justify-between">
            <span className="text-sm text-muted-foreground">Quantity: 0</span>
            <button className="inline-flex items-center text-sm text-muted-foreground hover:text-destructive">
              <div className="flex w-16 items-center justify-end gap-1">
                <div className="size-4">
                  <Trash2 className="size-4" />
                </div>
                <p>Remove</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="mb-4 flex justify-between">
          <span className="text-sm">Subtotal (incl. VAT)</span>
          <span className="font-medium">R 0.00</span>
        </div>
        <Link href="/cart">
          <Button className="w-full" variant="default">
            Go to cart
          </Button>
        </Link>
      </div>
    </>
  )
}
