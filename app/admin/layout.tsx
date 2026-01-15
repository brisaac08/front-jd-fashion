"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/token")
        if (res.ok) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
          router.push("/login")
        }
      } catch {
        setIsAuthorized(false)
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-muted-foreground">Verificando sesión...</p>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  )
}

