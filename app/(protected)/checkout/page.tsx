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
    <section className="container bg-background items-center min-h-screen mb-10">
      <div className="w-11/12 md:w-10/12 h-full mx-auto pt-10">
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
