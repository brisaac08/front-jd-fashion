"use client"

import { ShoppingCart, Glasses } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"

export function Header() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Glasses className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold tracking-tight">Óptica JD Fashion</span>
        </Link>

        <Link href="/carrito">
          <Button variant="outline" size="icon" className="relative bg-transparent">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                variant="default"
                className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  )
}
