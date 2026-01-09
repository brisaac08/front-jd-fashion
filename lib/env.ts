const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.API_KEY

if (!API_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_URL no está definida")
}

if (!API_KEY) {
  throw new Error("❌ API_KEY no está definida en el entorno")
}

export { API_URL, API_KEY }
