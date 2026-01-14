"use client"

import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"

export function FooterWrapper() {
  const pathname = usePathname()
  
  // No mostrar footer en rutas de admin
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null
  }
  
  return <Footer />
}
