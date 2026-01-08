"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Glasses, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { categories } from "@/lib/categories"

export function Header() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Glasses className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">
            Óptica JD Fashion
          </span>
        </Link>

        {/* MENÚ CENTRAL */}
        <div className="flex items-center gap-6">

          {/* CATÁLOGO */}
          <Link
            href="/monturas"
            className="font-medium hover:text-primary transition-colors"
          >
            Catálogo
          </Link>

          {/* CATEGORÍAS */}
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

                  {/* PRINCIPALES */}
                  <div>
                    <h4 className="mb-3 font-semibold">
                      Explorar
                    </h4>
                    {categories.principales.map((item) => (
                      <Link
                        key={item}
                        href="/monturas"
                        className="block py-1 hover:text-primary"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>

                  {/* GRUPOS */}
                  {categories.grupos.map((group) => (
                    <div key={group.title}>
                      <h4 className="mb-3 font-semibold">
                        {group.title}
                      </h4>
                      {group.items.map((item) => (
                        <Link
                          key={item}
                          href="/monturas"
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

          {/* ABOUT */}
          <Link
            href="/about"
            className="font-medium hover:text-primary transition-colors"
          >
            Sobre nosotros
          </Link>
        </div>

        {/* CARRITO */}
        <Link href="/carrito">
          <Button
            variant="outline"
            size="icon"
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {itemCount}
              </Badge>
            )}
          </Button>
        </Link>

      </div>
    </header>
  )
}
