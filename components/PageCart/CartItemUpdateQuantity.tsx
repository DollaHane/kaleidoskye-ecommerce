import React, { useEffect, useMemo, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import { RedisCartItem } from "@/types/cart-item"
import { useDebounce } from "@/hooks/use-debounce"
import { toast } from "@/hooks/use-toast"

import { Input } from "../ui/input"

interface CartItemUpdateQuantityProps {
  quantity: number
  product: RedisCartItem
}

export default function CartItemUpdateQuantity({
  quantity,
  product,
}: CartItemUpdateQuantityProps) {
  const [updateQuantity, setUpdateQuantity] = useState<number>(quantity)
  const queryClient = useQueryClient()
  const debouncedValue = useDebounce(updateQuantity, 1000)

  const { mutate: updateQty } = useMutation({
    mutationFn: async (quantity: number) => {
      const payload = {
        quantity: quantity,
        product: product,
      }
      await axios.post("/api/update-item-quantity", payload)
    },
    onError: (error: AxiosError) => {
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
      return toast({
        title: "Quantity Updated",
        description: "Successfully updated product quantity.",
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

  useMemo(() => {
    if (debouncedValue !== quantity) {
      updateQty(debouncedValue)
    }
  }, [debouncedValue])

  return (
    <>
      <Input
        type="number"
        min={1}
        max={20}
        className="w-16"
        value={updateQuantity}
        onChange={(event: any) => setUpdateQuantity(event.target.value)}
      />
    </>
  )
}
