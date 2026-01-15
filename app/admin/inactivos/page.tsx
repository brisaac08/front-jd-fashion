import { InactivosTableWrapper } from "@/components/admin/inactivos-table-wrapper"
import { AdminProduct } from "@/src/types/admin-product"
import { API_URL, API_KEY } from "@/lib/env"

export default async function InactivosPage() {
  let products: AdminProduct[] = []

  try {
    const res = await fetch(`${API_URL}/monturas/inactivas`, {
      headers: {
        "api-key": API_KEY ?? "",
      },
      cache: "no-store",
    })

    if (res.ok) {
      products = await res.json()
    }
  } catch (err) {
    console.error("Error al cargar monturas inactivas:", err)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Monturas Inactivas</h1>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay monturas inactivas</p>
        </div>
      ) : (
        <InactivosTableWrapper products={products} />
      )}
    </div>
  )
}
