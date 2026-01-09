import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.API_KEY!,
      },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    )
  }

  const data = await res.json()

  const response = NextResponse.json(data)

  // Guarda token en cookie
  response.cookies.set("admin-token", data, {
    httpOnly: true,
    path: "/",
  })

  return response
}
