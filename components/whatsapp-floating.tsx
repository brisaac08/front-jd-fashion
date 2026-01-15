"use client"

import { usePathname } from "next/navigation"

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
        rounded-full bg-green-500
        shadow-lg transition-transform
        hover:scale-110 hover:bg-green-600
      "
    >
      <span className="text-2xl">💬</span>
    </a>
  )
}
