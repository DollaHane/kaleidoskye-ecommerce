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
    <div className="relative w-full max-w-80 rounded-2xl p-5 shadow-md">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="flex w-full justify-between">
        <FeatureCardsIcons icon={features.icon} />
        <h3
          id={features.id}
          className="w-full text-right text-sm font-semibold sm:text-base"
        >
          {features.heading}
        </h3>
      </div>
      <hr className="my-2 w-full" />
      <p className="text-xs sm:text-sm">{features.description}</p>
      <Image
        src={GraphicOne}
        alt="eco-friendly"
        className="absolute bottom-2 right-2 w-6"
      />
    </div>
  )
}
