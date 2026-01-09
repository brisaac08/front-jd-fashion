import { NextResponse } from "next/server"
import { updateAdminMontura } from "@/src/services/admin-monturas"

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params   // ✅ CLAVE
  const body = await request.json()

  const updated = await updateAdminMontura(id, body)

  return NextResponse.json(updated)
}
