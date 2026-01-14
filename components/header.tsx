"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Info, User, Heart, ShoppingCart, Menu, X, Grid } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useFavorites } from "@/components/favorites-provider"
import { categories } from "@/lib/categories"

export function Header() {
  const { items } = useCart()
  const { favorites } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 mx-auto w-full max-w-full">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/logo.jpg"
              alt="Óptica JD Fashion"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* SEARCH BAR - Center */}
          <div className="hidden md:flex flex-1 mx-8 max-w-sm">
            <input
              type="text"
              placeholder="Buscar monturas..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* ICONS - Right */}
          <div className="flex items-center gap-4">
            {/* Info */}
            <Link href="/about" title="Sobre nosotros">
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
            </Link>

            {/* User/Login */}
            <Link href="/login" title="Mi cuenta">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Favorites */}
            <Link href="/favoritos" className="relative" title="Mis favoritos">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Shopping Cart */}
            <Link href="/carrito" className="relative" title="Carrito">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Catálogo */}
            <Link href="/monturas" title="Catálogo">
              <Button variant="ghost" size="icon">
                <Grid className="h-5 w-5" />
              </Button>
            </Link>

            {/* Menu Hamburguesa - Solo Categorías */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

        </div>
      </header>

      {/* CATEGORÍAS DROPDOWN */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-white border-b shadow-lg">
          <div className="px-4 sm:px-6 md:px-8 py-6">
            <div className="max-w-7xl mx-auto grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {/* EXPLORAR */}
              <div>
                <h4 className="mb-3 font-semibold text-sm sm:text-base">
                  {categories.principales.title}
                </h4>
                {categories.principales.items.map((item) => (
                  <Link
                    key={item}
                    href="/monturas"
                    onClick={() => setMenuOpen(false)}
                    className="block py-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* GRUPOS */}
              {categories.grupos.map((group) => (
                <div key={group.key}>
                  <h4 className="mb-3 font-semibold text-sm sm:text-base">
                    {group.title}
                  </h4>
                  {group.items.map((item) => (
                    <Link
                      key={item}
                      href={`/monturas?tipo=${group.key}&valor=${encodeURIComponent(item)}`}
                      onClick={() => setMenuOpen(false)}
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
    </>
  )
}
