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
  UpdatePasswordCreationRequest,
  validateUpdatePassword,
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

interface UpdatePasswordFormProps {
  user: userType[]
}

export default function UpdatePasswordForm({ user }: UpdatePasswordFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [input, setInput] = useState<string>("")
  // const captchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY!
  // const [captchaValue, setCaptchaValue] = useState<string>("")

  const form = useForm({
    resolver: zodResolver(validateUpdatePassword),
    defaultValues: {
      previousPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const { mutate: handleMutation } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      newPassword,
      previousPassword,
      confirmPassword,
    }: UpdatePasswordCreationRequest) => {
      const payload: UpdatePasswordCreationRequest = {
        previousPassword,
        newPassword,
        confirmPassword,
      }
      const post = await axios.post("/api/auth/password-update", payload)
      return post
    },
    onError: (error: AxiosError) => {
      setSubmitted(false)
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
      if (error.response?.status === 402) {
        return toast({
          title: "Authentication Error.",
          description: "Incorrect password.",
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
      form.reset()
      if (session) {
        signOut({
          callbackUrl: `${window.location.origin}/signin`,
        })
      } else {
        router.push("/signin")
      }
      return toast({
        title: "Success!",
        description: "Your password was changed successfully!",
      })
    },
  })

  function onSubmit(value: z.infer<typeof validateUpdatePassword>) {
    console.log("value", value)
    if (value.newPassword === value.confirmPassword) {
      const payload: UpdatePasswordCreationRequest = {
        previousPassword: value.previousPassword,
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword,
      }
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
      <h1 className="mt-10 text-center">
        Reset password for account:{" "}
        <span className="italic text-customAccent">{user[0].email}</span>
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-5 w-full space-y-6 md:w-6/12"
        >
          {/* PREVIOUS PASSWORD */}
          <FormField
            control={form.control}
            name="previousPassword"
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
                <FormLabel>Confirm Password</FormLabel>
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
              variant="outline"
              className="flex relative items-center justify-center"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 absolute flex animate-spin" />
              ) : (
                "Update Password"
              )}
            </Button>
          </>
        </form>
      </Form>
    </div>
  )
}
