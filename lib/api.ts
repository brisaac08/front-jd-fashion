import { API_KEY, API_URL } from "@/lib/env"

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "api-key": API_KEY, // ✅ ahora sí
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText || "Error en la petición")
  }

  return res.json()
}
