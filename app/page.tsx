import { Header } from "@/components/header"
import { StoriesFeed } from "@/components/stories-feed"
import { ProductGrid } from "@/components/product-grid"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StoriesFeed />
      <ProductGrid />
    </div>
  )
}
