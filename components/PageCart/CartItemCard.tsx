import React, { useEffect, useState } from "react"
import Image from "next/image"
import { CartItem, useCartStore } from "@/store/cart-store"
import { Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import Product from "@/components/Assets/Product.png"
import { confettiImages } from "@/components/PageProduct/ConfettiSelection"
import { powderImages } from "@/components/PageProduct/PowderSelection"

import { Input } from "../ui/input"

interface CartItemCardProps {
  cartItem: CartItem
}

export default function CartItemCard({ cartItem }: CartItemCardProps) {
  const isAbove450pixels = useMediaQuery("(min-width:450px)")
  const isAbove380pixels = useMediaQuery("(min-width:380px)")
  const { setRemoveCartItem, setQuantity } = useCartStore()
  const [updateQuantity, setUpdateQuantity] = useState<number>(
    cartItem.quantity
  )

  useEffect(() => {
    setQuantity(cartItem.id, updateQuantity)
  }, [updateQuantity])

  let powder = []
  let confetti = []
  if (cartItem.powder) {
    for (let i = 0; i < cartItem.powder?.length; i++) {
      const image =
        cartItem.powder[i] &&
        // @ts-ignore
        powderImages.filter((item) => item.label === cartItem.powder[i])
      powder.push(image)
    }
  }

  if (cartItem.confetti) {
    for (let i = 0; i < cartItem.confetti?.length; i++) {
      const image =
        cartItem.confetti[i] &&
        // @ts-ignore
        confettiImages.filter((item) => item.label === cartItem.confetti[i])
      confetti.push(image)
    }
  }

  return (
    <div key={cartItem.id} className="flex flex-row items-start gap-4">
      <div
        className={cn(
          "relative size-24 overflow-hidden rounded-2xl border shadow-lg sm:size-40 md:size-52"
        )}
      >
        <Image
          src={Product}
          alt="kaleidoskye-powder-cannon"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full flex-1 space-y-1">
        <div
          className={cn(
            "mb-2 flex w-full flex-col items-start justify-between text-sm",
            isAbove450pixels && "text-base",
            isAbove380pixels && "flex-row"
          )}
        >
          <h3 className="font-medium">{cartItem.cannonName}</h3>
          <p className="font-medium text-blue-500">
            R {cartItem.totalPrice}
            .00
          </p>
        </div>
        <hr />
        <div className="flex flex-wrap py-2">
          <div className="grid w-32 grid-cols-3 items-center justify-start gap-10">
            {powder.map((pwd) => (
              <div key={pwd[0].label} className="w-4">
                {pwd[0].image}
              </div>
            ))}
          </div>
          <div className="grid w-32 grid-cols-3 items-center justify-start gap-10 pl-[5px]">
            {confetti.map((conf) => (
              <div key={conf[0].label} className="w-3">
                {conf[0].image}
              </div>
            ))}
          </div>
        </div>
        <div
          className={cn(
            "mb-2 flex w-full flex-row items-start justify-between text-sm",
            isAbove450pixels && "text-base"
          )}
        >
          <p className="text-sm text-muted-foreground">Quantity:</p>
        </div>
        <div className="flex w-full items-center justify-start gap-4">
          <Input
            type="number"
            min={1}
            max={20}
            className="w-16"
            value={updateQuantity}
            onChange={(event: any) => setUpdateQuantity(event.target.value)}
          />
          <button
            onClick={() => setRemoveCartItem(cartItem.id)}
            className="items-center text-sm text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="mr-1 h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
