"use client"

export function Footer() {
  const phoneNumber = "573245704999" // SIN +
  const message = "Hola, me gustaría saber más sobre sus productos"
  const encodedMessage = encodeURIComponent(message)

  // ✅ FORMATO CORRECTO PARA WHATSAPP CON NÚMERO FIJO
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-lg font-semibold">
            ¿Necesitas ayuda?
          </h3>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600"
          >
            💬 Comunícate con nosotros por WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
