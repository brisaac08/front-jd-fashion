import { apiFetch } from "@/lib/api"
import { Montura } from "@/src/types/montura"

/**
 * Monturas públicas (inventario)
 */
export function getMonturas() {
  return apiFetch<Montura[]>("/monturas/")
}
