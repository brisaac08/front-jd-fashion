"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { categories } from "@/lib/categories"

export function CategoriesMenu() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="relative group">
      <button 
        className="flex items-center gap-1 font-medium hover:text-primary transition-colors text-sm sm:text-base py-2"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        Categorías
        <ChevronDown className="h-4 w-4 transition-transform duration-200" style={{transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}} />
      </button>

      {/* DROPDOWN - Posicionado respecto al nav, se coloca debajo del header */}
      {open && (
        <div 
          className="fixed left-0 right-0 top-16 z-50 border-t bg-background shadow-lg"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          style={{ 
            top: '64px',
            width: '100vw',
            left: 0
          }}
        >
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 mx-auto w-full">
            <div className="max-w-7xl mx-auto grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">

              {/* 🔹 EXPLORAR (por ahora solo navega) */}
              <div>
                <h4 className="mb-2 sm:mb-3 font-semibold text-sm sm:text-base">
                  {categories.principales.title}
                </h4>

                {categories.principales.items.map((item) => (
                  <Link
                    key={item}
                    href="/monturas"
                    className="block py-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* 🔹 GRUPOS */}
              {categories.grupos.map((group) => (
                <div key={group.key}>
                  <h4 className="mb-2 sm:mb-3 font-semibold text-sm sm:text-base">
                    {group.title}
                  </h4>

                  {group.items.map((item) => (
                    <Link
                      key={item}
                      href={`/monturas?tipo=${group.key}&valor=${encodeURIComponent(item)}`}
                      className="block py-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              ))}

            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
