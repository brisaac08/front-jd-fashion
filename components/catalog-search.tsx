"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Props {
  value?: string
  onChange?: (value: string) => void
}

export function CatalogSearch({ value = "", onChange }: Props) {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Buscar por nombre o referencia..."
        className="pl-9"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}
