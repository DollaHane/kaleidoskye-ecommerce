import { addToCartValidation } from "@/lib/validators/addToCartValidation"

export type CartItem = z.infer<typeof addToCartValidation>

export type RedisCartItem = CartItem & {
  userId: string
  createdAt: Date
}
