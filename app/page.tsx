import { StoriesFeed } from "@/components/stories-feed"
import { ProductGrid } from "@/components/product-grid"
import { monturaToProduct } from "@/src/adapters/montura-to-product"
import { getMonturas } from "@/src/services/monturas"

export default async function Home() {
  const monturas = await getMonturas()

  const products = monturas
    .filter((m) => m.activo)
    .slice(0, 10)
    .map(monturaToProduct)

  return (
    <main className="flex flex-col min-h-[calc(100vh-4rem)]">
      <StoriesFeed />
      <ProductGrid products={products} />
    </main>
  )
}
