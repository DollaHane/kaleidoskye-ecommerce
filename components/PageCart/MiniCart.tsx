import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { UseGetUserCart } from "@/server/services"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { Loader2, Trash2 } from "lucide-react"

import { CartItem, RedisCartItem } from "@/types/cart-item"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import Product from "@/components/Assets/Product.png"

import MiniCartEmpty from "./MiniCartEmpty"
import MiniCartSkeleton from "./MiniCartSkeleton"

export default function MiniCart() {
  const queryClient = useQueryClient()
  const cartItems = UseGetUserCart().data as RedisCartItem[]
  const fetchingCart = UseGetUserCart().isFetching
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [rmItemId, setRmItemId] = useState<string>("")

  let subTotal = 0

  if (cartItems && cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
      subTotal = subTotal + cartItems[i].totalPrice
    }
  }

  const { mutate: removeCartItem } = useMutation({
    mutationFn: async (itemId: string) => {
      const payload = { itemId }
      await axios.post("/api/rm-from-cart", payload)
    },
    onError: (error: AxiosError) => {
      setIsSubmitting(false)
      setRmItemId("")
      if (error.response?.status === 400) {
        return toast({
          title: "Data Validation Error.",
          description:
            "There was an error processing the data provided. Please try again.",
          variant: "destructive",
        })
      }
      if (error.response?.status === 401) {
        return toast({
          title: "Authorisation Error.",
          description: "Operation was not authorised, please login.",
          variant: "destructive",
        })
      }
      if (error.response?.status === 429) {
        return toast({
          title: "Too Many Requests.",
          description: "Please wait 30sec before trying again.",
          variant: "destructive",
        })
      }
      if (error.response?.status === 500) {
        return toast({
          title: "Server Error.",
          description:
            "Failed to complete operation due to a server error. Please try again.",
          variant: "destructive",
        })
      }
    },
    onSuccess: () => {
      setIsSubmitting(false)
      setRmItemId("")
      return toast({
        title: "Item Removed",
        description: "Successfully removed item from cart.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ["userCart"] })
      }
    },
  })

  function removeCartItemSubmit(itemId: string) {
    setRmItemId(itemId)
    removeCartItem(itemId)
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-xl font-semibold">Cart</h1>
      <div className="space-y-4">
        {cartItems && cartItems.length > 0 ? (
          <>
            {cartItems.map((item: CartItem) => (
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
                      onClick={() => removeCartItemSubmit(item.id)}
                      className="inline-flex items-center text-sm text-muted-foreground hover:text-destructive"
                    >
                      {rmItemId === item.id && !isSubmitting ? (
                        <div className="flex w-16 items-center justify-center">
                          <Loader2 className="size-4 animate-spin" />
                        </div>
                      ) : (
                        <div className="flex w-16 items-center justify-end gap-1">
                          <div className="size-4">
                            <Trash2 className="size-4" />
                          </div>
                          <p>Remove</p>
                        </div>
                      )}
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
          </>
        ) : fetchingCart ? (
          <MiniCartSkeleton />
        ) : (
          <MiniCartEmpty />
        )}
      </div>
    </div>
  )
}
