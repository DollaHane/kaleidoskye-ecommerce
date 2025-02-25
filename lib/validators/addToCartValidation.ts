import { z } from "zod"

import { contents, products } from "../product-attributes"

export const zodCannonEnum = [products[0].id, products[1].id] as const
export const zodPowderColourEnum = [
  "White",
  "Red",
  "Orange",
  "Mustard",
  "Yellow",
  "Green",
  "Blue",
  "Lilac",
  "Purple",
  "Pink",
  "Baby Pink",
] as const
export const zodConfettiColourEnum = [
  "Gold",
  "White",
  "Red",
  "Orange",
  "Lime",
  "Green",
  "Blue",
  "Dark Blue",
  "Purple",
  "Pink",
] as const

export const addToCartValidation = z.object({
  id: z.string(),
  cannonSize: z.enum(zodCannonEnum),
  cannonName: z.string(),
  powder: z.enum(zodPowderColourEnum).array().optional(),
  confetti: z.enum(zodConfettiColourEnum).array().optional(),
  noPowder: z.boolean(),
  noConfetti: z.boolean(),
  quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
  totalPrice: z.number().min(150).max(250),
  cannonPrice: z
    .number()
    .min(products[0].priceCart, {
      message: `Cannon price cannot be less than ${products[0].priceCart} ZAR.`,
    })
    .max(products[1].priceCart, {
      message: `Cannon price cannot be more than ${products[1].priceCart} ZAR.`,
    }),
  powderPrice: z
    .number()
    .min(0, {
      message: `Powder price cannot be less than 0 ZAR.`,
    })
    .max(contents[0].priceCart, {
      message: `Powder price cannot be more than ${contents[0].priceCart} ZAR.`,
    }),
  confettiPrice: z
    .number()
    .min(0, {
      message: `Confetti price cannot be less than 0 ZAR.`,
    })
    .max(contents[1].priceCart, {
      message: `Confetti price cannot be more than ${contents[1].priceCart} ZAR.`,
    }),
})

export type AddToCartValidationCreationRequest = z.infer<
  typeof addToCartValidation
>
