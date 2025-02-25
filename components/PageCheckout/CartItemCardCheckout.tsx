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
        <div className="border rounded-full overflow-hidden size-12 flex-shrink-0">
          <Image
            src={Product}
            alt="kaleidoskye-powder-cannon"
            width={96}
            height={96}
            className="object-cover w-full h-full rounded-full"
          />
        </div>

        <div className="w-full flex-1 space-y-1">
          <div className="w-full flex flex-row items-start justify-between mb-2">
            <h3 className="font-medium">{cartItem.cannonName}</h3>
            <p className="font-medium text-primary">
              R {cartItem.totalPrice}
              .00
            </p>
          </div>

          <div className="w-full flex flex-row items-start justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Quantity: {cartItem.quantity}
            </span>
          </div>
        </div>
      </div>
      <hr className="mt-5"/>
    </div>
  )
}
