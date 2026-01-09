"use client"

import Link from "next/link"
import { ShoppingCart, Glasses } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { CategoriesMenu } from "@/components/categories-menu"

export function Header() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 mx-auto w-full max-w-full" style={{ height: '64px' }}>

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Glasses className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">
            Óptica JD Fashion
          </span>
        </Link>

        {/* MENÚ */}
        <div className="flex items-center gap-6">
          <Link href="/monturas" className="font-medium hover:text-primary">
            Catálogo
          </Link>

          <CategoriesMenu />

          <Link href="/about" className="font-medium hover:text-primary">
            Sobre nosotros
          </Link>
        </div>

        {/* CARRITO */}
        <Link href="/carrito">
          <Button variant="outline" size="icon" className="relative">
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
