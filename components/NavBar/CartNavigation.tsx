"use client"

import React, { useMemo } from "react"
import { UseGetUserCart } from "@/server/services"
import { Loader2, ShoppingCart } from "lucide-react"

import { RedisCartItem } from "@/types/cart-item"

import MiniCart from "../PageCart/MiniCart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu"

export default function CartNavigation() {
  const cartItems = UseGetUserCart().data as RedisCartItem[]
  const isFetching = UseGetUserCart().isFetching
  console.log("isFetching", isFetching)
  const dropdown = useMemo(
    () => (
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <>
            {isFetching ? (
              <div className="flex items-center gap-2">
                <ShoppingCart className="size-5" />
                <Loader2 className="size-5 animate-spin" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ShoppingCart className="size-5" />
                <p>({cartItems.length})</p>
              </div>
            )}
          </>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="absolute -right-10 w-[80vw] min-w-[320px] max-w-96"
          sideOffset={20}
        >
          <MiniCart cartItems={cartItems} isFetching={isFetching} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    [isFetching]
  )

  return <div className="flex items-center justify-center">{dropdown}</div>
}
