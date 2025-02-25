"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { Loader2 } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { userType } from "@/types/db"
import {
  ForgotPasswordCreationRequest,
  validateForgotPassword,
} from "@/lib/validators/authValidation"
import { toast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

// import ReCAPTCHA from "react-google-recaptcha"

export default function ForgotPasswordForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  // const captchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY!
  // const [captchaValue, setCaptchaValue] = useState<string>("")

  const form = useForm({
    resolver: zodResolver(validateForgotPassword),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const { mutate: handleMutation } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      email,
      newPassword,
      confirmPassword,
    }: ForgotPasswordCreationRequest) => {
      const payload: ForgotPasswordCreationRequest = {
        email,
        newPassword,
        confirmPassword,
      }
      const post = await axios.post(
        "/api/auth/password-update-request/",
        payload
      )
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
          title: "Token Expired.",
          description:
            "Your reset password token has expired. Please submit a new request to change your password.",
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
      form.reset()
      router.push("/signin")
      return toast({
        title: "Success!",
        description: "Your password was changed successfully!",
      })
    },
  })

  function onSubmit(value: z.infer<typeof validateForgotPassword>) {
    if (value.newPassword === value.confirmPassword) {
      const payload: ForgotPasswordCreationRequest = {
        email: value.email,
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword,
      }
      setIsSubmitting(true)
      handleMutation(payload)
      console.log("Submit Payload:", payload)
    } else {
      return toast({
        title: "Password miss match!",
        description:
          "The passwords supplied do not match, please re-enter your password",
      })
    }
  }

  // useEffect(() => {
  //   if (captchaValue && captchaValue.length > 20) {
  //     setDisabled(false)
  //   }
  // }, [captchaValue])

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form
          // @ts-ignore
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-5 w-full space-y-6 md:w-6/12"
        >
          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* NEW PASSWORD */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONFIRM PASSWORD */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <>
            {/* {captchaKey && (
                  <ReCAPTCHA
                    sitekey={captchaKey}
                    onChange={(value: any) => setCaptchaValue(value)}
                  />
                )} */}
            <Button
              type="submit"
              // disabled={disabled}
              variant="outline"
              className="relative flex items-center justify-center"
            >
              {isSubmitting ? (
                <Loader2 className="absolute flex h-5 w-5 animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </>
        </form>
      </Form>
    </div>
  )
}
