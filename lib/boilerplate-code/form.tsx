"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// import ReCAPTCHA from "react-google-recaptcha"


export const validateValue = z.object({
  value: z
    .string()
    .min(3, { message: "Value must be longer than 2 characters" })
    .max(100, { message: "Value cannot be longer than 100 characters" }),
})

export type valueCreationRequest = z.infer<typeof validateValue>

interface FormComponentProps {
  prop: string
}

export default function FormComponent({ prop }: FormComponentProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  // const captchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY!
  // const [captchaValue, setCaptchaValue] = useState<string>("")

  const form = useForm({
    resolver: zodResolver(validateValue),
    defaultValues: {
      value: ""
    },
  })

  const { mutate: handleMutation } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      value
    }: valueCreationRequest) => {
      const payload: valueCreationRequest = {
        value
      }
      const post = await axios.post("/api/path-to-route", payload)
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
      form.reset()
      return toast({
        title: "Success!",
        description: "Your password was changed successfully!",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      } else {
        router.push('/path')
        await queryClient.invalidateQueries({
          queryKey: ["key"],
        })
      }
    },
  })

  function onSubmit(value: z.infer<typeof validateValue>) {
      const payload: valueCreationRequest = {
        value: value.value
      }
      handleMutation(payload)
      setIsSubmitting(true)
      console.log("Submit Payload:", payload)
      return toast({
        title: "Form Submitted",
        description: "Processing request.",
      })
  }

  // useEffect(() => {
  //   if (captchaValue && captchaValue.length > 20) {
  //     setDisabled(false)
  //   }
  // }, [captchaValue])

  return (
    <div className="flex flex-col">
      <h1 className="mt-10 text-center">
        Title
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-5 w-full space-y-6 md:w-6/12"
        >
          {/* FIELD */}
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                "Send"
              )}
            </Button>
          </>
        </form>
      </Form>
    </div>
  )
}
