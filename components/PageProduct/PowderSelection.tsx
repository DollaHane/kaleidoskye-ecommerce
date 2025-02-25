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
    <div className="relative flex flex-col items-center justify-center mb-5 pt-5">
      <div className="relative w-full max-w-[700px] flex flex-col items-center justify-center">
        <div className="h-40 w-12 md:w-16 absolute top-0 left-0  bg-gradient-to-r from-background to-background/0 z-40" />
        <div className="h-40 w-12 md:w-16 absolute top-0 right-0  bg-gradient-to-l from-background to-background/0 z-40" />
        <p className="w-full font-semibold z-40">
          Powder selection{" "}
          <span className="text-xs text-muted-foreground italic">(max 2)</span>:
        </p>
        <div className="relative w-full  h-28 flex items-start justify-start overflow-x-scroll overflow-y-clip mb-5">
          <Dock className="absolute min-w-[780px] left-0 bottom-0 items-end pb-3 pl-20 ">
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
                      <div className="absolute flex size-6 top-0 right-0 items-center justify-center bg-accent rounded-full shadow-md">
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
        <div className="w-full flex flex-row items-center justify-start gap-3 z-40">
          <Checkbox
            disabled={noConfettiNeeded}
            checked={noPowderNeeded}
            onCheckedChange={() => setNoPowderNeeded(!noPowderNeeded)}
          />
          <p className="text-muted-foreground text-sm italic">
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
