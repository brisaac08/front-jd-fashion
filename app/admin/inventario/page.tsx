import { getMonturas } from "@/src/services/monturas"
import { monturaToProduct } from "@/src/adapters/montura-to-product"
import { ProductGrid } from "@/components/product-grid"

export default async function InventarioPage() {
  const monturas = await getMonturas()
  const products = monturas.map(monturaToProduct)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Inventario de Monturas
      </h1>

      <ProductGrid products={products} />
    </div>
  )
}
