"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const discountProducts = [
  {
    id: "promo-1",
    name: "Principal",
    image: "/Principal 16-9.png",
  },
  {
    id: "promo-2",
    name: "Longchamp",
    image: "/longchamp 16-9.png",
  },
  {
    id: "promo-3",
    name: "Michael Kors",
    image: "/michael kors 16-9.png",
  },
  {
    id: "promo-4",
    name: "Marca Exclusiva",
    image: "/marca exclusica JDFASHION 16-6.png",
  },
]

export function StoriesFeed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAutoplay, setIsAutoplay] = useState(true)

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

  // Autoplay
  useEffect(() => {
    if (!isAutoplay) return

    const interval = setInterval(() => {
      scrollRight()
    }, 8000) // Cada 8 segundos

    return () => clearInterval(interval)
  }, [isAutoplay])

  const handleUserInteraction = () => {
    setIsAutoplay(false)
    // Reanudar autoplay después de 10 segundos sin interacción
    const timeout = setTimeout(() => {
      setIsAutoplay(true)
    }, 10000)

    return () => clearTimeout(timeout)
  }


  return (
    <section className="w-full bg-linear-to-b from-secondary/20 to-background py-12 sm:py-16 md:py-20">
      <div className="px-4 sm:px-6 md:px-8 mx-auto w-full">
        <div className="relative group">
          {/* Botón izquierda */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              scrollLeft()
              handleUserInteraction()
            }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Carrusel horizontal */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-track]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-16"
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            {discountProducts.map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-[680px] transition-all duration-300"
              >
                <div className="relative w-full aspect-video bg-gradient-to-b from-secondary/20 to-background rounded-xl overflow-hidden transition-shadow">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-3"
                    priority={false}
                    sizes="680px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Botón derecha */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              scrollRight()
              handleUserInteraction()
            }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
