"use client"

import { useState } from "react"
import { AdminProduct } from "@/src/types/admin-product"
import { updateAdminMontura } from "@/src/services/admin-monturas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
  product: AdminProduct
  onClose: () => void
  onUpdated: () => void
}

export function EditMonturaModal({ product, onClose, onUpdated }: Props) {
  const [nombre, setNombre] = useState(product.nombre)
  const [precio, setPrecio] = useState(product.precio ?? 0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(product.imagen_url ?? null)

  function fileToBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = (err) => reject(err)
      reader.readAsDataURL(file)
    })
  }

  async function handleSave() {
    // prepare payload, include image (base64) if a new file was selected
    const payload: any = { nombre, precio }

    if (imageFile) {
      const base64 = await fileToBase64(imageFile)
      payload.imagen_url = base64
    }

    await updateAdminMontura(product.id, payload)

    onUpdated()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Editar Montura</h2>

        <div>
          <Label>Nombre</Label>
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
        </div>

        <div>
          <Label>Precio</Label>
          <Input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            placeholder="Precio"
          />
        </div>

        <div>
          <Label>Imagen</Label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null
              setImageFile(f)
              if (f) {
                const url = URL.createObjectURL(f)
                setImagePreview(url)
              }
            }}
          />

          {imagePreview ? (
            <img
              src={imagePreview}
              alt="preview"
              className="mt-2 h-32 w-auto object-contain rounded"
            />
          ) : null}
        </div>

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
