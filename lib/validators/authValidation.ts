import { z } from "zod"

import {
  regexEmail,
  regexNumber,
  regexUppercase,
  specialCharsRegex,
} from "../regex/regex"

export const validatePassword = z
  .string()
  .min(8, { message: "Requires minimum 8 characters" })
  .refine((value) => specialCharsRegex.test(value), {
    message: "Requires minimum one special character: &%$#@!",
  })
  .refine((value) => regexNumber.test(value), {
    message: "Requires minimum one number",
  })
  .refine((value) => regexUppercase.test(value), {
    message: "Requies minimum one uppercase letter.",
  })

export const validateEmail = z
  .string()
  .refine((value) => regexEmail.test(value), {
    message: "Not a valid email.",
  })

export const validateSignIn = z.object({
  email: z.string(),
  password: validatePassword,
})

export const validateUpdatePassword = z.object({
  previousPassword: validatePassword,
  newPassword: validatePassword,
  confirmPassword: validatePassword,
})

export const validateForgotPassword = z.object({
  email: validateEmail,
  newPassword: validatePassword,
  confirmPassword: validatePassword,
})

export const validateForgotPasswordRequest = z.object({
  email: z.string(),
})

export const validateVerifyEmail = z.object({
  emailVerified: z.string(),
})

export type SignInCreationRequest = z.infer<typeof validateSignIn>
export type UpdatePasswordCreationRequest = z.infer<
  typeof validateUpdatePassword
>
export type ForgotPasswordCreationRequest = z.infer<
  typeof validateForgotPassword
>
export type ForgotPasswordRequestCreationRequest = z.infer<
  typeof validateForgotPasswordRequest
>
export type ValidateEmailCreationRequest = z.infer<typeof validateVerifyEmail>
