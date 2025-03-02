import React from "react"
import Image from "next/image"
import { useProductStore } from "@/store/product-store"
import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, ChevronRight } from "lucide-react"

import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock"
import BabyPink from "@/components/Assets/Colours/p-baby-pink.png"
import Blue from "@/components/Assets/Colours/p-blue.png"
import Green from "@/components/Assets/Colours/p-green.png"
import Lilac from "@/components/Assets/Colours/p-lilac.png"
import Mustard from "@/components/Assets/Colours/p-mustard.png"
import Orange from "@/components/Assets/Colours/p-orange.png"
import Pink from "@/components/Assets/Colours/p-pink.png"
import Purple from "@/components/Assets/Colours/p-purple.png"
import Red from "@/components/Assets/Colours/p-red.png"
import White from "@/components/Assets/Colours/p-white.png"
import Yellow from "@/components/Assets/Colours/p-yellow.png"

import { Checkbox } from "../ui/checkbox"
import { Divider } from "../ui/divider"

export default function PowderSelection() {
  const {
    powder,
    setPowder,
    noConfettiNeeded,
    noPowderNeeded,
    setNoPowderNeeded,
  } = useProductStore()

  return (
    <div className="relative mb-5 flex flex-col items-center justify-center pt-5">
      <div className="relative flex w-full max-w-[700px] flex-col items-center justify-center">
        <div className="absolute left-0 top-0 z-40 h-40 w-12 bg-gradient-to-r from-background to-background/0 md:w-16" />
        <div className="absolute right-0 top-0 z-40 h-40 w-12 bg-gradient-to-l from-background to-background/0 md:w-16" />
        <p className="z-40 w-full font-semibold">
          Powder selection{" "}
          <span className="text-xs italic text-muted-foreground">(max 2)</span>:
        </p>
        <div className="relative mb-5 flex h-28 w-full items-start justify-start overflow-y-clip overflow-x-scroll">
          <Dock className="absolute bottom-0 left-0 min-w-[780px] items-end pb-3 pl-20">
            {powderImages.map((pwd, idx) => (
              <DockItem key={idx} className="aspect-square rounded-full">
                <DockLabel>{pwd.label}</DockLabel>
                <DockIcon>
                  <div
                    // @ts-ignore
                    onClick={() => setPowder(pwd.label)}
                    className="relative flex"
                  >
                    {/* @ts-ignore */}
                    {powder && powder.includes(pwd.label) && (
                      <div className="absolute right-0 top-0 flex size-6 items-center justify-center rounded-full bg-accent shadow-md">
                        {/* @ts-ignore */}
                        {powder && powder.indexOf(pwd.label) + 1}
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
            disabled={noConfettiNeeded}
            checked={noPowderNeeded}
            onCheckedChange={() => setNoPowderNeeded(!noPowderNeeded)}
          />
          <p className="text-sm italic text-muted-foreground">
            I don&apos;t need powder.
          </p>
        </div>
      </div>
    </div>
  )
}

const imageStyles = "min-w-12"
export const powderImages = [
  {
    label: "White",
    image: (
      <Image src={White} alt="white-powder" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Red",
    image: <Image src={Red} alt="red-powder" className={`${imageStyles}`} />,
  },
  {
    label: "Orange",
    image: (
      <Image src={Orange} alt="orange-powder" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Mustard",
    image: (
      <Image src={Mustard} alt="mustard-powder" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Yellow",
    image: (
      <Image src={Yellow} alt="yellow-powder" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Green",
    image: (
      <Image src={Green} alt="green-powder" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Blue",
    image: <Image src={Blue} alt="blue-powder" className={`${imageStyles}`} />,
  },
  {
    label: "Lilac",
    image: (
      <Image src={Lilac} alt="lilac-powder" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Purple",
    image: (
      <Image src={Purple} alt="purple-powder" className={`${imageStyles}`} />
    ),
  },
  {
    label: "Pink",
    image: <Image src={Pink} alt="pink-powder" className={`${imageStyles}`} />,
  },
  {
    label: "Baby Pink",
    image: (
      <Image
        src={BabyPink}
        alt="baby-pink-powder"
        className={`${imageStyles}`}
      />
    ),
  },
]
