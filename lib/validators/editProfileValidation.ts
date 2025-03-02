import { z } from "zod"

export const validateEditProfile = z.object({
  firstname: z.string().min(1, "Name is required"),
  lastname: z.string().min(1, "Surname is required"),
  phone: z.string(),
  shippingAddress: z.object({
    streetAddress: z.string().min(1, "Street address is required"),
    suburb: z.string().min(1, "Suburb is required"),
    unitNum: z.string().optional(),
    city: z.string().min(1, "City is required"),
    province: z.string().min(1, "Province is required"),
    zipCode: z.string().min(4, "ZIP code must be at least 5 characters"),
  }),
})

export type EditProfileCreationRequest = z.infer<typeof validateEditProfile>
