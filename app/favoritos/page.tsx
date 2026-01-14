"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/components/favorites-provider"
import { ProductGrid } from "@/components/product-grid"
import { getMonturas } from "@/src/services/monturas"
import { monturaToProduct } from "@/src/adapters/montura-to-product"
import { Product } from "@/src/types/product"

export default function FavoritosPage() {
  const { favorites } = useFavorites()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const monturas = await getMonturas()
        const favProducts = monturas
          .filter((m) => favorites.includes(m.id))
          .map(monturaToProduct)
        setProducts(favProducts)
      } catch (error) {
        console.error("Error loading favorites:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [favorites])

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-muted-foreground">Cargando favoritos...</p>
      </main>
    )
  }

  if (products.length === 0) {
    return (
      <main className="flex flex-col min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-3xl font-bold">Mis Favoritos</h1>
          <p className="text-muted-foreground">
            Aún no has agregado monturas a tus favoritos
          </p>
          <Link href="/monturas">
            <Button className="bg-stone-700 hover:bg-stone-800">Ver Catálogo</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col min-h-[calc(100vh-4rem)] w-full bg-white">
      <div className="w-full py-8 sm:py-10 md:py-12 bg-linear-to-b from-muted/30 to-background">
        <div className="px-4 sm:px-6 md:px-8 mx-auto w-full">
          <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Mis Favoritos
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {products.length} producto{products.length === 1 ? "" : "s"} en tu lista de deseos
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <ProductGrid products={products} />
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 py-4 w-full border-t">
        <div className="max-w-7xl mx-auto">
          <Link href="/monturas">
            <Button variant="outline">Volver al Catálogo</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
