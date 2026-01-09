"use client"

import { useRef } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
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

  const scrollRight = () => {
  if (!containerRef.current) return

  const { scrollLeft, scrollWidth, clientWidth } = containerRef.current

    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      // volver al inicio
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" })
    } else {
      containerRef.current.scrollBy({ left: 420, behavior: "smooth" })
    }
  }

  const scrollLeft = () => {
    if (!containerRef.current) return

    const { scrollLeft } = containerRef.current

    if (scrollLeft <= 0) {
      // ir al final
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      })
    } else {
      containerRef.current.scrollBy({ left: -420, behavior: "smooth" })
    }
  }


  return (
    <section className="w-full bg-linear-to-b from-secondary/20 to-background py-8 sm:py-10 md:py-12 overflow-hidden">
      <div className="px-4 sm:px-6 md:px-8 mx-auto w-full">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Ofertas Especiales
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Descuentos exclusivos en monturas seleccionadas
          </p>
        </div>

        <div className="relative group">
          {/* Botón izquierda */}
          <Button
            variant="secondary"
            size="icon"
            onClick={scrollLeft}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Carrusel */}
          <div
            ref={containerRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-track]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {discountProducts.map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-[calc(100vw-2rem)] sm:w-[calc(50vw-1rem)] md:w-[calc(33.333vw-1.25rem)] lg:w-96 snap-start"
              >
                <div className="relative aspect-3/4 sm:aspect-2/3 lg:aspect-auto lg:h-150 rounded-lg sm:rounded-xl overflow-hidden bg-card border border-border shadow-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority={false}
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                  <Badge className="absolute right-3 sm:right-4 top-3 sm:top-4 bg-destructive text-destructive-foreground text-sm sm:text-base px-2 sm:px-3 py-1">
                    -{product.discount}
                  </Badge>

                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white space-y-2 sm:space-y-3">
                    <Badge className="bg-accent text-accent-foreground text-xs sm:text-sm">
                      {product.category}
                    </Badge>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-2xl sm:text-3xl font-bold text-accent">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm sm:text-base text-white/60 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      className="w-full gap-2 mt-2 sm:mt-3"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Añadir al Carrito</span>
                      <span className="sm:hidden">Añadir</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón derecha */}
          <Button
            variant="secondary"
            size="icon"
            onClick={scrollRight}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
