import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { updateAdminMontura } from "@/src/services/admin-monturas"

export async function PUT(
  request: Request,
  
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await request.json()


  // Leer token de la cookie (con await)
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  console.log("Token en actualizar montura:", token);

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const updated = await updateAdminMontura(id, body, token);
  console.log("Montura actualizada:", token);
  return NextResponse.json(updated)
}
