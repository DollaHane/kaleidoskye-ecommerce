"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { Loader } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  SignInCreationRequest,
  validateSignIn,
} from "@/lib/validators/authValidation"
import { toast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import ResetPasswordForm from "./ForgotPasswordRequestForm"

export default function SignIn() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState<boolean>(false)

  const form = useForm<z.infer<typeof validateSignIn>>({
    resolver: zodResolver(validateSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate: submitMutation } = useMutation({
    mutationFn: async ({ email, password }: SignInCreationRequest) => {
      const payload: SignInCreationRequest = { email, password }
      await axios.post("/api/auth/signin", payload)
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
      })
    },
    onMutate: () => {
      return toast({
        title: "Form Submitted.",
        description: "Processing request.",
      })
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
          title: "Authentication Error.",
          description: "Incorrect password.",
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
      setSubmitted(false)
      return toast({
        title: "Success!",
        description: "Successfully signed in, redirecting.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      }
    },
  })

  function onSubmit(values: z.infer<typeof validateSignIn>) {
    const payload = {
      email: values.email,
      password: values.password,
    }
    submitMutation(payload)
    form.reset()
    setSubmitted(true)
  }

  return (
    <div className="w-full flex p-5 justify-center">
      <div className="w-full md:w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              <Button
                type="submit"
                disabled={submitted}
                className="relative flex w-20"
              >
                {submitted ? (
                  <Loader className="flex absolute h-6 w-6 animate-spin" />
                ) : (
                  <p>Login</p>
                )}
              </Button>
              <ResetPasswordForm />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
