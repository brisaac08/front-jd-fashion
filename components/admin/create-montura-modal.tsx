"use client"

import { useState } from "react"
import Image from "next/image"
import { CreateProductData } from "@/src/types/admin-product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import ImageUploadInput from "@/components/admin/image-upload-input"
import { useToast } from "@/hooks/use-toast"
import { useAdminToken } from "@/hooks/use-admin-token"
import { useRouter } from "next/navigation"
import { API_URL, API_KEY } from "@/lib/env"

export function CreateMonturaForm() {
  const { toast } = useToast()
  const { token } = useAdminToken()
  const router = useRouter()

  // Form fields
  const [nombre, setNombre] = useState("")
  const [marca, setMarca] = useState("")
  const [precio, setPrecio] = useState(0)
  const [stock, setStock] = useState(0)
  const [descripcion, setDescripcion] = useState("")
  const [imagen_url, setImagenUrl] = useState<string>("")
  const [activo, setActivo] = useState(true)

  // 🆕 NUEVOS CAMPOS
  const [color, setColor] = useState("")
  const [material, setMaterial] = useState("")
  const [genero, setGenero] = useState("")
  const [estilo, setEstilo] = useState("")
  const [tipo, setTipo] = useState("")
  const [forma, setForma] = useState("")

  const [saving, setSaving] = useState(false)

  async function uploadImageToCloudinary(file: File): Promise<string> {
    try {
      const formData = new FormData()
      formData.append("image", file)

      // Crear un ID temporal para la montura
      const tempId = "temp-" + Date.now()

      const res = await fetch(`/api/admin/monturas/${tempId}/upload-post`, {
        method: "POST",
        body: formData,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
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
    // Validaciones
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
        description: "Debes subir una imagen antes de guardar",
        variant: "destructive",
      })
      return
    }

    if (!token) {
      toast({
        title: "Error de autenticación",
        description: "No se encontró el token de autenticación",
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

    console.log("DATA ENVIADA AL BACKEND:", payload)

    setSaving(true)
    try {
      const res = await fetch(`${API_URL}/admin/monturas/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY ?? "",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.detail || error.error || "Error al crear montura")
      }

      toast({
        title: "Montura creada",
        description: "La nueva montura fue registrada correctamente.",
      })

      router.push("/admin/inventario")
    } catch (err) {
      console.error(err)
      toast({
        title: "Error al crear",
        description: String(err),
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="nombre">Nombre *</Label>
          <Input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Aviador Clásico"
          />
        </div>

        <div>
          <Label htmlFor="marca">Marca</Label>
          <Input
            id="marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Ej: Ray-Ban"
          />
        </div>

        <div>
          <Label htmlFor="precio">Precio *</Label>
          <Input
            id="precio"
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(+e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(+e.target.value)}
            placeholder="0"
          />
        </div>

        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Ej: Negro"
          />
        </div>

        <div>
          <Label htmlFor="material">Material</Label>
          <Input
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            placeholder="Ej: Acetato"
          />
        </div>

        <div>
          <Label htmlFor="genero">Género</Label>
          <Input
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            placeholder="Ej: Unisex"
          />
        </div>

        <div>
          <Label htmlFor="estilo">Estilo</Label>
          <Input
            id="estilo"
            value={estilo}
            onChange={(e) => setEstilo(e.target.value)}
            placeholder="Ej: Retro"
          />
        </div>

        <div>
          <Label htmlFor="tipo">Tipo</Label>
          <Input
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            placeholder="Ej: Gafas de sol"
          />
        </div>

        <div>
          <Label htmlFor="forma">Forma</Label>
          <Input
            id="forma"
            value={forma}
            onChange={(e) => setForma(e.target.value)}
            placeholder="Ej: Rectangular"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe la montura..."
          rows={4}
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
              title: "Imagen subida",
              description: "La imagen se cargó correctamente a Cloudinary",
            })
          }}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="secondary"
          onClick={() => router.push("/admin/inventario")}
          disabled={saving}
        >
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Creando..." : "Crear montura"}
        </Button>
      </div>
    </div>
  )
}
