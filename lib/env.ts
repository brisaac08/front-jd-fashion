const _API_KEY = process.env.API_KEY
const _API_URL = process.env.NEXT_PUBLIC_API_URL

if (!_API_KEY) {
  throw new Error("❌ API_KEY no está definida en el entorno")
}

if (!_API_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_URL no está definida")
}

export const API_KEY: string = _API_KEY
export const API_URL: string = _API_URL
