"use client"

import React from "react"
import Link from "next/link"
import { useCartStore } from "@/store/cart-store"
import { ShoppingCart } from "lucide-react"

import MiniCart from "../PageCart/MiniCart"
import MiniCartEmpty from "../PageCart/MiniCartEmpty"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu"

interface LinkProps {
  href: string
  label: string
}

export default function CartNavigation({ href, label }: LinkProps) {
  const { cartItems } = useCartStore()
  const cart = [
    {
      product: {
        name: "32inch Cannon",
        price: "250",
      },
    },
  ]

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <div className="flex gap-2">
            <ShoppingCart className="size-5" />
            <p>({cartItems.length})</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="absolute -right-10 w-[80vw] min-w-[320px] max-w-96"
          sideOffset={20}
        >
          {cart.length > 0 ? <MiniCart /> : <MiniCartEmpty />}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
