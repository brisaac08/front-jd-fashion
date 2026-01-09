"use client"

import { useState } from "react"
import { AdminProduct } from "@/src/types/admin-product"
import { updateAdminMontura } from "@/src/services/admin-monturas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
  product: AdminProduct
  onClose: () => void
  onUpdated: () => void
}

export function EditMonturaModal({ product, onClose, onUpdated }: Props) {
  const [nombre, setNombre] = useState(product.nombre)
  const [precio, setPrecio] = useState(product.precio ?? 0)

  async function handleSave() {
    await updateAdminMontura(product.id, {
      nombre,
      precio,
    })

    onUpdated()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Editar Montura</h2>

        <Input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />

        <Input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          placeholder="Precio"
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}
