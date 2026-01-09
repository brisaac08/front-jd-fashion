import { NextResponse } from "next/server"
import { updateAdminMontura } from "@/src/services/admin-monturas"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()

  const updated = await updateAdminMontura(params.id, body)

  return NextResponse.json(updated)
}
