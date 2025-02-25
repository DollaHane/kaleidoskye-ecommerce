import React from "react"
import Link from "next/link"

import { orderType } from "@/types/db"
import { siteConfig } from "@/config/site"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatTimeToNow } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { InteractiveHoverButton } from "../ui/interactive-hover-button"

interface OrderHistoryProps {
  orders: orderType[]
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>
          View your recent orders and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders && orders.length !== 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Order ID</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Total</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-b-0">
                    <td className="py-2">{order.id}</td>
                    <td className="py-2"><span>{formatTimeToNow(new Date(order.createdAt!))}</span></td>
                    <td className="py-2">R{order.totalPrice}.00</td>
                    <td className="py-2">
                      <Badge
                        variant={
                          order.orderStatus === "Delivered"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {order.orderStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-3 mt-10">
            <h2 className="font-semibold">We have no orders on record</h2>
            <p className="text-muted-foreground italic">
              Head to the store to add some colour to your life!
            </p>
            <div className="w-full flex items-center justify-center mt-5 mb-20">
              <Link href={siteConfig.links.store}>
                <InteractiveHoverButton text="Store" className="w-28"/>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
