"use client"

import { useState } from "react"
import Image from "next/image"
import { AdminProduct } from "@/src/types/admin-product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useAdminToken } from "@/hooks/use-admin-token"
import { CheckCircle, Trash2 } from "lucide-react"
import { API_URL, API_KEY } from "@/lib/env"

interface Props {
  readonly products: AdminProduct[]
  readonly onUpdated: () => void
}

export function InactivosTable({ products, onUpdated }: Props) {
  const [search, setSearch] = useState("")
  const [activating, setActivating] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [activateConfirm, setActivateConfirm] = useState<{ id: string; name: string } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null)
  const { toast } = useToast()
  const { token } = useAdminToken()

  const filtered = products.filter((p) =>
    `${p.nombre} ${p.marca ?? ""}`.toLowerCase().includes(search.toLowerCase())
  )

  async function handleActivate(productId: string) {
    if (!token) {
      toast({
        title: "Error de autenticación",
        description: "No se encontró el token de autenticación",
        variant: "destructive",
      })
      return
    }

    setActivating(productId)
    try {
      const res = await fetch(`${API_URL}/admin/monturas/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY ?? "",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ activo: true }),
      })

      if (!res.ok) {
        const error = await res.json()
        let errorMsg = "Error al activar montura"
        if (typeof error === 'string') {
          errorMsg = error
        } else if (Array.isArray(error)) {
          errorMsg = error[0]?.detail || error[0]?.error || String(error[0]) || "Error al activar montura"
        } else if (error && typeof error === 'object') {
          errorMsg = error.detail || error.error || error.message || "Error al activar montura"
        }
        throw new Error(errorMsg)
      }

      toast({
        title: "Montura activada",
        description: "La montura fue activada correctamente.",
      })

      onUpdated()
    } catch (err) {
      console.error(err)
      toast({
        title: "Error al activar",
        description: String(err),
        variant: "destructive",
      })
    } finally {
      setActivating(null)
      setActivateConfirm(null)
    }
  }

  async function handleDelete(productId: string) {
    if (!token) {
      toast({
        title: "Error de autenticación",
        description: "No se encontró el token de autenticación",
        variant: "destructive",
      })
      return
    }

    setDeleting(productId)
    try {
      const res = await fetch(`${API_URL}/admin/monturas/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY ?? "",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const error = await res.json()
        let errorMsg = "Error al eliminar montura"
        if (typeof error === 'string') {
          errorMsg = error
        } else if (Array.isArray(error)) {
          errorMsg = error[0]?.detail || error[0]?.error || String(error[0]) || "Error al eliminar montura"
        } else if (error && typeof error === 'object') {
          errorMsg = error.detail || error.error || error.message || "Error al eliminar montura"
        }
        throw new Error(errorMsg)
      }

      toast({
        title: "Montura eliminada",
        description: "La montura fue eliminada correctamente.",
      })

      onUpdated()
    } catch (err) {
      console.error(err)
      toast({
        title: "Error al eliminar",
        description: String(err),
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
      setDeleteConfirm(null)
    }
  }

  return (
    <div className="space-y-6">
      <Input
        placeholder="Buscar por nombre o marca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="overflow-x-auto">
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 text-left">Producto</th>
              <th className="p-4 text-center">Marca</th>
              <th className="p-4 text-center">Precio</th>
              <th className="p-4 text-center">Stock</th>
              <th className="p-4 text-center">Color</th>
              <th className="p-4 text-center">Material</th>
              <th className="p-4 text-center">Género</th>
              <th className="p-4 text-center">Estilo</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-4 flex items-center gap-2">
                  <Image
                    src={p.imagen_url || "/placeholder.svg"}
                    alt={p.nombre}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <div>
                    <p className="font-medium text-sm">{p.nombre}</p>
                    <p className="text-xs text-muted-foreground">{p.descripcion?.substring(0, 30) || "Sin descripción"}</p>
                  </div>
                </td>

                <td className="p-4 text-center text-sm">{p.marca ?? "-"}</td>
                <td className="p-4 text-center text-sm font-semibold">${p.precio}</td>
                <td className="p-4 text-center text-sm">{p.stock ?? "-"}</td>
                <td className="p-4 text-center text-sm">{p.color ?? "-"}</td>
                <td className="p-4 text-center text-sm">{p.material ?? "-"}</td>
                <td className="p-4 text-center text-sm">{p.genero ?? "-"}</td>
                <td className="p-4 text-center text-sm">{p.estilo ?? "-"}</td>
                
                <td className="p-4 text-center space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setActivateConfirm({ id: p.id, name: p.nombre })}
                    disabled={activating === p.id}
                    className="text-green-600 hover:text-green-700"
                    title="Activar montura"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setDeleteConfirm({ id: p.id, name: p.nombre })}
                    disabled={deleting === p.id}
                    className="text-destructive hover:text-destructive"
                    title="Eliminar montura"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No se encontraron monturas inactivas</p>
        </div>
      )}

      {/* Dialog para activar */}
      <AlertDialog open={!!activateConfirm} onOpenChange={(open) => !open && setActivateConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Activar Montura</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Deseas activar la montura "{activateConfirm?.name}"? Volverá a aparecer en el catálogo.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel disabled={activating === activateConfirm?.id}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => activateConfirm && handleActivate(activateConfirm.id)}
              disabled={activating === activateConfirm?.id}
              className="bg-green-600 hover:bg-green-700"
            >
              {activating === activateConfirm?.id ? "Activando..." : "Activar"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog para eliminar */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Eliminar Montura</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar la montura "{deleteConfirm?.name}"? Esta acción no se puede deshacer.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel disabled={deleting === deleteConfirm?.id}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDelete(deleteConfirm.id)}
              disabled={deleting === deleteConfirm?.id}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleting === deleteConfirm?.id ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
