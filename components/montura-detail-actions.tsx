"use client"

import { Button } from "@/components/ui/button"
import { Plus, MessageCircle } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { getProductWhatsappLink } from "@/lib/whatsapp"
import { Product } from "@/src/types/product"

interface MonturasDetailActionsProps {
  product: Product
}

export function MonturasDetailActions({ product }: readonly MonturasDetailActionsProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Añadido al carrito",
      description: `${product.name} se agregó a tu pedido`,
    })
  }

  const whatsappLink = getProductWhatsappLink({
    productName: product.name,
    price: product.price,
  })

  return (
    <div className="pt-8 flex flex-col gap-3">
      <Button
        className="w-full gap-2 h-12 text-base"
        onClick={handleAddToCart}
      >
        <Plus className="h-5 w-5" />
        Añadir al Carrito
      </Button>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        <Button className="w-full gap-2 h-12 text-base bg-green-600 hover:bg-green-700">
          <MessageCircle className="h-5 w-5" />
          Consultar por WhatsApp
        </Button>
      </a>
      <p className="text-xs text-center text-muted-foreground">
        Te conectaremos con nuestro equipo de ventas
      </p>
    </div>
  )
}
