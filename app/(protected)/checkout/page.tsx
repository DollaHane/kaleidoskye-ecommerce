import React from "react"
import { redirect } from "next/navigation"
import { getUserCart } from "@/server/actions"
import { HelpCircle } from "lucide-react"
import { getServerSession } from "next-auth"

import { RedisCartItem } from "@/types/cart-item"
import { authOptions } from "@/lib/auth/auth-options"
import { products } from "@/lib/product-attributes"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CartItemCardCheckout from "@/components/PageCheckout/CartItemCardCheckout"
import ShippingDetails from "@/components/PageCheckout/ShippingDetails"

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }
  const cartItems = (await getUserCart()) as RedisCartItem[]

  const shipping = products[0].priceShipping
  let subTotal = 0
  if (cartItems && cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      subTotal = subTotal + cartItems[i].totalPrice
    }
  }
  let total = subTotal + shipping

  return (
    <section className="container mb-10 min-h-screen items-center bg-background">
      <div className="mx-auto h-full w-11/12 pt-10 md:w-10/12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ShippingDetails />
          </div>
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
        </div>
      </div>
    </section>
  )
}
