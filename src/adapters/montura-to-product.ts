import { Montura } from "@/src/types/montura"
import { Product } from "@/src/types/product"

export interface CartProduct extends Product {
  // Propiedades para el carrito
  name: string
  price: number
  image: string
}

export function monturaToProduct(m: Montura): CartProduct {
  return {
    // Propiedades del Product original
    id: m.id,
    nombre: m.nombre,
    marca: m.marca,
    precio: m.precio,
    imagen_url: m.imagen_url || "/placeholder.svg",
    descripcion: m.descripcion ?? undefined,
    color: m.color ?? undefined,
    material: m.material ?? undefined,
    genero: m.genero ?? undefined,
    estilo: m.estilo ?? undefined,
    tipo: m.tipo ?? undefined,
    forma: m.forma ?? undefined,
    
    // Propiedades para el carrito
    name: m.nombre,
    price: m.precio,
    image: m.imagen_url || "/placeholder.svg",
  }
}
