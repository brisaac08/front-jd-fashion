"use client"

import { useState } from "react"
import { AdminProduct } from "@/src/types/admin-product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import ImageUploadInput from "@/components/admin/image-upload-input"
import { useToast } from "@/hooks/use-toast"
import { useAdminToken } from "@/hooks/use-admin-token"
import { API_URL, API_KEY } from "@/lib/env"

interface Props {
  product: AdminProduct
  onClose: () => void
  onUpdated: () => void
}

export function EditMonturaModal({ product, onClose, onUpdated }: Props) {
  const { toast } = useToast()
  const { token } = useAdminToken()
  
  const [nombre, setNombre] = useState(product.nombre)
  const [marca, setMarca] = useState(product.marca || "")
  const [precio, setPrecio] = useState(product.precio ?? 0)
  const [stock, setStock] = useState(product.stock ?? 0)
  const [descripcion, setDescripcion] = useState(product.descripcion || "")
  const [imagen_url, setImagenUrl] = useState(product.imagen_url || "")
  const [activo, setActivo] = useState(product.activo ?? true)
  const [color, setColor] = useState(product.color || "")
  const [material, setMaterial] = useState(product.material || "")
  const [genero, setGenero] = useState(product.genero || "")
  const [estilo, setEstilo] = useState(product.estilo || "")
  const [tipo, setTipo] = useState(product.tipo || "")
  const [forma, setForma] = useState(product.forma || "")
  const [saving, setSaving] = useState(false)

  async function uploadImageToCloudinary(file: File): Promise<string> {
    try {
      const formData = new FormData()
      formData.append("image", file)

      const tempId = "temp-" + Date.now()

      const res = await fetch(`/api/admin/monturas/${tempId}/upload-post`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Error subiendo imagen")
      }

      const data = await res.json()
      return data.imagen_url
    } catch (err) {
      console.error("Error uploading to Cloudinary:", err)
      throw err
    }
  }

  async function handleSave() {
    if (!nombre.trim()) {
      toast({
        title: "Campo requerido",
        description: "El nombre de la montura es obligatorio",
        variant: "destructive",
      })
      return
    }

    if (precio <= 0) {
      toast({
        title: "Precio inválido",
        description: "El precio debe ser mayor a 0",
        variant: "destructive",
      })
      return
    }

    if (!imagen_url) {
      toast({
        title: "Imagen requerida",
        description: "La montura debe tener una imagen",
        variant: "destructive",
      })
      return
    }

    const payload = {
      nombre,
      marca: marca || undefined,
      precio,
      stock,
      descripcion: descripcion || undefined,
      imagen_url,
      activo,
      color: color || undefined,
      material: material || undefined,
      genero: genero || undefined,
      estilo: estilo || undefined,
      tipo: tipo || undefined,
      forma: forma || undefined,
    }

    setSaving(true)
    try {
      const res = await fetch(`${API_URL}/admin/monturas/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY ?? "",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.detail || error.error || "Error al actualizar montura")
      }

      toast({
        title: "Montura actualizada",
        description: "Los cambios fueron guardados correctamente.",
      })

      onUpdated()
      onClose()
    } catch (err) {
      console.error(err)
      toast({
        title: "Error al actualizar",
        description: String(err),
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-4">
        <h2 className="text-lg font-semibold">Editar Montura</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
            />
          </div>

          <div>
            <Label htmlFor="marca">Marca</Label>
            <Input
              id="marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Marca"
            />
          </div>

          <div>
            <Label htmlFor="precio">Precio *</Label>
            <Input
              id="precio"
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              placeholder="Precio"
            />
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder="Stock"
            />
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Color"
            />
          </div>

          <div>
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Material"
            />
          </div>

          <div>
            <Label htmlFor="genero">Género</Label>
            <Input
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              placeholder="Género"
            />
          </div>

          <div>
            <Label htmlFor="estilo">Estilo</Label>
            <Input
              id="estilo"
              value={estilo}
              onChange={(e) => setEstilo(e.target.value)}
              placeholder="Estilo"
            />
          </div>

          <div>
            <Label htmlFor="tipo">Tipo</Label>
            <Input
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Tipo"
            />
          </div>

          <div>
            <Label htmlFor="forma">Forma</Label>
            <Input
              id="forma"
              value={forma}
              onChange={(e) => setForma(e.target.value)}
              placeholder="Forma"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="descripcion">Descripción</Label>
          <Textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            rows={3}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch checked={activo} onCheckedChange={setActivo} />
          <span>Activo</span>
        </div>

        <div>
          <Label>Imagen *</Label>
          <ImageUploadInput
            initialUrl={imagen_url || null}
            uploadFn={uploadImageToCloudinary}
            onUploaded={(url) => {
              setImagenUrl(url)
              toast({
                title: "Imagen actualizada",
                description: "La imagen se cargó correctamente.",
              })
            }}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
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
