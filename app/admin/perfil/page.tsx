"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

interface AdminUser {
  id: string
  email: string
  nombre?: string
  rol?: string
}

export default function AdminProfilePage() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/admin/usuarios")
        if (res.ok) {
          const data = await res.json()
          const firstUser = Array.isArray(data) ? data[0] : data
          setUser(firstUser)
        } else {
          toast({ title: "Error", description: "No se pudo cargar el perfil", variant: "destructive" })
        }
      } catch (err) {
        console.error("Error fetching user:", err)
        toast({ title: "Error", description: "Error al cargar el perfil", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [toast])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error: No se pudo cargar el usuario</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-muted/20 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <Button
          variant="outline"
          className="mb-6 flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Mi Perfil</CardTitle>
            <CardDescription>Información de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-sm font-medium">Nombre Completo</label>
              <div id="nombre" className="px-3 py-2 bg-muted rounded-md text-sm">
                {user?.nombre || "No especificado"}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div id="email" className="px-3 py-2 bg-muted rounded-md text-sm">
                {user?.email}
              </div>
            </div>

            {/* Rol */}
            {user?.rol && (
              <div className="space-y-2">
                <label htmlFor="rol" className="text-sm font-medium">Rol</label>
                <div id="rol" className="px-3 py-2 bg-muted rounded-md text-sm font-medium">
                  {user.rol}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
