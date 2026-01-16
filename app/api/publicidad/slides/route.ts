import { NextResponse } from "next/server"
import { readdirSync } from "node:fs"
import { join } from "node:path"

export async function GET() {
  try {
    // Ruta a la carpeta public
    const publicDir = join(process.cwd(), "public")
    
    // Leer todos los archivos en public
    const files = readdirSync(publicDir)
    
    // Filtrar solo archivos que empiezan con "publicidad-"
    const publicidadFiles = files
      .filter((file) => file.toLowerCase().startsWith("publicidad-"))
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b))
    
    // Transformar a slides con formato consistente
    const slides = publicidadFiles.map((filename) => {
      // Extraer el nombre sin extensión y sin "publicidad-"
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, "")
      const title = nameWithoutExt
        .replace(/^publicidad-/, "")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      
      return {
        id: filename,
        title: title || "Colección",
        description: "",
        image: `/${filename}`,
      }
    })
    
    return NextResponse.json(slides)
  } catch (error) {
    console.error("Error al leer carpeta publicidad:", error)
    return NextResponse.json([], { status: 200 })
  }
}
