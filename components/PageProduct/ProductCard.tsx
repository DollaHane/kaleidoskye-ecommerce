import React from "react"
import Image from "next/image"

import { Cannon } from "@/lib/product-attributes"
import ProductImage from "@/components/Assets/Product.png"

import AddToCartModal from "./AddToCartModal"

interface ProductCardProps {
  product: Cannon
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative">
      <div className="transition duration-150 hover:scale-[0.98]">
        <div className="relative max-h-96 w-56 overflow-hidden rounded-lg shadow-md">
          <Image
            src={ProductImage}
            alt="product"
            className="size-full object-cover"
          />
        </div>
        <div className="mt-5 flex w-full items-center justify-between">
          <h2 className="font-bold">{product.heading}</h2>
          <p className="font-bold text-blue-500">
            <span className="text-xs">from </span>R {product.priceAd}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-end text-left">
          <p className="flex w-full flex-row justify-between text-sm text-muted-foreground">
            <span>Stock:</span>
            <span>Available</span>
          </p>
          <p className="flex w-full flex-row justify-between text-sm text-muted-foreground">
            <span>Delivery:</span>
            <span>3-5 days delivery</span>
          </p>
        </div>
      </div>
      <AddToCartModal product={product} />
    </div>
  )
}
