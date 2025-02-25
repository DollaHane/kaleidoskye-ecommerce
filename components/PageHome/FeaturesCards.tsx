import React from "react"
import Image from "next/image"

import GraphicOne from "@/components/Assets/GraphicOne.png"

import { GlowingEffect } from "../ui/glowing-effect"
import FeatureCardsIcons from "./FeatureCardsIcons"

interface FeaturesCardProps {
  features: {
    id: string
    heading: string
    description: string
    icon: any
  }
}

export default function FeaturesCard({ features }: FeaturesCardProps) {
  return (
    <div className="w-full relative max-w-80 p-5 shadow-md rounded-2xl">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="flex justify-between w-full">
        <FeatureCardsIcons icon={features.icon} />
        <h3
          id={features.id}
          className="w-full text-sm sm:text-base text-right font-semibold"
        >
          {features.heading}
        </h3>
      </div>
      <hr className="w-full my-2" />
      <p className="text-xs sm:text-sm">{features.description}</p>
      <Image
        src={GraphicOne}
        alt="eco-friendly"
        className="w-6 absolute bottom-2 right-2"
      />
    </div>
  )
}
