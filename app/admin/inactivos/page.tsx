import { InactivosTable } from "@/components/admin/inactivos-table"
import { getAdminMonturas } from "@/src/services/admin-monturas"
import { AdminProduct } from "@/src/types/admin-product"

export default async function InactivosPage() {
  const allProducts: AdminProduct[] = await getAdminMonturas()
  // Filter only inactive products
  const products = allProducts.filter((p) => !p.activo)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Monturas Inactivas</h1>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay monturas inactivas</p>
        </div>
      ) : (
        <InactivosTable products={products} onUpdated={() => globalThis.location.reload()} />
      )}
    </div>
  )
}
