"use client"

import { useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { Product } from "@/src/types/product"

interface Props {
  products: Product[]
}

export default function MonturasClient({ products }: Props) {
  const searchParams = useSearchParams()

  const tipo = searchParams.get("tipo")
  const valor = searchParams.get("valor")

  let filtrados = [...products]

  // 🔹 Filtro SOLO por marca
  if (tipo === "marca" && valor) {
    filtrados = filtrados.filter(
      (p) => p.category?.toLowerCase() === valor.toLowerCase()
    )
  }

  // 🔹 Título dinámico
  const titulo =
    tipo === "marca" && valor
      ? valor
      : "Catálogo de Monturas"

  return (
    <div className="container py-10 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{titulo}</h1>
        <p className="text-muted-foreground">
          Selecciona tu montura favorita y completa tu pedido
        </p>
      </header>

      <ProductGrid products={filtrados} />
    </div>
  )
}
