import { useEffect, useState } from "react"

export function useAdminToken() {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch("/api/admin/token")
        if (res.ok) {
          const data = await res.json()
          setToken(data.token)
        }
      } catch (error) {
        console.error("Error fetching admin token:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchToken()
  }, [])

  return { token, loading }
}
