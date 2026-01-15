"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home,
  Inbox,
  PlusCircle,
  Users,
  Menu,
  LogOut,
  Eye,
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
    icon: Eye,
    label: "Inactivos",
    href: "/admin/inactivos",
  },

  {
    icon: PlusCircle,
    label: "Agregar montura",
    href: "/admin/agregar-montura",
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
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("Error logging out:", error)
    } finally {
      router.push("/login")
    }
  }

  return (
    <aside className={cn(
      "border-r border-border bg-sidebar transition-all duration-300 overflow-hidden",
      isOpen ? "w-64" : "w-20"
    )}>
      <div className="flex h-full flex-col">
        {/* Menu Toggle */}
        <div className="flex h-20 items-center justify-center border-b">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Usuario - Hidden when collapsed */}
        {isOpen && (
          <div className="flex flex-col items-center gap-2 py-6 border-b">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Users className="h-8 w-8" />
            </div>
            <span className="text-sm font-medium">Administrador</span>
          </div>
        )}

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
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent"
                      : "hover:bg-sidebar-accent/50"
                  )}
                  title={isOpen ? undefined : item.label}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {isOpen && <span>{item.label}</span>}
                </Link>
              )
            })}
        </nav>

        {/* Logout Button - Hidden when collapsed */}
        {isOpen && (
          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-red-50 text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
