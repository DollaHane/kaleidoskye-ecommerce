"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import {
  zodConfettiColourEnum,
  zodPowderColourEnum,
} from "@/lib/validators/addToCartValidation"

type PowderEnum = (typeof zodPowderColourEnum)[number]
type ConfettiEnum = (typeof zodConfettiColourEnum)[number]

type ProductStoreState = {
  powder: PowderEnum[] | undefined
  powderPrice: number
  confetti: ConfettiEnum[] | undefined
  confettiPrice: number
  noPowderNeeded: boolean
  noConfettiNeeded: boolean
  quantity: number
}

type ProductStoreActions = {
  setClearState: () => void
  setQuantity: (qty: number) => void
  setPowder: (pwd: PowderEnum) => void
  setConfetti: (conf: ConfettiEnum) => void
  setNoPowderNeeded: (boolean: boolean) => void
  setNoConfettiNeeded: (boolean: boolean) => void
}

type ProductStore = ProductStoreState & ProductStoreActions

const defaultValues = {
  powder: [] as PowderEnum[],
  powderPrice: 50.0,
  confetti: [] as ConfettiEnum[],
  confettiPrice: 50.0,
  noPowderNeeded: false,
  noConfettiNeeded: false,
  quantity: 1
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      powder: defaultValues.powder,
      powderPrice: defaultValues.powderPrice,
      confetti: defaultValues.confetti,
      confettiPrice: defaultValues.confettiPrice,
      noPowderNeeded: defaultValues.noPowderNeeded,
      noConfettiNeeded: defaultValues.noConfettiNeeded,
      quantity: defaultValues.quantity,

      setClearState: () => {
        set(() => {
          return {
            powder: defaultValues.powder,
            powderPrice: defaultValues.powderPrice,
            confetti: defaultValues.confetti,
            confettiPrice: defaultValues.confettiPrice,
            noPowderNeeded: defaultValues.noPowderNeeded,
            noConfettiNeeded: defaultValues.noConfettiNeeded,
            quantity: defaultValues.quantity
          }
        })
      },

      setQuantity: (qty: number) => {
        set(() => {
          return {
            quantity: qty
          }
        })
      },

      setPowder: (pwd: PowderEnum) => {
        set((state: ProductStoreState) => {
          if (state.powder?.includes(pwd) ) {
            return {
              powder: state.powder.filter((item) => item !== pwd),
            }
          } else {
            if (state.powder && state.powder.length <= 1 && state.noPowderNeeded === false) {
              return {
                powder: [...state.powder, pwd],
              }
            }
          }
          return state
        })
      },

      setConfetti: (conf: ConfettiEnum) =>
        set((state: ProductStoreState) => {
          if (state.confetti?.includes(conf)) {
            return {
              confetti: state.confetti.filter((item: string) => item !== conf),
            }
          } else {
            if (state.confetti && state.confetti?.length <= 2 && state.noConfettiNeeded === false) {
              return {
                confetti: [...state.confetti, conf],
              }
            }
          }
          return state
        }),

      setNoPowderNeeded: (boolean: boolean) =>
        set(() => {
          return {
            noPowderNeeded: boolean,
            powder: defaultValues.powder,
            powderPrice: defaultValues.powderPrice,
          }
        }),

      setNoConfettiNeeded: (boolean: boolean) =>
        set(() => {
          return {
            noConfettiNeeded: boolean,
            confetti: defaultValues.confetti,
            confettiPrice: defaultValues.confettiPrice,
          }
        }),
    }),
    { name: "product-store" }
  )
)
