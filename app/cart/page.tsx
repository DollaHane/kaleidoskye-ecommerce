"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/cart-store"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import CartItemCard from "@/components/PageCart/CartItemCard"

export default function CartPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { cartItems, setRemoveCartItem } = useCartStore()

  const shipping = 150
  let subTotal = 0
  if (cartItems && cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      subTotal = subTotal + cartItems[i].totalPrice
    }
  }
  let total = subTotal + shipping

  return (
    <section className="container min-h-screen items-center bg-background pb-10">
      <div className="mx-auto h-full w-11/12 pt-10 md:w-10/12">
        {!session?.user.id && (
          <div className="mb-8 flex flex-col items-center justify-between sm:flex-row">
            <div className="pb-5 text-center sm:pb-0 sm:text-start">
              <h2 className="text-lg font-medium">Already have an account?</h2>
              <p className="text-sm text-muted-foreground">
                Sign in for a better experience.
              </p>
            </div>
            <Button variant="default" onClick={() => router.push("./signin")}>
              Sign in
            </Button>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart</CardTitle>
                <CardDescription>Manage your cart content.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-10">
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <CartItemCard cartItem={item} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Cart Total</CardTitle>
                <CardDescription>
                  All prices are inclusive of VAT.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal (incl. VAT)
                      </span>
                      <span>R {subTotal}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>R {shipping}.00</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>R {total}.00</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="mt-5 w-full" size="lg">
                    Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
