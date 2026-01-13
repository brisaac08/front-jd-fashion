"use client"

import { useState } from "react"
import Image from "next/image"
import { AdminProduct } from "@/src/types/admin-product"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ImageUploadInput from "@/components/admin/image-upload-input"
import { uploadAdminMonturaImage, updateAdminMontura } from "@/src/services/admin-monturas"
import { useToast } from "@/hooks/use-toast"
import { useAdminToken } from "@/hooks/use-admin-token"
import { Edit, Trash2 } from "lucide-react"

/* =======================
   MODAL DE EDICIÓN
======================= */
function EditMonturaModal({
  product,
  onClose,
  onUpdated,
}: {
  readonly product: AdminProduct
  readonly onClose: () => void
  readonly onUpdated: () => void
}) {
  const { toast } = useToast()
  const { token } = useAdminToken()

  const [nombre, setNombre] = useState(product.nombre)
  const [marca, setMarca] = useState(product.marca ?? "")
  const [precio, setPrecio] = useState(product.precio)
  const [stock, setStock] = useState(product.stock ?? 0)
  const [descripcion, setDescripcion] = useState(product.descripcion ?? "")
  const [imagen_url, setImagenUrl] = useState(product.imagen_url ?? "")
  const [activo, setActivo] = useState(product.activo)

  // 🆕 NUEVOS CAMPOS
  const [color, setColor] = useState(product.color ?? "")
  const [material, setMaterial] = useState(product.material ?? "")
  const [genero, setGenero] = useState(product.genero ?? "")
  const [estilo, setEstilo] = useState(product.estilo ?? "")
  const [tipo, setTipo] = useState(product.tipo ?? "")
  const [forma, setForma] = useState(product.forma ?? "")

  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  async function handleSave() {
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
      marca,
      precio,
      stock,
      descripcion,
      imagen_url,
      activo,
      color,
      material,
      genero,
      estilo,
      tipo,
      forma,
    }

    console.log("DATA ENVIADA AL BACKEND:", payload)

    setSaving(true)
    try {
      await updateAdminMontura(product.id, payload, token)

      toast({
        title: "Montura actualizada",
        description: "Los cambios se guardaron correctamente.",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-background p-6 space-y-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold">Editar montura</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Nombre</Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div>
            <Label>Marca</Label>
            <Input value={marca} onChange={(e) => setMarca(e.target.value)} />
          </div>

          <div>
            <Label>Precio</Label>
            <Input type="number" value={precio} onChange={(e) => setPrecio(+e.target.value)} />
          </div>

          <div>
            <Label>Stock</Label>
            <Input type="number" value={stock} onChange={(e) => setStock(+e.target.value)} />
          </div>

          <div>
            <Label>Color</Label>
            <Input value={color} onChange={(e) => setColor(e.target.value)} />
          </div>

          <div>
            <Label>Material</Label>
            <Input value={material} onChange={(e) => setMaterial(e.target.value)} />
          </div>

          <div>
            <Label>Género</Label>
            <Input value={genero} onChange={(e) => setGenero(e.target.value)} />
          </div>

          <div>
            <Label>Estilo</Label>
            <Input value={estilo} onChange={(e) => setEstilo(e.target.value)} />
          </div>

          <div>
            <Label>Tipo</Label>
            <Input value={tipo} onChange={(e) => setTipo(e.target.value)} />
          </div>

          <div>
            <Label>Forma</Label>
            <Input value={forma} onChange={(e) => setForma(e.target.value)} />
          </div>
        </div>

        <div>
          <Label>Descripción</Label>
          <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>

        <div className="flex items-center gap-2">
          <Switch checked={activo} onCheckedChange={setActivo} />
          <span>Activo</span>
        </div>

        <div>
          <Label>Imagen</Label>
          <ImageUploadInput
            initialUrl={imagen_url || null}
            uploadFn={async (file) => {
              try {
                setUploading(true)
                const resp = await uploadAdminMonturaImage(product.id, file)
                setImagenUrl(resp.imagen_url)
                toast({ title: "Imagen subida correctamente" })
                return resp.imagen_url
              } finally {
                setUploading(false)
              }
            }}
            onUploaded={setImagenUrl}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={saving || uploading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving || uploading}>
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </div>
  )
}

/* =======================
   TABLA
======================= */
export function ProductsTable({ products }: { readonly products: AdminProduct[] }) {
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<AdminProduct | null>(null)

  const filtered = products.filter((p) =>
    `${p.nombre} ${p.marca ?? ""}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventario de Monturas</h1>

      <Input
        placeholder="Buscar por nombre o marca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

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
            <th className="p-4 text-center">Tipo</th>
            <th className="p-4 text-center">Forma</th>
            <th className="p-4 text-center">Activo</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-4 flex items-center gap-2 min-w-[250px]">
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
              <td className="p-4 text-center text-sm">{p.tipo ?? "-"}</td>
              <td className="p-4 text-center text-sm">{p.forma ?? "-"}</td>
              <td className="p-4 text-center">
                <Switch checked={p.activo} disabled />
              </td>
              <td className="p-4 text-center">
                <Button size="icon" variant="ghost" onClick={() => setEditing(p)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <EditMonturaModal
          product={editing}
          onClose={() => setEditing(null)}
          onUpdated={() => globalThis.location.reload()}
        />
      )}
    </div>
  )
}
