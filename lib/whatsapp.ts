export function getProductWhatsappLink({
  productName,
  price,
}: {
  productName: string
  price?: number
}) {
  const phoneNumber = "573245704999"

  const message = `
Hola 👋
Estoy interesado en esta montura:

� ${productName}

¿Me puedes dar más información?
  `.trim()

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
