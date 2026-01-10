import type { AdminProduct, CreateProductData, UpdateProductData } from "@/src/types/admin-product";
import { API_URL, API_KEY, } from "@/lib/env";


/* =======================
   OBTENER TODAS LAS MONTURAS
======================= */
export async function getAdminMonturas(): Promise<AdminProduct[]> {
  const res = await fetch(`${API_URL}/monturas`, {
    headers: { "api-key": API_KEY ?? "" },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Error al obtener monturas")
  }

  return res.json()
}

/* =======================
   OBTENER UNA MONTURA POR ID
======================= */
export async function getAdminMonturaById(id: string): Promise<AdminProduct> {
  if (!id) {
    throw new Error("ID de montura inválido")
  }

  const res = await fetch(`${API_URL}/monturas/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Error al obtener montura")
  }

  return res.json()
}

/* =======================
   CREAR NUEVA MONTURA
======================= */
export async function createAdminMontura(data: CreateProductData): Promise<AdminProduct> {
  const res = await fetch(`${API_URL}/admin/monturas`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": API_KEY ?? "" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Error al crear montura")
  }

  return res.json()
}



/* =======================
   ACTUALIZAR MONTURA
======================= */
export async function updateAdminMontura(id: string, data: UpdateProductData, token?: string): Promise<AdminProduct> {
  if (!id) {
    throw new Error("ID de montura inválido")
  }
  

  const res = await fetch(`${API_URL}/admin/monturas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "api-key": API_KEY ?? "",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Error al actualizar montura")
  }

  return res.json()
}

/* =======================
   ELIMINAR MONTURA
======================= */
export async function deleteAdminMontura(id: string): Promise<{ message: string }> {
  if (!id) {
    throw new Error("ID de montura inválido")
  }

  const res = await fetch(`/api/monturas/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "Error al eliminar montura")
  }

  return res.json()
}

/* =======================
   CAMBIAR ESTADO ACTIVO/INACTIVO
======================= */
export async function toggleAdminMonturaStatus(id: string, activo: boolean): Promise<AdminProduct> {
  return updateAdminMontura(id, { activo })
}
