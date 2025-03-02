import React from "react"
import { useProductStore } from "@/store/product-store"
import { AlertTriangle } from "lucide-react"

import { ProductImage } from "@/types/product-image"
import { Cannon } from "@/lib/product-attributes"

import { Divider } from "../ui/divider"
import { Input } from "../ui/input"

interface SelectionConfirmationProps {
  product: Cannon
  totalPrice: number
  selectedPowder: ProductImage[]
  selectedConfetti: ProductImage[]
}

export default function SelectionConfirmation({
  product,
  totalPrice,
  selectedConfetti,
  selectedPowder,
}: SelectionConfirmationProps) {
  const {
    confettiPrice,
    powderPrice,
    noConfettiNeeded,
    noPowderNeeded,
    setQuantity,
    quantity,
  } = useProductStore()

  return (
    <div className="mt-3 flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <p className="text-lg font-bold">{product.heading}</p>
        </div>
        <p className="text-sm font-bold">R {product.priceCart}.00</p>
      </div>
      <div className="flex w-full flex-row items-center justify-end gap-3">
        <p className="text-sm text-muted-foreground">Quantity:</p>
        <Input
          type="number"
          min={1}
          max={20}
          className="w-16"
          value={quantity}
          onChange={(event: any) => setQuantity(event?.target.value)}
        />
      </div>
      <hr />
      {!noPowderNeeded ? (
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold">Powder Colours:</h3>
            <div className="flex flex-row gap-3">
              {selectedPowder &&
                selectedPowder?.map((pwd: ProductImage) => (
                  <div className="flex flex-col items-center gap-1">
                    <div className="size-12">{pwd.image}</div>
                    <p className="h-full text-center text-xs text-muted-foreground">
                      {pwd.label}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <p className="text-sm font-bold">R {powderPrice}.00</p>
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold">Powder Colours:</h3>
            <p className="italic text-muted-foreground">No powder selected.</p>
          </div>
        </div>
      )}
      {!noConfettiNeeded ? (
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold">Confetti Colours:</h3>
            <div className="flex w-full flex-row gap-3">
              {selectedConfetti &&
                selectedConfetti?.map((conf: ProductImage) => (
                  <div className="flex flex-col items-center justify-start gap-1">
                    <div className="size-12">{conf.image}</div>
                    <p className="h-full text-center text-xs text-muted-foreground">
                      {conf.label}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <p className="text-sm font-bold">R {confettiPrice}.00</p>
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold">Confetti Colours:</h3>
            <div className="flex flex-row items-center gap-2">
              <AlertTriangle className="size-5 text-accent" />
              <p className="text-sm text-muted-foreground">
                No confetti selected
              </p>
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-bold">Subtotal (Incl. VAT):</h3>
        <p className="text-lg font-bold text-blue-500">R {totalPrice}.00</p>
      </div>
    </div>
  )
}
