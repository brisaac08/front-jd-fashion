"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Heart } from "lucide-react"
import { getProductWhatsappLink } from "@/lib/whatsapp"
import { formatPrice } from "@/lib/format-price"
import { useFavorites } from "@/components/favorites-provider"

interface Product {
  id: string
  nombre: string
  marca?: string
  precio: number
  descripcion?: string
  imagen_url?: string

  color?: string
  material?: string
  genero?: string
  estilo?: string
  tipo?: string
  forma?: string
}

export function ProductCard({ product }: { readonly product: Product }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isFav = isFavorite(product.id)

  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-lg h-full relative">
      {/* BOTÓN FAVORITO */}
      <button
        onClick={(e) => {
          e.preventDefault()
          toggleFavorite(product.id)
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all"
        title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isFav ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
        />
      </button>

      <Link href={`/monturas/${product.id}`}>
        <CardHeader className="p-0 cursor-pointer">
          <div className="relative w-full aspect-square bg-white">
            <Image
              src={product.imagen_url || "/placeholder.svg"}
              alt={product.nombre}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-base leading-tight">
            {product.nombre}
          </h3>

          {product.marca && (
            <p className="text-sm text-muted-foreground">{product.marca}</p>
          )}

          <div className="flex flex-wrap gap-1">
            {product.genero && <Badge variant="secondary">{product.genero}</Badge>}
            {product.forma && <Badge variant="outline">{product.forma}</Badge>}
            {product.color && <Badge variant="outline">{product.color}</Badge>}
          </div>

          <p className="text-lg font-bold text-stone-700">
            ${formatPrice(product.precio)}
          </p>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <a
          href={getProductWhatsappLink({
            productName: product.nombre,
            price: product.precio,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full gap-2 border-green-500 text-green-600 hover:bg-green-50"
          >
            <MessageCircle className="h-4 w-4" />
            Consultar por WhatsApp
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}
