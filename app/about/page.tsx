import Image from "next/image"

import { PhilosophyCard } from "@/components/philosophy-card"

const philosophyItems = [
  {
    icon: "glasses",
    title: "Cuidado visual responsable",
    description:
      "Ofrecemos monturas de calidad premium que protegen tu visión mientras expresas tu estilo.",
  },
  {
    icon: "sparkles",
    title: "Diseño para cada estilo",
    description:
      "Desde clásico hasta moderno, contamos con opciones para todos los gustos.",
  },
  {
    icon: "handshake",
    title: "Atención personalizada",
    description:
      "Nuestro equipo te asesorará para encontrar la montura perfecta.",
  },
  {
    icon: "shopping",
    title: "Compra fácil y segura",
    description:
      "Proceso de compra directo y confiable por WhatsApp.",
  },
]


export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-4rem)] w-full">
      <div className="flex-1 w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto w-full space-y-12 sm:space-y-16">

          {/* ================== TÍTULO ================== */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Sobre Nosotros
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Conoce quiénes somos y por qué en Óptica JD Fashion cuidamos tu visión con estilo.
            </p>
          </div>

          {/* ================== INTRO + IMAGEN ================== */}
          <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 items-center">

            {/* TEXTO */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Óptica JD Fashion
              </h2>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  En <strong>Óptica JD Fashion</strong> creemos que ver bien y verse bien
                  van de la mano. Somos una óptica moderna que combina salud visual,
                  estilo y accesibilidad, ofreciendo monturas de calidad para cada
                  personalidad y necesidad.
                </p>

                <p>
                  Nuestro objetivo es brindarte una experiencia de compra clara,
                  sencilla y confiable, donde puedas explorar y elegir tus gafas
                  favoritas sin complicaciones.
                </p>
              </div>
            </div>

            {/* IMAGEN DEL EQUIPO */}
            <div className="relative w-full aspect-video sm:aspect-4/3 md:aspect-auto md:h-90 overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
              <Image
                src="/about-me.jpg"
                alt="Equipo de trabajo Óptica JD Fashion"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* ================== VALORES ================== */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-2 sm:space-y-3">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Nuestra Filosofía
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Toca o pasa el mouse sobre las tarjetas para conocer más detalles
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-max">
              {philosophyItems.map((item) => (
                <PhilosophyCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}​
            </div>
          </div>

          {/* ================== WHATSAPP ================== */}
          <div className="rounded-lg sm:rounded-xl bg-secondary/20 p-6 sm:p-8 md:p-10 text-center space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Compra fácil y directa
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              En Óptica JD Fashion puedes armar tu pedido desde nuestra tienda online
              y finalizar la compra directamente por WhatsApp, recibiendo asesoría
              personalizada durante todo el proceso.
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}
