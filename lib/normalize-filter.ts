/**
 * Normaliza un string para comparaciones de filtro
 * - Convierte a minúsculas
 * - Remueve espacios
 * - Maneja variantes: dama/mujer/damas, caballero/hombre/caballeros
 */
export function normalizeFilterValue(value: string): string {
  let normalized = value.toLowerCase().replace(/\s+/g, "")

  // Variantes de dama/mujer/damas -> dama
  if (normalized === "dama" || normalized === "damas" || normalized === "mujer" || normalized === "mujeres") {
    return "dama"
  }

  // Variantes de caballero/hombre/caballeros -> caballero
  if (normalized === "caballero" || normalized === "caballeros" || normalized === "hombre" || normalized === "hombres") {
    return "caballero"
  }

  // Variantes masculino/femenino (Deportivo/Deportiva, Clásico/Clásica, Elegante, Moderno/Moderna)
  // Remueve la 'a' final si existe para normalizar
  if (normalized.endsWith("a")) {
    // deportiva -> deportiv, clásica -> clásic, moderna -> modern, etc.
    normalized = normalized.slice(0, -1)
  }

  return normalized
}

/**
 * Compara dos valores normalizados
 */
export function compareNormalized(value1: string, value2: string): boolean {
  return normalizeFilterValue(value1) === normalizeFilterValue(value2)
}

/**
 * Busca sin espacios
 */
export function normalizeSearch(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "")
}
