import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { API_URL, API_KEY } from "@/lib/env"

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 🔥 ESTA ES LA CLAVE
    const { id } = await context.params

    const body = await request.json()

    // cookies() TAMBIÉN ES ASYNC
    const cookieStore = await cookies()
    const token = cookieStore.get("admin-token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const res = await fetch(`${API_URL}/admin/monturas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY ?? "",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    const text = await res.text()

    if (!res.ok) {
      console.error("BACKEND ERROR:", text)
      return NextResponse.json(
        { error: text },
        { status: res.status }
      )
    }

    return NextResponse.json(JSON.parse(text))
  } catch (err) {
    console.error("ROUTE ERROR:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
