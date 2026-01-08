"use client"

import { useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { CatalogSearch } from "@/components/catalog-search"
import { Product } from "@/src/types/product"

interface Props {
  products: Product[]
}

export default function MonturasClient({ products }: Props) {
  const searchParams = useSearchParams()

  const tipo = searchParams.get("tipo")
  const valor = searchParams.get("valor")
  const q = searchParams.get("q")

  let filtrados = [...products]

  // 🔹 Filtro por marca
  if (tipo === "marca" && valor) {
    filtrados = filtrados.filter(
      (p) =>
        p.category === valor ||
        p.name.toLowerCase().includes(valor.toLowerCase())
    )
  }

  // 🔹 Búsqueda libre
  if (q) {
    const query = q.toLowerCase()
    filtrados = filtrados.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    )
  }

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">Catálogo de Monturas</h1>

      <CatalogSearch />

      {filtrados.length === 0 ? (
        <p className="text-muted-foreground">
          No se encontraron monturas.
        </p>
      ) : (
        <ProductGrid products={filtrados} />
      )}
    </div>
  )
}
