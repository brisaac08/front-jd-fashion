import { Montura } from "@/src/types/montura"
import { Product } from "@/src/types/product"

export function monturaToProduct(m: Montura): Product {
  return {
    id: m.id,
    name: m.nombre,
    description: m.descripcion ?? "Sin descripción",
    price: m.precio ?? 0,
    image: m.imagen_url ?? "/placeholder.svg",
    category: m.marca ?? "General",
  }
}
