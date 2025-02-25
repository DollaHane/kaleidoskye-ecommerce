"use client"

import * as React from "react"
import { FC } from "react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { signIn } from "next-auth/react"

import { Button } from "../ui/button"
import { Icons } from "../icons"

interface GoogleAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const GoogleAuthForm: FC<GoogleAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "flex justify-center rounded-full bg-gradient-to-r from-red-500 via-yellow-300 to-blue-500 p-[1.5px] shadow-md",
        className
      )}
      {...props}
    >
      <Button
        className="w-full bg-background rounded-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  )
}

export default GoogleAuthForm