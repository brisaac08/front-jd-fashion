export function formatGender(gender?: string): string | undefined {
  if (!gender) return undefined
  
  const lower = gender.toLowerCase().trim()
  
  if (lower === "mujer" || lower === "femenino" || lower === "dama") {
    return "Dama"
  }
  if (lower === "hombre" || lower === "masculino" || lower === "caballero") {
    return "Caballero"
  }
  if (lower === "unisex") {
    return "Unisex"
  }
  
  // Retorna el original si no coincide con ninguna opción
  return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()
}
