import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { CartProvider } from "@/components/cart-provider"
import { FavoritesProvider } from "@/components/favorites-provider"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsappFloatingButton } from "@/components/whatsapp-floating"



import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Óptica JD Fashion | Monturas con estilo",
  description: "Descubre nuestra colección exclusiva de monturas y anteojos con estilo. Encuentra las mejores marcas de monturas para lentes en Óptica JD Fashion. Consulta con nuestro equipo de expertos.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Óptica JD Fashion | Monturas con estilo",
    description: "Descubre nuestra colección exclusiva de monturas y anteojos con estilo.",
    type: "website",
  },
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
          <FavoritesProvider>
            <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
              <Header /> 
              <div className="flex-1 w-full pt-16">
                {children}
              </div>
            </div>
          </FavoritesProvider>
          <Toaster />
        </CartProvider>
        <Analytics />
        <Footer />
        <WhatsappFloatingButton />
      </body>
    </html>
  )
}
