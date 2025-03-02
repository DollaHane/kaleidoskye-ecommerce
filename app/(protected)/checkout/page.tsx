import React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import OrderSummaryCheckout from "@/components/PageCheckout/OrderSummaryCheckout"
import ShippingDetails from "@/components/PageCheckout/ShippingDetails"

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  return (
    <section className="container mb-10 min-h-screen items-center bg-background">
      <div className="mx-auto h-full w-11/12 pt-10 md:w-10/12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ShippingDetails />
          </div>
          <div>
            <OrderSummaryCheckout />
          </div>
        </div>
      </div>
    </section>
  )
}
