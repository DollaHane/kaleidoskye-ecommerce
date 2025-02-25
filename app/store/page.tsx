import React from "react"

import ProductCard from "@/components/PageProduct/ProductCard"
import { Cannon, products } from "@/lib/product-attributes"

export default function StorePage() {
  
  return (
    <section className="container bg-background items-center min-h-screen">
      <div className="w-11/12 md:w-8/12 h-full mx-auto">
        <h1 className="py-5 w-full text-left text-3xl font-semibold">
          All products
        </h1>
        <hr className="w-full mb-5" />
        <div className="flex flex-col sm:flex-row gap-10 items-center justify-center">
          {products.map((prod: Cannon) => (
            <ProductCard product={prod} />
          ))}
        </div>
        <div>
          <p></p>
        </div>
      </div>
    </section>
  )
}
