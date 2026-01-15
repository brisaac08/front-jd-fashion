import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { API_URL, API_KEY } from "@/lib/env"

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin-token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      )
    }

    const data = await req.json()

    const res = await fetch(`${API_URL}/admin/monturas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY!,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const errorText = await res.text()
      return NextResponse.json(
        { error: errorText || "Error al crear montura" },
        { status: res.status }
      )
    }

    const createdMontura = await res.json()
    return NextResponse.json(createdMontura)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
