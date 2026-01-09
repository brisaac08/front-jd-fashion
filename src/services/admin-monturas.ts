import { API_URL, API_KEY } from "@/lib/env"
import { AdminProduct } from "@/src/types/admin-product"

/* =======================
   OBTENER MONTURAS
======================= */
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

/* =======================
   ACTUALIZAR MONTURA
======================= */
export async function updateAdminMontura(
  id: string,
  data: {
    nombre?: string
    marca?: string
    precio?: number
    descripcion?: string
    imagen_url?: string
    activo?: boolean
  }
) {
  if (!id) {
    throw new Error("ID de montura inválido")
  }

  const res = await fetch(`${API_URL}/admin/monturas/${id}`, {
    method: "PUT", // 🔥 EL ÚNICO MÉTODO VÁLIDO
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(error || "Error al actualizar montura")
  }

  return res.json()
}
