"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { categories } from "@/lib/categories"

export function CategoriesMenu() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 font-medium hover:text-primary">
        Categorías
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-screen -translate-x-1/2 border-t bg-background shadow-lg">
          <div className="mx-auto max-w-7xl px-8 py-6 grid grid-cols-6 gap-6">

            {/* 🔹 EXPLORAR (por ahora solo navega) */}
            <div>
              <h4 className="mb-3 font-semibold">
                {categories.principales.title}
              </h4>

              {categories.principales.items.map((item) => (
                <Link
                  key={item}
                  href="/monturas"
                  className="block py-1 hover:text-primary"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* 🔹 GRUPOS */}
            {categories.grupos.map((group) => (
              <div key={group.key}>
                <h4 className="mb-3 font-semibold">
                  {group.title}
                </h4>

                {group.items.map((item) => (
                  <Link
                    key={item}
                    href={`/monturas?tipo=${group.key}&valor=${encodeURIComponent(item)}`}
                    className="block py-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            ))}

          </div>
        </div>
      )}
    </nav>
  )
}
