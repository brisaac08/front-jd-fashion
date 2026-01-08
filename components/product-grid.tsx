"use client"

import { ProductCard } from "@/components/product-card"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Nuestra Colección
          </h2>
          <p className="mt-4 text-muted-foreground">
            Selecciona tu montura favorita y completa tu pedido
          </p>
        </div>

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
