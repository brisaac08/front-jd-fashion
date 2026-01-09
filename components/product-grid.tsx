"use client"

import { Product } from "@/src/types/product"
import { ProductCard } from "@/components/product-card"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-10">
      <div className="container px-4 md:px-6">
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No hay monturas disponibles
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
