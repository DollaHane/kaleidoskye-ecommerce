"use client"

import { z } from "zod"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { addToCartValidation } from "@/lib/validators/addToCartValidation"

export type CartItem = z.infer<typeof addToCartValidation>

type CartStoreState = {
  cartItems: CartItem[]
}

type CartStoreActions = {
  setAddCartItem: (cartItem: CartItem) => void
  setRemoveCartItem: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
}

type CartStore = CartStoreState & CartStoreActions

const defaultValues = {
  cartItems: [],
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: defaultValues.cartItems,

      setAddCartItem: (cartItem: CartItem) => {
        set((state: CartStoreState) => {
          return {
            cartItems: [...state.cartItems, cartItem],
          }
        })
      },

      setRemoveCartItem: (id: string) => {
        set((state: CartStoreState) => {
          const newState = state.cartItems.filter((item) => item.id !== id)
          return {
            cartItems: [...newState],
          }
        })
      },

      setQuantity: (id: string, quantity: number) => {
        set((state: CartStoreState) => {
          let updatedState = []
          for (let i=0; i<state.cartItems.length; i++){
            const totalPrice = (state.cartItems[i].cannonPrice + state.cartItems[i].powderPrice + state.cartItems[i].confettiPrice) * quantity
            if (state.cartItems[i].id === id) {
              state.cartItems[i].quantity = quantity
              state.cartItems[i].totalPrice = totalPrice
            }
            updatedState.push(state.cartItems[i])
          }
          return {
            cartItems: [...updatedState]
          }
        })
      }
    }),
    { name: "cart-store" }
  )
)
