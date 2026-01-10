const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
const API_KEY = process.env.API_KEY ?? ""

if (!process.env.NEXT_PUBLIC_API_URL) {
  // en desarrollo usamos localhost como fallback
  console.warn("⚠️ NEXT_PUBLIC_API_URL no está definida — usando http://localhost:3000 como fallback")
}

if (!process.env.API_KEY) {
  // no lanzar error: permitir ejecución en dev, pero avisar
  console.warn("⚠️ API_KEY no está definida en el entorno — algunas llamadas a la API podrían fallar")
}

export { API_URL, API_KEY }
