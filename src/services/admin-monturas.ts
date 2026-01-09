import { API_URL, API_KEY } from "@/lib/env"
import { AdminProduct } from "@/src/types/admin-product"

export async function getAdminMonturas(): Promise<AdminProduct[]> {
  const res = await fetch(`${API_URL}/monturas`, {
    headers: {
      "api-key": API_KEY,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Error al obtener monturas")
  }

  return res.json()
}

export async function updateAdminMontura(
  id: string,
  data: Partial<AdminProduct>
) {
  const res = await fetch(`${API_URL}/admin/monturas/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Error al actualizar montura")
  }

  return res.json()
}
