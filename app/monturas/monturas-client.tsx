"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { Product } from "@/src/types/product"
import { compareNormalized, normalizeSearch } from "@/lib/normalize-filter"

interface Props {
  readonly products: readonly Product[]
}

export default function MonturasClient({ products }: Props) {
  const searchParams = useSearchParams()
  const [filtrados, setFiltrados] = useState<Product[]>([...products])
  const [titulo, setTitulo] = useState("Catálogo de Monturas")

  const tipo = searchParams.get("tipo")
  const valor = searchParams.get("valor")
  const buscar = searchParams.get("buscar")

  useEffect(() => {
    let filtered = [...products]

  // 🔹 Filtro de búsqueda por marca y nombre (sin espacios)
  if (buscar) {
    const searchNormalized = normalizeSearch(buscar)
    filtered = filtered.filter((p) => {
      const nombreNormalized = normalizeSearch(p.nombre || "")
      const marcaNormalized = normalizeSearch(p.marca || "")
      return nombreNormalized.includes(searchNormalized) || marcaNormalized.includes(searchNormalized)
    })
  }

  // 🔹 Filtro por tipo (estilo, material, forma, genero, tipo)
  if (tipo && valor) {
    
    filtered = filtered.filter((p) => {
      // 🔹 Caso especial para "Sol" - buscar por patrón " - S" en el nombre
      if (compareNormalized(valor, "Sol")) {
        const esSol = p.nombre?.includes(" - S") || p.nombre?.includes("-S")
        return esSol
      }

      // 🔹 Caso especial para "Damas" - buscar en genero o fallback por nombre
      if (compareNormalized(valor, "Damas")) {
        const tieneGenero = p.genero && compareNormalized(p.genero, "Damas")
        return tieneGenero
      }

      // 🔹 Caso especial para "Caballeros" - buscar en genero o fallback por nombre
      if (compareNormalized(valor, "Caballeros")) {
        const tieneGenero = p.genero && compareNormalized(p.genero, "Caballeros")
        return tieneGenero
      }

      // 🔹 Para otros filtros (marca, estilo, material, forma, tipo, genero)
      const fieldValue =
        tipo === "marca"
          ? p.marca
          : tipo === "estilo"
            ? p.estilo
            : tipo === "material"
              ? p.material
              : tipo === "forma"
                ? p.forma
                : tipo === "genero"
                  ? p.genero
                  : tipo === "tipo"
                    ? p.tipo
                    : undefined

      if (!fieldValue) {
        return false
      }
      const matches = compareNormalized(fieldValue, valor)
      return matches
    })
    }

    setFiltrados(filtered)

    // 🔹 Título dinámico
    let newTitulo = "Catálogo de Monturas"
    if (buscar) {
      newTitulo = `Resultados de búsqueda: "${buscar}"`
    } else if (tipo && valor) {
      newTitulo = valor
    }

    setTitulo(newTitulo)
  }, [tipo, valor, buscar, products])

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
