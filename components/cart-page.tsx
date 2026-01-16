"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/format-price"

interface CustomerData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  needsShipping: boolean
}

export function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const { toast } = useToast()
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    needsShipping: false,
  })

  const shippingCost = customerData.needsShipping ? 15 : 0
  const finalTotal = total + shippingCost

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Añade productos antes de enviar el pedido",
        variant: "destructive",
      })
      return
    }

    if (!customerData.firstName || !customerData.lastName || !customerData.email || !customerData.phone) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    let message = `*NUEVO PEDIDO - ÓPTICA JD FASHION*\n\n`
    message += `*DATOS DEL CLIENTE*\n`
    message += `Nombre: ${customerData.firstName} ${customerData.lastName}\n`
    message += `Email: ${customerData.email}\n`
    message += `Teléfono: ${customerData.phone}\n`

    if (customerData.needsShipping && customerData.address) {
      message += `Dirección de envío: ${customerData.address}\n`
    }

    message += `\n*PRODUCTOS*\n`
    message += `━━━━━━━━━━━━━━━━━━\n`

    items.forEach((item) => {
      const price = item.price || 0
      message += `\n*${item.name}*\n`
      message += `Referencia: ${item.quantity}\n`
      message += `Cantidad: ${item.quantity}\n`
      message += `Precio unitario: $${price.toFixed(2)}\n`
      message += `Subtotal: $${(price * item.quantity).toFixed(2)}\n`
      message += `━━━━━━━━━━━━━━━━━━\n`
    }) 

    message += `\n*RESUMEN DEL PEDIDO*\n`
    message += `Subtotal: $${total.toFixed(2)}\n`

    if (shippingCost > 0) {
      message += `Envío: $${shippingCost.toFixed(2)}\n`
    } else {
      message += `Envío: Retiro en tienda\n`
    }

    message += `*TOTAL: $${finalTotal.toFixed(2)}*\n\n`
    message += `_Confirmar método de pago con el cliente_`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${573246718202}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    toast({
      title: "Pedido enviado",
      description: "Redirigiendo a WhatsApp...",
    })

    // Limpiar el carrito después de enviar el pedido
    clearCart()
  }

  if (items.length === 0) {
    return (
      <main className="flex flex-col min-h-[calc(100vh-4rem)] w-full px-4 sm:px-6 md:px-8">
        <div className="flex-1 flex items-center justify-center py-12 sm:py-16">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16">
              <p className="text-muted-foreground text-base sm:text-lg mb-4 text-center">Tu carrito está vacío</p>
              <Button asChild>
                <a href="/">Explorar Productos</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col min-h-[calc(100vh-4rem)] w-full">
      <div className="flex-1 w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Finalizar Pedido</h1>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 auto-rows-max">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-xl sm:text-2xl">Productos en el Carrito</CardTitle>
                  <CardDescription className="text-sm">Revisa y ajusta las cantidades antes de continuar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 sm:gap-4 pb-4 border-b last:border-0">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted shrink-0 flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name || "Producto"} fill className="object-contain" sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px" />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col">
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Ref: {item.id}</p>
                        <p className="text-base sm:text-lg font-bold text-stone-700 mt-auto">${formatPrice(item.price || 0)}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-xl sm:text-2xl">Datos del Cliente</CardTitle>
                  <CardDescription className="text-sm">Completa la información para procesar tu pedido</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm">Nombre *</Label>
                        <Input
                          id="firstName"
                          required
                          value={customerData.firstName}
                          onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm">Apellido *</Label>
                        <Input
                          id="lastName"
                          required
                          value={customerData.lastName}
                          onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={customerData.email}
                        onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                        className="text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm">Teléfono *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                        className="text-sm"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="needsShipping"
                        checked={customerData.needsShipping}
                        onChange={(e) => setCustomerData({ ...customerData, needsShipping: e.target.checked })}
                        className="rounded border-input cursor-pointer"
                      />
                      <Label htmlFor="needsShipping" className="font-normal cursor-pointer text-sm">
                        Necesito envío a domicilio (+${formatPrice(shippingCost)})
                      </Label>
                    </div>

                    {customerData.needsShipping && (
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm">Dirección de Envío</Label>
                        <Textarea
                          id="address"
                          rows={3}
                          value={customerData.address}
                          onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                          placeholder="Calle, número, ciudad, código postal..."
                          className="text-sm"
                        />
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} productos)
                      </span>
                      <span className="font-semibold">${formatPrice(total)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span className="font-semibold">
                        {shippingCost > 0 ? `$${formatPrice(shippingCost)}` : "Retiro en tienda"}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-base sm:text-lg font-bold">
                    <span>Total</span>
                    <span className="text-stone-700">${formatPrice(finalTotal)}</span>
                  </div>

                  <Button className="w-full gap-2 sm:text-base" size="lg" onClick={handleSubmit}>
                    <Send className="h-4 w-4" />
                    Enviar Pedido
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Se abrirá WhatsApp con los detalles del pedido
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
