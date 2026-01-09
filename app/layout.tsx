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
  readonly children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <Header /> 
            <div className="flex-1 w-full">
              {children}
            </div>
          </div>
          <Toaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
