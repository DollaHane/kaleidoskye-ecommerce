"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/cart-store"
import { useProductStore } from "@/store/product-store"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { AxiosError } from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { ulid } from "ulid"

import { Cannon } from "@/lib/product-attributes"
import { AddToCartValidationCreationRequest } from "@/lib/validators/addToCartValidation"
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
import ConfettiSelection, { confettiImages } from "./ConfettiSelection"
import PowderSelection, { powderImages } from "./PowderSelection"
import SelectionConfirmation from "./SelectionConfirmation"

interface AddToCartModal {
  product: Cannon
}

export default function AddToCartModal({ product }: AddToCartModal) {
  const [step, setStep] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
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
      const response = await axios.post("/api/add-to-cart", payload)
      console.log("Add To Cart: ", response)
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
      setClearState()
      window.location.reload()
      return toast({
        title: "Success!",
        description: "Added to cart.",
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
    setIsSubmitting(true)
    submitToCart(payload)
  }

  return (
    <div>
      <Modal>
        <div className="absolute bottom-[95px] right-3">
          <ModalTrigger className="group relative flex h-10 w-32 items-center justify-center bg-accent text-center hover:bg-black/90">
            <span className="flex text-center font-bold transition duration-500 group-hover:translate-x-40">
              Add to Cart
            </span>
            <div className="absolute inset-0 z-20 flex -translate-x-40 items-center justify-center text-white transition duration-500 group-hover:translate-x-0">
              <Icons.basket />
            </div>
          </ModalTrigger>
        </div>
        <ModalBody>
          <ModalContent className="relative flex min-h-[600px] flex-col">
            <AnimatePresence initial={false}>
              {step === 0 ? (
                <motion.div
                  className="absolute left-0 top-5 z-30 min-h-[550px] w-full p-5"
                  initial={{ opacity: 0, scale: 1, translateY: -1000 }}
                  animate={{ opacity: 1, scale: 1, translateY: 0 }}
                  transition={{ duration: 1 }}
                  exit={{ opacity: 0, scale: 1, translateY: -1000 }}
                  key="one"
                >
                  <h3 className="relative mb-3 text-2xl font-semibold text-primary">
                    {product.heading}
                  </h3>
                  <div className="relative flex flex-col">
                    <hr />
                    <PowderSelection />
                    <hr />
                    <ConfettiSelection />
                  </div>
                  <ModalFooter className="mt-5 gap-4 px-0">
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
                  className="absolute left-0 top-5 z-30 flex min-h-[550px] w-full flex-col p-5"
                  initial={{ opacity: 0, scale: 1, translateY: 1000 }}
                  animate={{ opacity: 1, scale: 1, translateY: 0 }}
                  transition={{ duration: 1 }}
                  exit={{ opacity: 0, scale: 1, translateY: 1000 }}
                  key="one"
                >
                  <h3 className="relative mb-3 text-2xl font-semibold text-primary">
                    Selection Confirmation:
                  </h3>
                  <hr />
                  <div className="relative flex min-h-[400px] w-full flex-col">
                    <SelectionConfirmation
                      product={product}
                      totalPrice={totalPrice}
                      selectedPowder={selectedPowder}
                      selectedConfetti={selectedConfetti}
                    />
                  </div>
                  <ModalFooter className="mt-0 gap-4 px-0">
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
