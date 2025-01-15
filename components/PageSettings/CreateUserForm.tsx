"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { Loader } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  CreateUserValidationRequest,
  createUserValidation,
} from "@/lib/validators/createUserValidation"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/config/site"

export default function CreateUserForm() {
  const [admin, setAdmin] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const form = useForm<z.infer<typeof createUserValidation>>({
    resolver: zodResolver(createUserValidation),
    defaultValues: {
      name: "",
      email: "",
      admin: false,
    },
  })

  const { mutate: createUser } = useMutation({
    mutationFn: async ({ name, email, admin }: CreateUserValidationRequest) => {
      const payload: CreateUserValidationRequest = {
        name,
        email,
        admin,
      }
      const response = await axios.post("/api/createUser", payload)
      return response
    },
    onMutate: () => {
      return toast({
        title: "Form Submitted.",
        description: "Busy processing request.",
      })
    },
    onError: (error: AxiosError) => {
      setSubmitted(false)
      if (error.response?.status === 401) {
        return toast({
          title: "Authentication Error.",
          description:
            "You are either not signed in or you do not have permission to execute this operation. Please contact your administrator.",
          variant: "destructive",
        })
      }
      if (error.response?.status === 400) {
        return toast({
          title: "Data Validation Error.",
          description:
            "There was an error processing the data provided. Please try again.",
          variant: "destructive",
        })
      }
      if (error.response?.status === 500) {
        return toast({
          title: "Connection Error.",
          description:
            "Failed to create user due to a connection error. Please try again.",
          variant: "destructive",
        })
      }
    },
    onSuccess: () => {
      setSubmitted(false)
      return toast({
        title: "Success!",
        description: "Successfully created user.",
      })
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log("onSettled error:", error)
      }
    },
  })

  function onSubmit(values: z.infer<typeof createUserValidation>) {
    const payload = {
      name: values.name,
      email: values.email,
      admin: admin,
    }
    createUser(payload)
    form.reset()
    setSubmitted(true)
  }

  return (
    <div className="w-full p-5">
      <div>
        <h2 className=" text-lg font-semibold mb-10">Create User:</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Full name and surname.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be a valid {siteConfig.businessName} employee email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="admin"
              render={({ field }) => (
                <FormItem className="flex items-center gap-5">
                  <FormControl>
                    <Checkbox
                      className="w-5 h-5"
                      checked={admin}
                      onCheckedChange={() => setAdmin(!admin)}
                    />
                  </FormControl>
                  <p className="text-sm flex text-muted-foreground pb-2">
                    Assign user application administrative rights?
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={submitted}
              className="relative flex w-20"
            >
              {submitted ? (
                <Loader className="flex absolute h-6 w-6 animate-spin" />
              ) : (
                <p>Submit</p>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
