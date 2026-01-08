import { getMonturas } from "@/src/services/monturas"
import { monturaToProduct } from "@/src/adapters/montura-to-product"
import { ProductGrid } from "@/components/product-grid"
import { CatalogSearch } from "@/components/catalog-search"

export default async function MonturasPage() {
  const monturas = await getMonturas()

  const products = monturas
    .filter((m) => m.activo)
    .map(monturaToProduct)

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold">Catálogo de Monturas</h1>

      {/* Buscador */}
      <CatalogSearch />

      {/* Listado */}
      <ProductGrid products={products} />
    </div>
  )
}
