import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { features } from "@/lib/product-features"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import HeroTwo from "@/components/Assets/Kaleidoskye Hero_Two.png"
import Hero from "@/components/Assets/Kaleidoskye Hero.png"
import FeaturesCard from "@/components/PageHome/FeaturesCards"

export default async function AssetsPage() {
  return (
    <section className="relative min-h-screen w-full items-center overflow-hidden bg-background py-5 md:py-10">
      <Image
        src={HeroTwo}
        alt="customised-powder-and-confetti-cannon-poppers"
        className="absolute -top-16 left-0 mt-10 w-screen sm:-top-20 md:-top-28"
      />
      <Image
        src={Hero}
        alt="customised-powder-and-confetti-cannon-poppers"
        className="mx-auto mt-10 w-11/12 md:w-2/3"
      />
      <p className="mx-auto flex w-11/12 py-10 text-center md:w-8/12">
        Fully customisable powder and confetti cannon poppers for all
        celebratory occasions, delivered straight to your door. Environmentally
        friendly and vibrant in colour, sure to get your party going with a
        bang!
      </p>
      <div className="mb-20 mt-5 flex w-full items-center justify-center">
        <Link href={siteConfig.links.store}>
          <InteractiveHoverButton text="Shop Now" />
        </Link>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-5">
        {features.map((feature) => (
          <FeaturesCard key={feature.id} features={feature} />
        ))}
      </div>
    </section>
  )
}
