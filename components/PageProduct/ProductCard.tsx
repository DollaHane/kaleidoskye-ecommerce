import React from "react"
import Image from "next/image"

import ProductImage from "@/components/Assets/Product.png"
import { Cannon } from "@/lib/product-attributes"
import AddToCartModal from "./AddToCartModal"

interface ProductCardProps {
  product: Cannon
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative">
      <div className="transition duration-150 hover:scale-[0.98]">
        <div className="relative w-56 max-h-96 rounded-lg overflow-hidden shadow-md">
          <Image
            src={ProductImage}
            alt="product"
            className="size-full object-cover"
          />
        </div>
        <div className="w-full flex items-center justify-between mt-5">
          <h2 className="font-bold">{product.heading}</h2>
          <p className="text-blue-500 font-bold"><span className="text-xs">from </span>R {product.priceAd}</p>
        </div>
        <div className="flex flex-col w-full text-left items-center justify-end">
          <p className="flex flex-row w-full text-sm text-muted-foreground justify-between">
            <span>Stock:</span>
            <span>Available</span>
          </p>
          <p className="flex flex-row w-full text-sm text-muted-foreground justify-between">
            <span>Delivery:</span>
            <span>3-5 days delivery</span>
          </p>
        </div>
      </div>
      <AddToCartModal product={product}/>
    </div>
  )
}
