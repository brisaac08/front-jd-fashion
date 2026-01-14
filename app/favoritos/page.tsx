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
    <main className="flex flex-col min-h-[calc(100vh-4rem)] w-full">
      {/* Header con volver */}
      <div className="px-4 sm:px-6 md:px-8 py-3">
        <div className="max-w-7xl mx-auto">
          <Link href="/monturas" className="inline-block cursor-pointer">
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Volver al Catálogo
            </span>
          </Link>
        </div>
      </div>

      {/* Título */}
      <div className="px-4 sm:px-6 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Mis Favoritos
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {products.length} producto{products.length === 1 ? "" : "s"} en tu lista de deseos
            </p>
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="flex-1 px-4 sm:px-6 md:px-8 py-8 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  )
}
