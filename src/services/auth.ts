import { apiFetch } from "@/lib/api"

interface LoginResponse {
  access_token: string
  token_type: string
}

export async function login(email: string, password: string) {
  return apiFetch<LoginResponse>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  )
}
