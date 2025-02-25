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
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Cart</h1>
      <div className="space-y-4">
        {cartItems &&
          cartItems.map((item) => (
            <div key={item.id} className="flex flex-row items-center gap-4">
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
                  <h3 className="font-medium">{item.cannonName}</h3>
                  <p className="font-medium text-primary">
                    R {item.totalPrice}
                    .00
                  </p>
                </div>

                <div className="w-full flex flex-row items-start justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Quantity: {item.quantity}</span>
                  <button
                    onClick={() => setRemoveCartItem(item.id)}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
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
