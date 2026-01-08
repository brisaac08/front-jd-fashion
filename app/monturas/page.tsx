import { getMonturas } from "@/src/services/monturas"
import { monturaToProduct } from "@/src/adapters/montura-to-product"
import MonturasClient from "./monturas-client"

export default async function MonturasPage() {
  const monturas = await getMonturas()

  const products = monturas
    .filter((m) => m.activo)
    .map(monturaToProduct)

  return <MonturasClient products={products} />
}
