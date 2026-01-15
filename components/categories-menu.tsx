"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { categories } from "@/lib/categories"
import { Product } from "@/src/types/product"
import { compareNormalized } from "@/lib/normalize-filter"

interface Props {
  readonly products?: readonly Product[]
}

export function CategoriesMenu({ products = [] }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 🔹 Función para verificar si un filtro tiene productos disponibles
  const hasProducts = (filterType: string, filterValue: string): boolean => {
    if (!products || products.length === 0) return true // Mostrar todos si no hay productos
    
    return products.some((p) => {
      // Caso especial para "Sol"
      if (compareNormalized(filterValue, "Sol")) {
        return p.nombre?.includes(" - S") || p.nombre?.includes("-S")
      }

      // Caso especial para "Dama"
      if (compareNormalized(filterValue, "Dama")) {
        return p.genero && compareNormalized(p.genero, "Dama")
      }

      // Caso especial para "Caballero"
      if (compareNormalized(filterValue, "Caballero")) {
        return p.genero && compareNormalized(p.genero, "Caballero")
      }

      // Para otros filtros
      let fieldValue: string | undefined | null = null
      
      if (filterType === "marca") fieldValue = p.marca
      else if (filterType === "estilo") fieldValue = p.estilo
      else if (filterType === "material") fieldValue = p.material
      else if (filterType === "forma") fieldValue = p.forma
      else if (filterType === "genero") fieldValue = p.genero
      else if (filterType === "tipo") fieldValue = p.tipo

      return fieldValue ? compareNormalized(fieldValue, filterValue) : false
    })
  }

  // 🔹 Función para verificar si una categoría tiene al menos un item disponible
  const hasCategoryProducts = (items: string[], filterType: string): boolean => {
    if (!products || products.length === 0) return true
    return items.some((item) => hasProducts(filterType, item))
  }

  const handleNavigate = (url: string) => {
    setOpen(false)
    setTimeout(() => {
      globalThis.location.href = url
    }, 100)
  }

  // Cerrar al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    
    if (open) {
      document.addEventListener("keydown", handleKeyDown)
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    
    if (open) {
      document.addEventListener("click", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [open])

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="flex items-center gap-1 font-medium hover:text-primary transition-colors text-sm sm:text-base py-2"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Categorías
        <ChevronDown className="h-4 w-4 transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>

      {/* DROPDOWN - Posicionado bajo el botón */}
      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-max bg-background border border-border rounded-lg shadow-lg z-50 p-4 sm:p-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">

            {/* 🔹 EXPLORAR */}
            <div>
              <h4 className="mb-3 font-semibold text-sm sm:text-base">
                {categories.principales.title}
              </h4>

              {categories.principales.items
                .filter((item) => hasProducts("genero", item))
                .map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavigate(`/monturas?tipo=genero&valor=${encodeURIComponent(item)}`)}
                    className="block w-full text-left py-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </button>
                ))}
            </div>

            {/* 🔹 GRUPOS */}
            {categories.grupos
              .filter((group) => hasCategoryProducts(group.items, group.key))
              .map((group) => (
                <div key={group.key}>
                  <h4 className="mb-3 font-semibold text-sm sm:text-base">
                    {group.title}
                  </h4>

                  {group.items
                    .filter((item) => hasProducts(group.key, item))
                    .map((item) => (
                      <button
                        key={item}
                        onClick={() => handleNavigate(`/monturas?tipo=${group.key}&valor=${encodeURIComponent(item)}`)}
                        className="block w-full text-left py-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                </div>
              ))}

          </div>
        </div>
      )}
    </div>
  )
}
