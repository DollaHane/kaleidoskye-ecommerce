import React from "react"

import { Cannon, products } from "@/lib/product-attributes"
import ProductCard from "@/components/PageProduct/ProductCard"

export default function StorePage() {
  return (
    <section className="container min-h-screen items-center bg-background">
      <div className="mx-auto h-full w-11/12 md:w-8/12">
        <h1 className="w-full py-5 text-left text-3xl font-semibold">
          All products
        </h1>
        <hr className="mb-5 w-full" />
        <div className="flex flex-col items-center justify-center gap-10 sm:flex-row">
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
