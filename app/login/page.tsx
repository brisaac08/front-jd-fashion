import { AdminLoginForm } from "@/components/admin/admin-login-form"

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 bg-linear-to-b from-muted/20 to-background">
      <AdminLoginForm />
    </main>
  )
}
