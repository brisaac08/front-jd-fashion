"use client"

import { CreateMonturaForm } from "@/components/admin/create-montura-modal"

export default function AgregarMonturaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Agregar Nueva Montura</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Crea una nueva montura completando todos los campos disponibles.
        </p>
      </div>

      <CreateMonturaForm />
    </div>
  )
}
