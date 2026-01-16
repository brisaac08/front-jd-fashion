"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminProfileMenu() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" })
      if (res.ok) {
        router.push("/login")
      }
    } catch (err) {
      console.error("Error logging out:", err)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="flex items-center gap-2 text-red-600 hover:bg-red-50"
      title="Cerrar sesión"
    >
      <LogOut className="h-5 w-5" />
      <span>Cerrar sesión</span>
    </Button>
  )
}
