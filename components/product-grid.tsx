"use client"

import { Product } from "@/src/types/product"
import { ProductCard } from "@/components/product-card"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: readonly ProductGridProps) {
  return (
    <section className="w-full py-8 sm:py-10 md:py-12 bg-background">
      <div className="px-4 sm:px-6 md:px-8 mx-auto w-full">
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No hay monturas disponibles
          </p>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
