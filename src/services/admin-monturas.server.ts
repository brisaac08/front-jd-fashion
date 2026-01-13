import { API_URL, API_KEY } from "@/lib/env"
import type { AdminProduct, UpdateProductData } from "@/src/types/admin-product"

export async function updateAdminMonturaServer(
  id: string,
  data: UpdateProductData,
  token: string
): Promise<AdminProduct> {
  const res = await fetch(`${API_URL}/admin/monturas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY!,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error("❌ BACKEND ERROR:", text)
    throw new Error(text)
  }

  return res.json()
}
