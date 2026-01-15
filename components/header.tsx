"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Info, User, Heart, ShoppingCart, Menu, X, Grid, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useFavorites } from "@/components/favorites-provider"
import { categories } from "@/lib/categories"
import { compareNormalized } from "@/lib/normalize-filter"
import { Product } from "@/src/types/product"

export function Header() {
  const { items } = useCart()
  const { favorites } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const pathname = usePathname()
  const router = useRouter()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  // Hide header icons if in admin
  const isAdmin = pathname?.startsWith("/admin")

  // 🔹 Cargar productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/admin/monturas")
        if (!res.ok) return
        const monturas = await res.json()
        const filtered = monturas
          .filter((m: any) => m.activo)
          .filter((m: any) => m.imagen_url || m.precio)
          .map((m: any) => ({
            id: m.id,
            nombre: m.nombre,
            marca: m.marca,
            precio: m.precio,
            imagen_url: m.imagen_url || "/placeholder.svg",
            descripcion: m.descripcion,
            color: m.color,
            material: m.material,
            genero: m.genero,
            estilo: m.estilo,
            tipo: m.tipo,
            forma: m.forma,
          }))
        setProducts(filtered)
      } catch (err) {
        console.error("Error loading products:", err)
      }
    }

    loadProducts()
  }, [])

  // 🔹 Función para verificar si un filtro tiene productos disponibles
  const hasProducts = (filterType: string, filterValue: string): boolean => {
    if (!products || products.length === 0) return true

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

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/monturas?buscar=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setSearchOpen(false)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full border-b bg-white">
        <div className="flex h-20 items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 mx-auto w-full">

          {/* LOGO - Tamaño natural */}
          <Link href="/" className="shrink-0 flex items-center cursor-pointer">
            <Image
              src="/logo.png"
              alt="Óptica JD Fashion"
              width={180}
              height={80}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* SEARCH BAR - Desktop */}
          {!isAdmin && (
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-4 lg:mx-8 max-w-md">
              <div className="w-full flex">
                <input
                  type="text"
                  placeholder="Buscar por marca, nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-lg text-sm hover:bg-secondary/80 transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* ICONS - Right */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 shrink-0">
            {!isAdmin && (
              <>
                {/* Search Mobile Icon */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="md:hidden h-9 w-9"
                  title="Buscar"
                >
                  {searchOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </Button>

                {/* Info */}
                <Link href="/about" title="Sobre nosotros" className="hidden sm:block">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Info className="h-5 w-5" />
                  </Button>
                </Link>

                {/* User/Login */}
                <Link href="/login" title="Mi cuenta" className="hidden sm:block">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Favorites */}
                <Link href="/favoritos" className="relative" title="Mis favoritos">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Heart className="h-5 w-5" />
                    {favorites.length > 0 && (
                      <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                        {favorites.length}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* Shopping Cart */}
                <Link href="/carrito" className="relative" title="Carrito">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                      <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                        {itemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* Catálogo */}
                <Link href="/monturas" title="Catálogo" className="hidden sm:block">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Grid className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}

            {/* Menu Hamburguesa */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              className="h-9 w-9"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

        </div>

        {/* SEARCH BAR - Mobile */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="md:hidden border-t bg-white">
            <div className="flex p-3 sm:p-4">
              <input
                type="text"
                placeholder="Buscar por marca, nombre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-lg text-sm hover:bg-secondary/80 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </header>

      {/* CATEGORÍAS DROPDOWN */}
      {menuOpen && (
        <div className="fixed top-20 left-0 right-0 z-30 bg-white border-b shadow-lg">
          <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {/* EXPLORAR */}
              <div>
                <h4 className="mb-3 font-semibold text-sm sm:text-base">
                  {categories.principales.title}
                </h4>
                {categories.principales.items
                  .filter((item) => hasProducts("genero", item))
                  .map((item) => (
                    <Link
                      key={item}
                      href={`/monturas?tipo=genero&valor=${encodeURIComponent(item)}`}
                      onClick={() => setMenuOpen(false)}
                      className="block py-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
              </div>

              {/* GRUPOS */}
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
