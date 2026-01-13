import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData()
    const file = formData.get("image") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No se recibió imagen" },
        { status: 400 }
      )
    }

    // Convertir File → Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Subir a Cloudinary usando stream
    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "monturas",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result as any)
          }
        ).end(buffer)
      }
    )

    return NextResponse.json({
      imagen_url: uploadResult.secure_url,
    })
  } catch (error) {
    console.error("Cloudinary error:", error)
    return NextResponse.json(
      { error: "Error subiendo imagen" },
      { status: 500 }
    )
  }
}
