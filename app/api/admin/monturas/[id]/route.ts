import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { API_URL, API_KEY } from "@/lib/env"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin-token")?.value

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const res = await fetch(`${API_URL}/monturas`, {
    headers: {
      "api-key": API_KEY!,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    const txt = await res.text()
    return NextResponse.json({ error: txt }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
