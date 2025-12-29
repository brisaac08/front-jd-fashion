"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CartSheet() {
  const { items, removeItem, updateQuantity, total } = useCart()

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return

    let message = "¡Hola! Me gustaría hacer el siguiente pedido:\n\n"

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Precio: $${item.price.toFixed(2)}\n\n`
    })

    message += `Total: $${total.toFixed(2)}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
  }

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">Tu carrito está vacío</p>
        <p className="mt-2 text-sm text-muted-foreground">Añade monturas para crear tu pedido</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4 py-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-muted">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="mt-1 text-sm font-semibold text-primary">${item.price.toFixed(2)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 bg-transparent"
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 bg-transparent"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 ml-auto text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="space-y-4 pt-4">
        <Separator />
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full" size="lg" onClick={handleWhatsAppOrder}>
          Enviar Pedido por WhatsApp
        </Button>
      </div>
    </div>
  )
}
