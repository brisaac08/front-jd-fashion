"use client"

import { useRef } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

const discountProducts = [
  {
    id: "discount-1",
    name: "Montura Aviador Premium",
    description: "Clásica y atemporal",
    price: 89.99,
    originalPrice: 129.99,
    discount: "30%",
    image: "/aviator-sunglasses-gold.jpg",
    category: "Aviador",
  },
  {
    id: "discount-2",
    name: "Montura Cat Eye Luxury",
    description: "Elegancia vintage",
    price: 79.99,
    originalPrice: 119.99,
    discount: "35%",
    image: "/cat-eye-glasses-blue.jpg",
    category: "Cat Eye",
  },
  {
    id: "discount-3",
    name: "Montura Round Chic",
    description: "Estilo intelectual",
    price: 69.99,
    originalPrice: 99.99,
    discount: "30%",
    image: "/round-glasses-gold.jpg",
    category: "Redondas",
  },
  {
    id: "discount-4",
    name: "Montura Square Bold",
    description: "Personalidad fuerte",
    price: 74.99,
    originalPrice: 109.99,
    discount: "32%",
    image: "/square-glasses-blue.jpg",
    category: "Cuadradas",
  },
]

export function StoriesFeed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof discountProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Añadido al carrito",
      description: `${product.name} se agregó a tu pedido`,
    })
  }

  return (
    <section className="w-full bg-gradient-to-b from-secondary/20 to-background py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-balance">Ofertas Especiales</h2>
          <p className="mt-2 text-muted-foreground">Descuentos exclusivos en monturas seleccionadas</p>
        </div>

        <div ref={containerRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {discountProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center">
              <div className="relative h-[600px] rounded-xl overflow-hidden bg-card border border-border shadow-lg group">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <Badge className="absolute right-4 top-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
                  -{product.discount}
                </Badge>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Badge className="mb-3 bg-accent text-accent-foreground">{product.category}</Badge>
                  <h3 className="text-2xl font-bold mb-2 text-balance">{product.name}</h3>
                  <p className="text-white/90 mb-4 text-pretty">{product.description}</p>

                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-3xl font-bold text-accent">${product.price.toFixed(2)}</span>
                    <span className="text-lg text-white/60 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                    onClick={() => handleAddToCart(product)}
                  >
                    <Plus className="h-5 w-5" />
                    Añadir al Carrito
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
