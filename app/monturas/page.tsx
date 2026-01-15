import { getMonturas } from "@/src/services/monturas"
import { monturaToProduct } from "@/src/adapters/montura-to-product"
import MonturasClient from "./monturas-client"

export default async function MonturasPage() {
  const monturas = await getMonturas()

  const products = monturas
    .filter((m) => m.activo)
    .filter((m) => m.imagen_url || m.precio) // 🔹 Ocultar productos sin foto Y sin precio
    .map(monturaToProduct)

  return <MonturasClient products={products} />
}
