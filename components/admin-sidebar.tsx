"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Inbox,
  PlusCircle,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    icon: Home,
    label: "Panel",
    href: "/admin",
  },

  {
    icon: Inbox,
    label: "Inventario",
    href: "/admin/inventario",
  },

  {
    icon: PlusCircle,
    label: "Agregar montura",
    href: "/admin/agregar-producto",
  },

  // futuros (no visibles)
  {
    icon: Users,
    label: "Clientes",
    href: "/admin/clientes",
    hidden: true,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center justify-center border-b">
          <Home className="h-6 w-6" />
        </div>

        {/* Usuario */}
        <div className="flex flex-col items-center gap-2 py-6 border-b">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Users className="h-8 w-8" />
          </div>
          <span className="text-sm font-medium">Administrador</span>
        </div>

        {/* Menú */}
        <nav className="flex-1 space-y-1 p-4">
          {menuItems
            .filter((item) => !item.hidden)
            .map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium",
                    isActive
                      ? "bg-sidebar-accent"
                      : "hover:bg-sidebar-accent/50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
        </nav>
      </div>
    </aside>
  )
}
