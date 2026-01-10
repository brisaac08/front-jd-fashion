import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request, context: { params: { id: string } }) {
  const { id } = context.params

  // log token presence
  const cookieStore = await cookies()
  const token = cookieStore.get("admin-token")?.value
  console.log("Upload route token present:", Boolean(token))

  try {
    const form = await request.formData()
    const file = form.get("image") as File | null

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert file to base64 data URL and return as imagen_url
    const buffer = await file.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    let binary = ""
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i])
    const b64 = Buffer.from(binary, "binary").toString("base64")
    const dataUrl = `data:${file.type};base64,${b64}`

    console.log(`Uploaded image for montura ${id}: size=${file.size} type=${file.type}`)

    return NextResponse.json({ imagen_url: dataUrl })
  } catch (err) {
    console.error("Error in upload route:", err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
