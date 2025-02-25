import React from "react"
import Image from "next/image"
import { useProductStore } from "@/store/product-store"
import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, ChevronRight } from "lucide-react"

import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock"
import Blue from "@/components/Assets/Colours/c-blue.png"
import DarkBlue from "@/components/Assets/Colours/c-dark-blue.png"
import Gold from "@/components/Assets/Colours/c-gold.png"
import Green from "@/components/Assets/Colours/c-green.png"
import Lime from "@/components/Assets/Colours/c-lime.png"
import Orange from "@/components/Assets/Colours/c-orange.png"
import Pink from "@/components/Assets/Colours/c-pink.png"
import Purple from "@/components/Assets/Colours/c-purple.png"
import Red from "@/components/Assets/Colours/c-red.png"
import White from "@/components/Assets/Colours/c-white.png"

import { Checkbox } from "../ui/checkbox"
import { Divider } from "../ui/divider"

export default function ConfettiSelection() {
  const {
    setNoConfettiNeeded,
    setConfetti,
    confetti,
    noPowderNeeded,
    noConfettiNeeded,
  } = useProductStore()

  return (
    <div className="relative flex flex-col items-center justify-center">
      <Divider />
      <div className="relative w-full max-w-[700px] flex flex-col items-center justify-center">
        <div className="h-40 w-12 md:w-16 absolute top-0 left-0  bg-gradient-to-r from-background to-background/0 z-40" />
        <div className="h-40 w-12 md:w-16 absolute top-0 right-0  bg-gradient-to-l from-background to-background/0 z-40" />
        <div className="relative w-full h-28 flex items-start justify-start overflow-x-scroll overflow-y-clip mb-5">
          <Dock className="absolute min-w-[680px] left-0 bottom-0 items-end pb-3 pl-20 ">
            {confettiImages.map((pwd, idx) => (
              <DockItem key={idx} className="aspect-square rounded-full">
                <DockLabel>{pwd.label}</DockLabel>
                <DockIcon>
                  <div
                    // @ts-ignore
                    onClick={() => setConfetti(pwd.label)}
                    className="relative flex"
                  >
                    {/* @ts-ignore */}
                    {confetti && confetti.includes(pwd.label) && (
                      <div className="absolute flex size-6 top-0 right-0 items-center justify-center bg-accent rounded-full shadow-md">
                        {/* @ts-ignore */}
                        {confetti && confetti.indexOf(pwd.label) + 1}
                      </div>
                    )}
                    {pwd.image}
                  </div>
                </DockIcon>
              </DockItem>
            ))}
          </Dock>
        </div>
      </div>
      <div className="w-full items-center justify-start z-50 ">
        <div className="h-28 overflow-hidden mb-5">
          {confetti && confetti.length > 0 ? (
            <AnimatePresence initial={true}>
              <motion.div
                className="flex flex-row"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <p className="font-semibold mb-5">
                  Confetti selection{" "}
                  <span className="text-xs text-muted-foreground italic">
                    (max 3)
                  </span>
                  :
                </p>
              </motion.div>
              {confetti.map((pwd) => (
                <motion.div
                  className="flex flex-row"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, scale: 0 }}
                  key={pwd}
                >
                  <ChevronRight className="text-accent" /> {pwd}
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <AnimatePresence initial={true}>
              <motion.div
                className="flex h-full font-semibold items-center justify-center flex-col gap-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <div className="flex flex-row gap-2 items-center">
                  <AlertTriangle className="text-accent" />
                  <p>No confetti selected</p>
                  <AlertTriangle className="text-accent" />
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="flex flex-row items-center justify-start gap-3">
          <Checkbox
            disabled={noPowderNeeded}
            checked={noConfettiNeeded}
            onCheckedChange={() => setNoConfettiNeeded(!noConfettiNeeded)}
          />
          <p className="text-muted-foreground text-sm italic">
            I don&apos;t need powder.
          </p>
        </div>
      </div>
    </div>
  )
}

const imageStyles = "min-w-10 rounded-full shadow-md"
export const confettiImages = [
  {
    label: "Gold",
    image: (
      <Image src={Gold} alt="gold-confetti" className={`${imageStyles}`} />
    ),
  },
  {
    label: "White",
    image: (
      <Image src={White} alt="white-confetti" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Red",
    image: <Image src={Red} alt="red-confetti" className={`${imageStyles}`} />,
  },
  {
    label: "Orange",
    image: (
      <Image src={Orange} alt="orange-confetti" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Lime",
    image: (
      <Image src={Lime} alt="lime-confetti" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Green",
    image: (
      <Image src={Green} alt="green-confetti" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Blue",
    image: (
      <Image src={Blue} alt="blue-confetti" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Dark Blue",
    image: (
      <Image
        src={DarkBlue}
        alt="baby-pink-confetti"
        className={`${imageStyles}`}
      />
    ),
  },
  {
    label: "Purple",
    image: (
      <Image src={Purple} alt="purple-confetti" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Pink",
    image: (
      <Image src={Pink} alt="pink-confetti" className={`${imageStyles}`} />
    ),
  },
]
