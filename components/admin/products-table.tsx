"use client"

import { useState } from "react"
import Image from "next/image"
import { AdminProduct } from "@/src/types/admin-product"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
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
  const [nombre, setNombre] = useState(product.nombre)
  const [marca, setMarca] = useState(product.marca ?? "")
  const [precio, setPrecio] = useState(product.precio ?? 0)
  const [descripcion, setDescripcion] = useState(product.descripcion ?? "")
  const [imagen_url, setImagenUrl] = useState(product.imagen_url ?? "")
  const [stock, setStock] = useState(product.stock ?? 0)
  const [activo, setActivo] = useState(product.activo)

  async function handleSave() {
    await fetch(`/api/admin/monturas/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        marca,
        precio,
        descripcion,
        imagen_url,
        activo
      }),
    })

    onUpdated()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-background p-6 space-y-4">
        <h2 className="text-lg font-semibold">Editar montura</h2>

        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <Input type="number" value={precio} onChange={(e) => setPrecio(+e.target.value)} />
        <Input type="number" value={stock} onChange={(e) => setStock(+e.target.value)} />

        <div className="flex items-center gap-2">
          <Switch checked={activo} onCheckedChange={setActivo} />
          <span>Activo</span>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
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
            <th className="p-4 text-center">Precio</th>
            <th className="p-4 text-center">Stock</th>
            <th className="p-4 text-center">Activo</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-4 flex items-center gap-4">
                <Image
                  src={p.imagen_url || "/placeholder.svg"}
                  alt={p.nombre}
                  width={48}
                  height={48}
                />
                <div>
                  <p>{p.nombre}</p>
                  <p className="text-sm text-muted-foreground">{p.marca ?? "Sin marca"}</p>
                </div>
              </td>

              <td className="p-4 text-center">${p.precio}</td>
              <td className="p-4 text-center">{p.stock ?? "-"}</td>
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
