import { StoriesFeed } from "@/components/stories-feed"
import { ProductGrid } from "@/components/product-grid"
import { monturaToProduct } from "@/src/adapters/montura-to-product"
import { getMonturas } from "@/src/services/monturas"

export default async function Home() {
  const monturas = await getMonturas()

  // Función para barajar array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const products = shuffleArray(
    monturas
      .filter((m) => m.activo)
      .filter((m) => m.imagen_url || m.precio)
  )
    .slice(0, 16)
    .map(monturaToProduct)

  return (
    <main className="flex flex-col min-h-[calc(100vh-4rem)]">
      <StoriesFeed />
      <ProductGrid products={products} />
    </main>
  )
}
