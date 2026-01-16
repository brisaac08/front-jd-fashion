"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [savedEmails, setSavedEmails] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Cargar correos guardados al montar
  useEffect(() => {
    const stored = localStorage.getItem("admin-emails")
    if (stored) {
      setSavedEmails(JSON.parse(stored))
    }
  }, [])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setShowSuggestions(e.target.value.length > 0)
  }

  const selectEmail = (selectedEmail: string) => {
    setEmail(selectedEmail)
    setShowSuggestions(false)
  }

  const filteredEmails = savedEmails.filter((e) =>
    e.toLowerCase().includes(email.toLowerCase())
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    setLoading(false)

    if (res.ok) {
      // Guardar el email si no existe ya
      if (!savedEmails.includes(email)) {
        const updatedEmails = [email, ...savedEmails]
        localStorage.setItem("admin-emails", JSON.stringify(updatedEmails))
      }
      router.push("/admin")
    } else {
      setError("Credenciales incorrectas")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <h1 className="text-2xl font-bold text-center">Acceso Administrador</h1>

      <div className="relative">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          onFocus={() => email && setShowSuggestions(true)}
          required
          autoComplete="off"
        />
        {showSuggestions && filteredEmails.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {filteredEmails.map((e) => (
              <button
                key={e}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  selectEmail(e.currentTarget.textContent || "")
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors first:rounded-t-md last:rounded-b-md"
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </div>

      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </Button>
    </form>
  )
}
