import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { API_URL, API_KEY } from "@/lib/env"

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin-token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      )
    }

    const res = await fetch(`${API_URL}/admin/usuarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
        "admin_token": token,
      },
    })

    if (!res.ok) {
      const errorText = await res.text()
      return NextResponse.json(
        { error: errorText || "Error al obtener usuario" },
        { status: res.status }
      )
    }

    // Retornar el array de usuarios, el frontend puede usar el primero o el actual
    const users = await res.json()
    return NextResponse.json(Array.isArray(users) ? users[0] : users)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
