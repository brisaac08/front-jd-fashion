import { apiFetch } from "@/lib/api"
import { Montura } from "@/src/types/montura"

export function createMontura(
  data: Partial<Montura>,
  token: string
) {
  return apiFetch<Montura>(
    "/admin/monturas/",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token
  )
}

export function updateMontura(
  id: string,
  data: Partial<Montura>,
  token: string
) {
  return apiFetch<Montura>(
    `/admin/monturas/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    token
  )
}

export function deleteMontura(
  id: string,
  token: string
) {
  return apiFetch<void>(
    `/admin/monturas/${id}`,
    {
      method: "DELETE",
    },
    token
  )
}

