'use client'

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCarouselInfo } from "@/lib/carousel-info"

export default function PublicidadPage() {
  const params = useParams()
  const router = useRouter()
  const name = params.name as string

  // Obtener información basada en el nombre
  const slideInfo = getCarouselInfo(`${name}.jpg`)

  if (!slideInfo) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">Publicidad no encontrada</h1>
        <Button onClick={() => router.push("/")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>
      </main>
    )
  }

  // Generar enlace WhatsApp
  const getWhatsAppLink = () => {
    const phoneNumber = "573246718202"
    const message = `¿Puedes darme más detalles acerca de ${slideInfo.marca}?`
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      {/* Header - Solo para z-index, sin contenido */}
      <div className="sticky top-0 z-50 bg-transparent"></div>

      {/* Content */}
      <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
        {/* Main Content - Layout Horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
          {/* Imagen */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg flex justify-center">
            <div className="relative w-full max-w-xs">
              <Image
                src={`/${name}.jpg`}
                alt={slideInfo.marca}
                width={400}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Información */}
          <div className="flex flex-col justify-start space-y-4 sm:space-y-5">
            {/* Título y marca como parte del contenido */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold text-slate-900 mb-3">
                {slideInfo.marca}
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-slate-900 mb-3">
                {slideInfo.titulo}
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                {slideInfo.descripcion}
              </p>
            </div>

            {/* Sección Consulta y Cotiza */}
            <div className="border-t pt-4">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                Consulta y Cotiza con Nosotros
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4">
                ¿Te interesa conocer más sobre {slideInfo.marca}? Contáctanos por WhatsApp.
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Volver */}
        <div className="pt-6 border-t border-slate-200 mt-8">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
