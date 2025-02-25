"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

import { Button } from "./button"

interface RootLayoutProps {
  children: React.ReactNode
  content: React.ReactNode
}

export const Portal = ({ children, content }: RootLayoutProps) => {
  const ref = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal")
    setMounted(true)
  }, [])

  return (
    <div onMouseEnter={() => setIsHovered(true)} className="relative">
      {children}
      {mounted &&
        isHovered &&
        ref.current &&
        createPortal(
          <div
            onMouseEnter={() => setIsHovered(true)}
            className="absolute right-0 top-28 z-50 rounded-md bg-background shadow-lg animate-in slide-in-from-bottom-3 md:top-16"
          >
            <div className="flex w-full items-center justify-end">
              <Button
                variant="ghost"
                className="hover:bg-transparent"
                onClick={() => setIsHovered(false)}
              >
                <X />
              </Button>
            </div>
            {content}
          </div>,
          ref.current
        )}
    </div>
  )
}
