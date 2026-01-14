"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { categories } from "@/lib/categories"

export function CategoriesMenu() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

              {categories.principales.items.map((item) => (
                <Link
                  key={item}
                  href="/monturas"
                  onClick={() => setOpen(false)}
                  className="block py-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* 🔹 GRUPOS */}
            {categories.grupos.map((group) => (
              <div key={group.key}>
                <h4 className="mb-3 font-semibold text-sm sm:text-base">
                  {group.title}
                </h4>

                {group.items.map((item) => (
                  <Link
                    key={item}
                    href={`/monturas?tipo=${group.key}&valor=${encodeURIComponent(item)}`}
                    onClick={() => setOpen(false)}
                    className="block py-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  )
}
