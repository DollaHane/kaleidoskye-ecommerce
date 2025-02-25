import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { features } from "@/lib/product-features"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import Hero from "@/components/Assets/Kaleidoskye Hero.png"
import HeroTwo from "@/components/Assets/Kaleidoskye Hero_Two.png"
import FeaturesCard from "@/components/PageHome/FeaturesCards"

export default async function AssetsPage() {

  return (
    <section className="relative items-center bg-background w-full min-h-screen py-5 md:py-10 overflow-hidden">
      <Image
        src={HeroTwo}
        alt="customised-powder-and-confetti-cannon-poppers"
        className="absolute -top-16 sm:-top-20 md:-top-28 left-0 w-screen mt-10"
      />
      <Image
        src={Hero}
        alt="customised-powder-and-confetti-cannon-poppers"
        className="mx-auto w-11/12 md:w-2/3 mt-10"
      />
      <p className="flex text-center py-10 w-11/12 md:w-8/12 mx-auto">
        Fully customisable powder and confetti cannon poppers for all
        celebratory occasions, delivered straight to your door. Environmentally
        friendly and vibrant in colour, sure to get your party going with a
        bang!
      </p>
      <div className="w-full flex items-center justify-center mt-5 mb-20">
        <Link href={siteConfig.links.store}>
          <InteractiveHoverButton text="Shop Now" />
        </Link>
      </div>
      <div className="flex flex-wrap justify-center mt-10 gap-5">
        {features.map((feature) => (
          <FeaturesCard key={feature.id} features={feature} />
        ))}
      </div>
    </section>
  )
}
