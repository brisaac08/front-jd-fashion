export function formatPrice(price?: number | null): string {
  if (!price && price !== 0) {
    return "0.00"
  }
  return Number(price).toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
