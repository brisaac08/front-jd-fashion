"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X } from "lucide-react"
import Image from "next/image"

export function AddProductForm() {
  const [images, setImages] = useState<string[]>(["/aviator-sunglasses-gold.jpg", "/cat-eye-glasses-blue.jpg"])

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Registrar Nuevo Producto</h1>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <form className="space-y-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Selecciona del almacén
            </Label>
            <div className="flex gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative h-32 w-32 overflow-hidden rounded-lg border-2 border-border bg-muted"
                >
                  <Image src={img || "/placeholder.svg"} alt={`Product ${index + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Product Details Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Categoría del Producto
              </Label>
              <Input id="category" placeholder="Tarjeta Eléctrica Profesional Amarillo y Negro" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category2"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Categoría
              </Label>
              <Input id="category2" placeholder="Estructura eléctrica" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="reference"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Referencia
              </Label>
              <Input id="reference" placeholder="ID" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Stock (cantidad)
              </Label>
              <Input id="stock" type="number" placeholder="30" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Precio (costo)
              </Label>
              <Input id="price" type="number" placeholder="30" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="offer-price"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Precio (oferta)
              </Label>
              <Input id="offer-price" type="number" placeholder="30" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Color
              </Label>
              <Input id="color" placeholder="White" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tamaño
              </Label>
              <Input id="size" placeholder="amarill" className="h-12" />
            </div>
          </div>

          {/* Specific Characteristics */}
          <div className="space-y-2">
            <Label
              htmlFor="characteristics"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Características Específicas
            </Label>
            <Textarea
              id="characteristics"
              placeholder="Diseño ergonómico color amarillo para uso prolongado sin cansancio. Ideal para trabajos de bricolaje hogar y construcción de carpintería"
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Status Checkboxes */}
          <div className="space-y-4">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Atributos de Estado
            </Label>
            <div className="flex gap-8">
              <div className="flex items-center space-x-2">
                <Checkbox id="offer" />
                <Label htmlFor="offer" className="text-sm font-normal cursor-pointer">
                  Oferta
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <Label htmlFor="featured" className="text-sm font-normal cursor-pointer">
                  Destacado
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="new" />
                <Label htmlFor="new" className="text-sm font-normal cursor-pointer">
                  Nuevo
                </Label>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-2">
            <Label htmlFor="details" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Detalles de Producto
            </Label>
            <Textarea
              id="details"
              placeholder="Taladro Eléctrico: ideal para Trabajos de bricolaje en niveles metal y concreto, motor eléctrico multifunciones. Incluye accesorios: clavos, desarmadores, mechas, etc."
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-foreground text-background hover:bg-foreground/90">
              Guardar Producto
            </Button>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
