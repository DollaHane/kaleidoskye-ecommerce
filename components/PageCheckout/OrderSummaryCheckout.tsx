"use client"

import React from "react"
import { HelpCircle } from "lucide-react"
import { products } from "@/lib/product-attributes"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "../ui/button"
import CartItemCardCheckout from "./CartItemCardCheckout"
import { UseGetUserCart } from "@/server/services"
import { RedisCartItem } from "@/types/cart-item"

export default function OrderSummaryCheckout() {
  const cartItems = UseGetUserCart().data as RedisCartItem[]

  const shipping = products[0].priceShipping
  let subTotal = 0
  if (cartItems && cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      subTotal = subTotal + cartItems[i].totalPrice
    }
  }
  let total = subTotal + shipping
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Get ready for explosive fun!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-4">
            {cartItems &&
              cartItems.map((item) => (
                <CartItemCardCheckout key={item.id} cartItem={item} />
              ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span>Subtotal (Incl. VAT)</span>
                <HelpCircle className="size-4 text-muted-foreground" />
              </div>
              <span>R {subTotal}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>R {shipping}.00</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-medium">
              <span>Total</span>
              <span>R {total}.00</span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="default" className="lg:w-full">
              Continue to Payment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
