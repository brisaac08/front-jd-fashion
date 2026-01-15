import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import { API_URL, API_KEY } from "@/lib/env"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const nombre = formData.get("nombre") as string
    const marca = formData.get("marca") as string
    const precio = formData.get("precio") as string
    const stock = formData.get("stock") as string
    const descripcion = formData.get("descripcion") as string
    const color = formData.get("color") as string
    const material = formData.get("material") as string
    const genero = formData.get("genero") as string
    const estilo = formData.get("estilo") as string
    const tipo = formData.get("tipo") as string
    const forma = formData.get("forma") as string
    const activo = formData.get("activo") === "true"
    const imageFile = formData.get("image") as File | null

    // Validaciones básicas
    if (!nombre) {
      return NextResponse.json(
        { error: "Nombre es requerido" },
        { status: 400 }
      )
    }

    if (!precio || parseFloat(precio) <= 0) {
      return NextResponse.json(
        { error: "Precio debe ser mayor a 0" },
        { status: 400 }
      )
    }

    let imagenUrl = ""

    // Si hay imagen, subirla a Cloudinary
    if (imageFile) {
      try {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

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

        imagenUrl = uploadResult.secure_url
      } catch (cloudinaryError) {
        console.error("Cloudinary error:", cloudinaryError)
        return NextResponse.json(
          { error: "Error subiendo imagen a Cloudinary" },
          { status: 500 }
        )
      }
    }

    // Crear la montura en el backend
    const payload = {
      nombre,
      marca: marca || undefined,
      precio: parseFloat(precio),
      stock: stock ? parseInt(stock) : 0,
      descripcion: descripcion || undefined,
      imagen_url: imagenUrl,
      activo,
      color: color || undefined,
      material: material || undefined,
      genero: genero || undefined,
      estilo: estilo || undefined,
      tipo: tipo || undefined,
      forma: forma || undefined,
    }

    const createRes = await fetch(`${API_URL}/admin/monturas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY ?? "",
      },
      body: JSON.stringify(payload),
    })

    if (!createRes.ok) {
      const errorText = await createRes.text()
      console.error("Backend error:", errorText)
      return NextResponse.json(
        { error: errorText || "Error al crear montura en el backend" },
        { status: createRes.status }
      )
    }

    const createdMontura = await createRes.json()
    return NextResponse.json(createdMontura)
  } catch (error) {
    console.error("Error creating montura:", error)
    return NextResponse.json(
      { error: String(error) || "Error al crear montura" },
      { status: 500 }
    )
  }
}
