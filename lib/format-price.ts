export function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
