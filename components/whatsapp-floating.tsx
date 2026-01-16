"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"

export function WhatsappFloatingButton() {
  const pathname = usePathname()
  // No mostrar en rutas de admin o login
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null
  }

  const phoneNumber = "573246718202"
  const message = "Hola 👋, tengo una consulta sobre sus productos"
  const encodedMessage = encodeURIComponent(message)
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="
        fixed bottom-5 right-5 z-50
        flex h-14 w-14 items-center justify-center
        hover:scale-110
        group
      "
      style={{ position: 'fixed' }}
    >
      <span className="flex items-center justify-center w-full h-full">
        <Image
          src="/whatsapp-3.svg"
          alt="WhatsApp"
          width={100}
          height={100}
          priority
          className="object-contain"
        />
      </span>
      <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-green-600 text-white text-sm font-medium rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-[999] shadow-lg group-hover:mr-4">
        Consulta por WhatsApp
      </span>
    </a>
  )
}