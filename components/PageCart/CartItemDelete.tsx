import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { Loader2, Trash2 } from "lucide-react"

import { toast } from "@/hooks/use-toast"

interface CartItemDeleteProps {
  productKey: string
}

export default function CartItemDelete({ productKey }: CartItemDeleteProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const { mutate: removeCartItem } = useMutation({
    mutationFn: async (itemId: string) => {
      const payload = { itemId }
      await axios.post("/api/rm-from-cart", payload)
    },
    onError: (error: AxiosError) => {
      setIsSubmitting(false)
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

  function handleSubmit(productKey: string) {
    setIsSubmitting(true)
    removeCartItem(productKey)
  }

  return (
    <>
      <button
        onClick={() => handleSubmit(productKey)}
        className="items-center text-sm text-muted-foreground hover:text-destructive"
      >
        {isSubmitting ? (
          <Loader2 className="size-6 animate-spin" />
        ) : (
          <Trash2 className="mr-1 size-6" />
        )}
      </button>
    </>
  )
}
