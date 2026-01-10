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
console.log("Respuesta de login:", data)

// Ajusta aquí si el campo no es 'token'
const token = data.token || data.access_token || data.jwt || "";

const response = NextResponse.json(data)

// Expiración de 1 hora
const oneHour = 60 * 60;
response.cookies.set("admin-token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: oneHour,
})

return response
}
