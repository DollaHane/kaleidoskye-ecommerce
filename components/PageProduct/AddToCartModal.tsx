"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/cart-store"
import { useProductStore } from "@/store/product-store"
import { useMutation } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { ulid } from "ulid"

import { Cannon } from "@/lib/product-attributes"
import {
  AddToCartValidationCreationRequest,
} from "@/lib/validators/addToCartValidation"
import { toast } from "@/hooks/use-toast"
import {
  CloseButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal"
import { Button } from "@/components/ui/button"

import { Icons } from "../icons"
import { Divider } from "../ui/divider"
import { ScrollArea } from "../ui/scroll-area"
import ConfettiSelection, { confettiImages } from "./ConfettiSelection"
import PowderSelection, { powderImages } from "./PowderSelection"
import SelectionConfirmation from "./SelectionConfirmation"

interface AddToCartModal {
  product: Cannon
}

export default function AddToCartModal({ product }: AddToCartModal) {
  const router = useRouter()
  const [step, setStep] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(true)
  const {
    noConfettiNeeded,
    noPowderNeeded,
    powder,
    confetti,
    quantity,
    powderPrice,
    confettiPrice,
    setClearState,
  } = useProductStore()
  const { setAddCartItem } = useCartStore()

  useEffect(() => {
    const powderCondition = (powder && powder.length > 0) || noPowderNeeded
    const confettiCondition =
      (confetti && confetti.length > 0) || noConfettiNeeded
    setDisabled(!(powderCondition && confettiCondition))
  }, [noConfettiNeeded, noPowderNeeded, powder, confetti])

  let selectedPowder = []
  let selectedConfetti = []

  if (powder) {
    for (let i = 0; i < powder?.length; i++) {
      const image = powderImages.filter((img) => img.label === powder[i])
      selectedPowder.push(...image)
    }
  }

  if (confetti) {
    for (let i = 0; i < confetti?.length; i++) {
      const image = confettiImages.filter((img) => img.label === confetti[i])
      selectedConfetti.push(...image)
    }
  }

  let totalPrice = 0
  let cannonPrice = product.priceCart
  let cartPowderPrice = 0
  let cartConfettiPrice = 0

  if (!noPowderNeeded) {
    cartPowderPrice = powderPrice
  }

  if (!noConfettiNeeded) {
    cartConfettiPrice = confettiPrice
  }

  totalPrice = (cannonPrice + cartPowderPrice + cartConfettiPrice) * quantity

  const { mutate: submitToCart } = useMutation({
    mutationFn: async ({
      id,
      cannonSize,
      cannonName,
      powder,
      confetti,
      quantity,
      totalPrice,
      cannonPrice,
      powderPrice,
      confettiPrice,
      noConfetti,
      noPowder,
    }: AddToCartValidationCreationRequest) => {
      const payload: AddToCartValidationCreationRequest = {
        id: id,
        cannonSize: cannonSize,
        cannonName: cannonName,
        powder: powder,
        confetti: confetti,
        quantity: quantity,
        totalPrice: totalPrice,
        cannonPrice: cannonPrice,
        powderPrice: powderPrice,
        confettiPrice: confettiPrice,
        noConfetti: noConfetti,
        noPowder: noPowder,
      }
      setAddCartItem(payload)
    },
    onSuccess: () => {
      setClearState()
      router.push("/cart")
      return toast({
        title: "Success!",
        description: "Added item to cart.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      }
    },
  })

  function onConfirmation() {
    const id = `cart-item-${ulid()}`
    const payload: AddToCartValidationCreationRequest = {
      id: id,
      cannonSize: product.id,
      cannonName: product.heading,
      powder: powder,
      confetti: confetti,
      quantity: quantity,
      noPowder: noPowderNeeded,
      noConfetti: noConfettiNeeded,
      totalPrice: totalPrice,
      cannonPrice: cannonPrice,
      powderPrice: cartPowderPrice,
      confettiPrice: cartConfettiPrice,
    }
    submitToCart(payload)
  }

  return (
    <div>
      <Modal>
        <div className="absolute bottom-[95px] right-3">
          <ModalTrigger className="relative flex h-10 w-32 group bg-accent items-center justify-center text-center hover:bg-black/90">
            <span className="flex group-hover:translate-x-40 font-bold text-center transition duration-500">
              Add to Cart
            </span>
            <div className="-translate-x-40 group-hover:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
              <Icons.basket />
            </div>
          </ModalTrigger>
        </div>
        <ModalBody>
          <ModalContent className="flex flex-col relative min-h-[600px]">
            <AnimatePresence initial={false}>
              {step === 0 ? (
                <motion.div
                  className="w-full absolute top-5 left-0 min-h-[550px] z-30 p-5"
                  initial={{ opacity: 0, scale: 1, translateY: -1000 }}
                  animate={{ opacity: 1, scale: 1, translateY: 0 }}
                  transition={{ duration: 1 }}
                  exit={{ opacity: 0, scale: 1, translateY: -1000 }}
                  key="one"
                >
                  <h3 className="relative text-2xl font-semibold text-primary mb-3">
                    {product.heading}
                  </h3>
                    <div className="relative flex flex-col">
                      <hr/>
                      <PowderSelection />
                      <hr/>
                      <ConfettiSelection />
                    </div>
                  <ModalFooter className="gap-4 mt-5">
                    <CloseButton />
                    <Button
                      variant="default"
                      onClick={() => setStep(step + 1)}
                      disabled={disabled}
                    >
                      Next
                    </Button>
                  </ModalFooter>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {step === 1 ? (
                <motion.div
                  className="w-full flex absolute top-5 left-0 flex-col min-h-[550px] z-30 p-5"
                  initial={{ opacity: 0, scale: 1, translateY: 1000 }}
                  animate={{ opacity: 1, scale: 1, translateY: 0 }}
                  transition={{ duration: 1 }}
                  exit={{ opacity: 0, scale: 1, translateY: 1000 }}
                  key="one"
                >
                  <h3 className="relative text-2xl font-semibold text-primary mb-3">
                    Selection Confirmation:
                  </h3>
                  <hr/>
                  <div className="relative w-full min-h-[400px] flex flex-col">
                    <SelectionConfirmation
                      product={product}
                      totalPrice={totalPrice}
                      selectedPowder={selectedPowder}
                      selectedConfetti={selectedConfetti}
                    />
                  </div>
                  <ModalFooter className="gap-4 mt-10">
                    <Button
                      variant="secondary"
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                    <Button variant="default" onClick={onConfirmation}>
                      Confirm
                    </Button>
                  </ModalFooter>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  )
}
