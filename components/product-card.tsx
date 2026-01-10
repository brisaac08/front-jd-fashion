"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MessageCircle } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { getProductWhatsappLink } from "@/lib/whatsapp"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: readonly ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Añadido al carrito",
      description: `${product.name} se agregó a tu pedido`,
    })
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-lg h-full">
      <Link href={`/monturas/${product.id}`}>
        <CardHeader className="p-0 cursor-pointer">
          <div className="relative w-full aspect-square overflow-hidden bg-white flex items-center justify-center">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            <Badge className="absolute right-3 top-3 bg-white text-muted-foreground">{product.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 flex-1 flex flex-col gap-2 cursor-pointer">
          <h3 className="font-semibold text-base leading-tight tracking-tight">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <p className="text-xl sm:text-2xl font-bold text-primary mt-auto">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-3 sm:p-4 pt-0 flex flex-col gap-2">
        <Button className="w-full gap-2" onClick={handleAddToCart}>
          <Plus className="h-4 w-4" />
          Añadir al Carrito
        </Button>
        <a
          href={getProductWhatsappLink({
            productName: product.name,
            price: product.price,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <Button variant="outline" className="w-full gap-2 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700">
            <MessageCircle className="h-4 w-4" />
            Consultar por WhatsApp
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}
