"use client"

import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { currentYear } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Icons } from "./icons"

function FooterSection() {
  const [isDarkMode, setIsDarkMode] = React.useState(true)
  const [isChatOpen, setIsChatOpen] = React.useState(false)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <footer className="relative border-t bg-accent text-foreground transition-colors duration-300">
      <div className="container mx-auto bg-accent px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a
                href={siteConfig.links.home}
                className="block transition-colors hover:text-primary"
              >
                Home
              </a>
              <a
                href={siteConfig.links.store}
                className="block transition-colors hover:text-primary"
              >
                Store
              </a>
              <a
                href={siteConfig.links.cart}
                className="block transition-colors hover:text-primary"
              >
                Cart
              </a>
              <a
                href={siteConfig.links.signin}
                className="block transition-colors hover:text-primary"
              >
                Signin
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>
                Phone:{" "}
                <Link href={siteConfig.socials.whatsapp.href} target="_blank">
                  {siteConfig.phone}
                </Link>
              </p>
              <p>
                Email:{" "}
                <Link href={siteConfig.socials.email.href} target="_blank">
                  {siteConfig.supportEmail}
                </Link>
              </p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Icons.facebook />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Icons.instagram />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Icons.tiktok />
                      <span className="sr-only">TikTok</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on TikTok</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm">
            Copyright © {currentYear} {siteConfig.businessName}. All rights
            reserved.
          </p>
          <p className="text-sm">
            Developed by{" "}
            <Link href="https://www.buildsoftware.co.za" target="_blank">
              Build Software
            </Link>
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { FooterSection }
