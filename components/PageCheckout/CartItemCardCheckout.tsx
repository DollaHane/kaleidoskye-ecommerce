"use client"

import React from "react"
import Image from "next/image"
import { CartItem, useCartStore } from "@/store/cart-store"

import Product from "@/components/Assets/Product.png"

interface CartItemCardCheckoutProps {
  cartItem: CartItem
}

export default function CartItemCardCheckout({
  cartItem,
}: CartItemCardCheckoutProps) {
  return (
    <div className="w-full">
      <div key={cartItem.id} className="flex flex-row items-center gap-4">
        <div className="size-12 shrink-0 overflow-hidden rounded-full border">
          <Image
            src={Product}
            alt="kaleidoskye-powder-cannon"
            width={96}
            height={96}
            className="size-full rounded-full object-cover"
          />
        </div>

        <div className="w-full flex-1 space-y-1">
          <div className="mb-2 flex w-full flex-row items-start justify-between">
            <h3 className="font-medium">{cartItem.cannonName}</h3>
            <p className="font-medium text-primary">
              R {cartItem.totalPrice}
              .00
            </p>
          </div>

          <div className="mb-2 flex w-full flex-row items-start justify-between">
            <span className="text-sm text-muted-foreground">
              Quantity: {cartItem.quantity}
            </span>
          </div>
        </div>
      </div>
      <hr className="mt-5" />
    </div>
  )
}
