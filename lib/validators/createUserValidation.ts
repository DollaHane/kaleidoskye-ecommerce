import { z } from "zod"
import { regexEmail } from "../regex/regex"

export const createUserValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Users name must be longer than 2 characters" })
    .max(100, { message: "Users name cannot be longer than 100 characters" }),
  email: z
    .string()
    .refine((value) => regexEmail.test(value), {
      message: "Not a valid email.",
    }),
  admin: z.boolean()
})

export type CreateUserValidationRequest = z.infer<typeof createUserValidation>
