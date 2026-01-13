import { Montura } from "@/src/types/montura"
import { Product } from "@/src/types/product"

export function monturaToProduct(m: Montura): Product {
  return {
    id: m.id,
    nombre: m.nombre,
    marca: m.marca,
    precio: m.precio,

    // normalizamos null → undefined
    descripcion: m.descripcion ?? undefined,
    imagen_url: m.imagen_url ?? undefined,

    // estos campos existen en Product pero no en Montura
    color: undefined,
    material: undefined,
    genero: undefined,
    estilo: undefined,
    tipo: undefined,
    forma: undefined,
  }
}
