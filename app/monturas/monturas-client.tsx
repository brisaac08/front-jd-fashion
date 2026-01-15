"use client"

import { useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { Product } from "@/src/types/product"

interface Props {
  readonly products: readonly Product[]
}

export default function MonturasClient({ products }: Props) {
  const searchParams = useSearchParams()

  const tipo = searchParams.get("tipo")
  const valor = searchParams.get("valor")
  const buscar = searchParams.get("buscar")

  let filtrados = [...products]

  // 🔹 Filtro de búsqueda por marca y nombre
  if (buscar) {
    const searchLower = buscar.toLowerCase()
    filtrados = filtrados.filter(
      (p) =>
        p.nombre?.toLowerCase().includes(searchLower) ||
        p.marca?.toLowerCase().includes(searchLower)
    )
  }

  // 🔹 Filtro SOLO por marca
  if (tipo === "marca" && valor) {
    filtrados = filtrados.filter(
      (p) => p.marca?.toLowerCase() === valor.toLowerCase()
    )
  }

  // 🔹 Título dinámico
  let titulo = "Catálogo de Monturas"
  if (buscar) {
    titulo = `Resultados de búsqueda: "${buscar}"`
  } else if (tipo === "marca" && valor) {
    titulo = valor
  }

  return (
    <main className="flex flex-col min-h-[calc(100vh-4rem)] w-full">
      <div className="w-full py-8 sm:py-10 md:py-12 bg-linear-to-b from-muted/30 to-background">
        <div className="px-4 sm:px-6 md:px-8 mx-auto w-full">
          <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{titulo}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Selecciona tu montura favorita y completa tu pedido
            </p>
          </div>
        </div>
      </div>

      <ProductGrid products={filtrados} />
    </main>
  )
}
