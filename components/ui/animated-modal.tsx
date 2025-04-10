"use client"

import React, {
  createContext,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { Button } from "./button"

interface ModalContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = memo(({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const value = useMemo(() => ({ open, setOpen }), [open])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
})
ModalProvider.displayName = "ModalProvider"

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

export const Modal = memo(function Modal({
  children,
}: {
  children: ReactNode
}) {
  return <ModalProvider>{children}</ModalProvider>
})
Modal.displayName = "Modal"

export const ModalTrigger = memo(
  ({ children, className }: { children: ReactNode; className?: string }) => {
    const { setOpen } = useModal()
    return (
      <button
        className={cn(
          "relative overflow-hidden rounded-xl text-center text-primary",
          className
        )}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
    )
  }
)
ModalTrigger.displayName = "ModalTrigger"

export const ModalBody = memo(
  ({ children, className }: { children: ReactNode; className?: string }) => {
    const { open } = useModal()

    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "auto"
      }
    }, [open])

    const modalRef = useRef(null)
    const { setOpen } = useModal()
    useOutsideClick(modalRef, () => setOpen(false))

    const memoizedAnimatePresence = useMemo(
      () => (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                backdropFilter: "blur(10px)",
              }}
              exit={{
                opacity: 0,
                backdropFilter: "blur(0px)",
              }}
              className="fixed inset-0 z-50 flex size-full items-center justify-center [perspective:800px] [transform-style:preserve-3d]"
            >
              <Overlay />

              <motion.div
                ref={modalRef}
                className={cn(
                  "relative z-50 flex max-h-[90%] min-w-[350px] max-w-[90%] flex-1 flex-col overflow-hidden rounded-2xl border border-muted bg-background shadow-md md:max-w-[80%] lg:max-w-[800px]",
                  className
                )}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotateX: 40,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  rotateX: 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                }}
              >
                <CloseIcon />
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ),
      [open, className, children, setOpen]
    )

    return memoizedAnimatePresence
  }
)
ModalBody.displayName = "ModalBody"

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cn("flex flex-1 flex-col p-8 md:p-10", className)}>
      {children}
    </div>
  )
}

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cn("flex justify-end bg-background p-4", className)}>
      {children}
    </div>
  )
}

const Overlay = ({ className }: { className?: string }) => {
  return useMemo(
    () => (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          backdropFilter: "blur(10px)",
        }}
        exit={{
          opacity: 0,
          backdropFilter: "blur(0px)",
        }}
        className={`fixed inset-0 z-50 size-full bg-background/50 ${className}`}
      ></motion.div>
    ),
    [className]
  )
}

const CloseIcon = () => {
  const { setOpen } = useModal()
  return (
    <button
      onClick={() => setOpen(false)}
      className="group absolute right-4 top-4 z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 text-primary transition duration-200 group-hover:rotate-3 group-hover:scale-125"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  )
}

export const CloseButton = () => {
  const { setOpen } = useModal()
  return (
    <Button
      variant="secondary"
      onClick={() => setOpen(false)}
      className="group z-50"
    >
      Cancel
    </Button>
  )
}

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      callback(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, callback])
}
