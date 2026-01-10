"use server"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getMonturas } from "@/src/services/monturas"
import { Montura } from "@/src/types/montura"
import { monturaToProduct } from "@/src/adapters/montura-to-product"
import { MonturasDetailActions } from "@/components/montura-detail-actions"

export default async function MonturasDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  let montura: Montura | null = null
  let error: string | null = null

  try {
    const monturas = await getMonturas()
    montura = monturas.find((m) => m.id === id) || null

    if (!montura) {
      error = "Producto no encontrado"
    }
  } catch (err) {
    error = "Error al cargar el producto"
    console.error(err)
  }

  if (error || !montura) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold text-destructive mb-2">{error || "Producto no encontrado"}</p>
          <a href="/monturas" className="cursor-pointer">
            <Button variant="outline">Volver al catálogo</Button>
          </a>
        </div>
      </main>
    )
  }

  const product = monturaToProduct(montura)

  return (
    <main className="flex flex-col min-h-screen w-full bg-white">
      {/* Header con volver */}
      <div className="px-4 sm:px-6 md:px-8 py-3">
        <div className="max-w-7xl mx-auto">
          <a href="/monturas" className="inline-block cursor-pointer">
            <Button variant="ghost" size="sm">
              ← Volver
            </Button>
          </a>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Grid: Imagen + Información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Columna Izquierda: Imagen */}
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden shadow-sm flex items-center justify-center border border-gray-100">
                <Image
                  src={montura.imagen_url || "/placeholder.svg"}
                  alt={montura.nombre}
                  fill
                  className="object-contain object-center p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Columna Derecha: Información */}
            <div className="flex flex-col justify-start gap-6">
              {/* Marca */}
              {montura.marca && (
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Marca
                  </p>
                  <p className="text-lg text-gray-700 mt-1">{montura.marca}</p>
                </div>
              )}

              {/* Nombre */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  {montura.nombre}
                </h1>
              </div>

              {/* Precio */}
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-5xl font-bold text-primary">
                  ${montura.precio?.toFixed(2) || "0.00"}
                </span>
              </div>

              {/* Stock Info */}
              {montura.stock !== null && (
                <div className="py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-muted-foreground">
                    Disponibles: <span className="font-semibold text-gray-900">{montura.stock}</span>
                  </p>
                </div>
              )}

              {/* Descripción */}
              {montura.descripcion && (
                <div className="pt-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h2>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {montura.descripcion}
                  </p>
                </div>
              )}

              {/* Acciones */}
              <MonturasDetailActions product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
