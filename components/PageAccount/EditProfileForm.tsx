"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { userType } from "@/types/db"
import { ShippingAddress } from "@/types/shipping-address"
import {
  EditProfileCreationRequest,
  validateEditProfile,
} from "@/lib/validators/editProfileValidation"
import { toast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface EditProfileProps {
  onCancel: (data: boolean) => void
  user: userType
}

export default function EditProfileForm({ onCancel, user }: EditProfileProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(true)
  const queryClient = useQueryClient()

  useEffect(() => {
    onCancel(edit)
  }, [edit])

  const shippingAddress = user.shippingAddress as ShippingAddress

  const form = useForm<z.infer<typeof validateEditProfile>>({
    resolver: zodResolver(validateEditProfile),
    defaultValues: {
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      phone: JSON.stringify(user.phone) || "",
      shippingAddress: {
        streetAddress: shippingAddress.streetAddress || "",
        unitNum: shippingAddress.unitNum || "",
        city: shippingAddress.city || "",
        province: shippingAddress.province || "",
        zipCode: shippingAddress.zipCode || "",
      },
    },
  })

  const { mutate: handleMutation } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      firstname,
      lastname,
      phone,
      shippingAddress,
    }: EditProfileCreationRequest) => {
      const payload: EditProfileCreationRequest = {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        shippingAddress: shippingAddress,
      }
      const post = await axios.patch("/api/edit-profile", payload)
      return post
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
      setEdit(false)
      form.reset()
      return toast({
        title: "Success!",
        description: "Your profile was changed successfully!",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["userInfo"],
        })
      }
    },
  })

  function onSubmit(value: z.infer<typeof validateEditProfile>) {
    console.log("value", value)
    const payload: EditProfileCreationRequest = {
      firstname: value.firstname,
      lastname: value.lastname,
      phone: value.phone,
      shippingAddress: {
        streetAddress: value.shippingAddress.streetAddress,
        unitNum: value.shippingAddress.unitNum,
        city: value.shippingAddress.city,
        province: value.shippingAddress.province,
        zipCode: value.shippingAddress.zipCode,
      },
    }
    setIsSubmitting(true)
    handleMutation(payload)
    console.log("Submit Payload:", payload)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="mx-auto max-w-2xl py-5"
        initial={{ opacity: 0, scale: 1, translateX: -500 }}
        animate={{ opacity: 1, scale: 1, translateX: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, scale: 1, translateX: -500 }}
      >
        <div className="mb-8">
          <p className="text-muted-foreground">
            Update your shipping address details below.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Surname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="+(27) 0 xxx xxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress.streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Street Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress.unitNum"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Unit # (Optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="shippingAddress.city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="City / Town" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress.province"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="shippingAddress.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="ZIP Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-5">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span>
                    <Loader2 className="size-3 animate-spin" /> "Saving..."
                  </span>
                ) : (
                  "Save Address"
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEdit(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </AnimatePresence>
  )
}
