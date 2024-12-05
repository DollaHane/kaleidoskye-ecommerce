"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  ForgotPasswordRequestCreationRequest,
  validateForgotPasswordRequest,
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function ForgotPasswordRequestForm() {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(validateForgotPasswordRequest),
    defaultValues: {
      email: "",
    },
  })

  const { mutate: resetPassword } = useMutation({
    // PAYLOAD
    mutationFn: async ({ email }: ForgotPasswordRequestCreationRequest) => {
      const payload: ForgotPasswordRequestCreationRequest = {
        email,
      }
      const { data } = await axios.post("/api/password-reset-request", payload)

      return data
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
      if (error.response?.status === 409) {
        return toast({
          title: "Authentication Error.",
          description: "Email does not exist. Please contact support.",
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
      setSubmitted(true)
      return toast({
        title: "Success!",
        description:
          "Please check your account email for a link to change your password.",
      })
    },
  })

  function onSubmit(values: z.infer<typeof validateForgotPasswordRequest>) {
    const payload = {
      email: values.email,
    }
    resetPassword(payload)
    form.reset()
    setIsSubmitting(true)
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="group flex h-9 items-center text-sm text-primary justify-center rounded-full border border-transparent bg-background px-3 shadow-lg hover:bg-muted">
          Forgot Password
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-5 font-bold">
                  <p className="italic">Forgot Password Reset:</p>
                </AlertDialogTitle>

                <AlertDialogDescription>
                  <div className="relative mb-10 grid grid-cols-1 gap-2">
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
                  </div>

                  <div>
                    <p className="text-xs italic">
                      (Note: Please supply your accound details, after which
                      we&apos;ll send you a link to reset your password.)
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                {!submitted ? (
                  <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
                    <div className="space-x-5">
                      <Button type="submit" variant="outline" className="w-20 relative flex items-center justify-center">
                        {isSubmitting ? (
                          <Loader2 className="absolute flex h-5 w-5 animate-spin" />
                        ) : (
                          "Send"
                        )}
                      </Button>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </div>
                  </div>
                ) : (
                  <AlertDialogAction onClick={() => setSubmitted(false)}>
                    Close
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
