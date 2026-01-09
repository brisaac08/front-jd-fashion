// src/services/auth.ts
import { db } from "@/lib/db"

export async function getAdminByEmail(email: string) {
  return db.admin.findUnique({
    where: { email },
  })
}
