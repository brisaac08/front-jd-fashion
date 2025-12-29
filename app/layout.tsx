import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"

import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Óptica JD Fashion - Catálogo de Monturas",
  description: "Descubre nuestra colección exclusiva de monturas para lentes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <CartProvider>
          <Header /> 
          {children}
          <Toaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
