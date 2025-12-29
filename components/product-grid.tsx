"use client"

import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: "1",
    name: "Classic Gold",
    description: "Montura clásica con acabado dorado elegante",
    price: 149.99,
    image: "/elegant-gold-eyeglasses-frame-on-white-background.jpg",
    category: "Clásico",
  },
  {
    id: "2",
    name: "Azure Blue",
    description: "Diseño moderno en azul profundo",
    price: 179.99,
    image: "/modern-blue-eyeglasses-frame-on-white-background.jpg",
    category: "Moderno",
  },
  {
    id: "3",
    name: "Pearl White",
    description: "Minimalista y sofisticada en blanco perlado",
    price: 159.99,
    image: "/minimalist-white-eyeglasses-frame-on-white-backgro.jpg",
    category: "Minimalista",
  },
  {
    id: "4",
    name: "Sunset Gold",
    description: "Aviador con detalles dorados premium",
    price: 199.99,
    image: "/aviator-gold-eyeglasses-frame-on-white-background.jpg",
    category: "Aviador",
  },
  {
    id: "5",
    name: "Ocean Blue",
    description: "Montura deportiva azul océano",
    price: 169.99,
    image: "/sporty-ocean-blue-eyeglasses-frame-on-white-backgr.jpg",
    category: "Deportivo",
  },
  {
    id: "6",
    name: "Ivory Elegance",
    description: "Diseño vintage en tono marfil",
    price: 189.99,
    image: "/vintage-ivory-eyeglasses-frame-on-white-background.jpg",
    category: "Vintage",
  },
  {
    id: "7",
    name: "Royal Blue",
    description: "Montura rectangular azul real",
    price: 174.99,
    image: "/rectangular-royal-blue-eyeglasses-frame-on-white-b.jpg",
    category: "Formal",
  },
  {
    id: "8",
    name: "Champagne Gold",
    description: "Cat-eye con acabado champagne",
    price: 194.99,
    image: "/cat-eye-champagne-gold-eyeglasses-frame-on-white-b.jpg",
    category: "Cat-Eye",
  },
]

export function ProductGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nuestra Colección</h2>
          <p className="mt-4 text-muted-foreground text-pretty">Selecciona tu montura favorita y completa tu pedido</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
