"use client"

import { AdminProduct } from "@/src/types/admin-product"
import { InactivosTable } from "@/components/admin/inactivos-table"

interface Props {
  readonly products: AdminProduct[]
}

export function InactivosTableWrapper({ products }: Props) {
  const handleUpdated = () => {
    globalThis.location.reload()
  }

  return <InactivosTable products={products} onUpdated={handleUpdated} />
}
