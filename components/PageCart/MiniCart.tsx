"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/store/cart-store"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import Product from "@/components/Assets/Product.png"

export default function MiniCart() {
  const { cartItems, setRemoveCartItem } = useCartStore()
  let subTotal = 0

  if (cartItems && cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      subTotal = subTotal + cartItems[i].totalPrice
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-xl font-semibold">Cart</h1>
      <div className="space-y-4">
        {cartItems &&
          cartItems.map((item) => (
            <div key={item.id} className="flex flex-row items-center gap-4">
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
                  <h3 className="font-medium">{item.cannonName}</h3>
                  <p className="font-medium text-primary">
                    R {item.totalPrice}
                    .00
                  </p>
                </div>

                <div className="mb-2 flex w-full flex-row items-start justify-between">
                  <span className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </span>
                  <button
                    onClick={() => setRemoveCartItem(item.id)}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="mr-1 size-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div className="border-t pt-4">
          <div className="mb-4 flex justify-between">
            <span className="text-sm">Subtotal (incl. VAT)</span>
            <span className="font-medium">R {subTotal}.00</span>
          </div>
          <Link href="/cart">
            <Button className="w-full" variant="default">
              Go to cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
