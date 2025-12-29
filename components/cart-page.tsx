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

interface CustomerData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  needsShipping: boolean
}

export function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()
  const { toast } = useToast()
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    needsShipping: false,
  })

  const shippingCost = customerData.needsShipping ? 15.0 : 0
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
      message += `\n📷 ${item.name}\n`
      message += `Referencia: ${item.id}\n`
      message += `Cantidad: ${item.quantity}\n`
      message += `Precio unitario: $${item.price.toFixed(2)}\n`
      message += `Subtotal: $${(item.price * item.quantity).toFixed(2)}\n`
      message += `Imagen: ${item.image}\n`
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
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    toast({
      title: "Pedido enviado",
      description: "Redirigiendo a WhatsApp...",
    })
  }

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground text-lg mb-4">Tu carrito está vacío</p>
            <Button asChild>
              <a href="/">Explorar Productos</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Productos en el Carrito</CardTitle>
              <CardDescription>Revisa y ajusta las cantidades antes de continuar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-balance">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Ref: {item.id}</p>
                    <p className="text-lg font-bold text-primary mt-2">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
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
            <CardHeader>
              <CardTitle>Datos del Cliente</CardTitle>
              <CardDescription>Completa la información para procesar tu pedido</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input
                      id="firstName"
                      required
                      value={customerData.firstName}
                      onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      required
                      value={customerData.lastName}
                      onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={customerData.email}
                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="needsShipping"
                    checked={customerData.needsShipping}
                    onChange={(e) => setCustomerData({ ...customerData, needsShipping: e.target.checked })}
                    className="rounded border-input"
                  />
                  <Label htmlFor="needsShipping" className="font-normal cursor-pointer">
                    Necesito envío a domicilio (+${shippingCost.toFixed(2)})
                  </Label>
                </div>

                {customerData.needsShipping && (
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección de Envío</Label>
                    <Textarea
                      id="address"
                      rows={3}
                      value={customerData.address}
                      onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                      placeholder="Calle, número, ciudad, código postal..."
                    />
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} productos)
                  </span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="font-semibold">
                    {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "Retiro en tienda"}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${finalTotal.toFixed(2)}</span>
              </div>

              <Button className="w-full gap-2" size="lg" onClick={handleSubmit}>
                <Send className="h-5 w-5" />
                Enviar Pedido a WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground text-center text-balance">
                Al enviar, se abrirá WhatsApp con todos los detalles del pedido para coordinar el pago
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
