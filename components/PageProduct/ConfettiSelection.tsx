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
    <div className="relative flex flex-col items-center justify-center pt-5">
      <div className="relative flex w-full max-w-[700px] flex-col items-center justify-center">
        <div className="absolute left-0 top-0 z-40 h-40 w-12 bg-gradient-to-r from-background to-background/0 md:w-16" />
        <div className="absolute right-0 top-0 z-40 h-40 w-12 bg-gradient-to-l from-background to-background/0 md:w-16" />
        <p className="z-40 w-full font-semibold">
          Confetti selection{" "}
          <span className="text-xs italic text-muted-foreground">(max 3)</span>:
        </p>
        <div className="relative mb-5 flex h-28 w-full items-start justify-start overflow-y-clip overflow-x-scroll">
          <Dock className="absolute bottom-0 left-0 min-w-[680px] items-end pb-3 pl-20">
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
                      <div className="absolute right-0 top-0 flex size-6 items-center justify-center rounded-full bg-accent shadow-md">
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
        <div className="z-40 flex w-full flex-row items-center justify-start gap-3">
          <Checkbox
            disabled={noPowderNeeded}
            checked={noConfettiNeeded}
            onCheckedChange={() => setNoConfettiNeeded(!noConfettiNeeded)}
          />
          <p className="text-sm italic text-muted-foreground">
            I don&apos;t need confetti.
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
