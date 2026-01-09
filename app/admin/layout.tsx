import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  )
}

