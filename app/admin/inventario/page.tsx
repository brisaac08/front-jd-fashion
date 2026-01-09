import { ProductsTable } from "@/components/admin/products-table"
import { getAdminMonturas } from "@/src/services/admin-monturas"
import { AdminProduct } from "@/src/types/admin-product"

export default async function InventarioPage() {
  const products: AdminProduct[] = await getAdminMonturas()

  return <ProductsTable products={products} />
}
