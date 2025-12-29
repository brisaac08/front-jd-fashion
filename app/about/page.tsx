import Image from "next/image"
import {
  Glasses,
  HeartHandshake,
  Sparkles,
  ShoppingBag,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <section className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">

        {/* ================== TÍTULO ================== */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conoce quiénes somos y por qué en Óptica JD Fashion cuidamos tu visión con estilo.
          </p>
        </div>

        {/* ================== INTRO + IMAGEN ================== */}
        <div className="mb-16 grid gap-10 md:grid-cols-2 items-center">

          {/* TEXTO */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              👓 Óptica JD Fashion
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              En <strong>Óptica JD Fashion</strong> creemos que ver bien y verse bien
              van de la mano. Somos una óptica moderna que combina salud visual,
              estilo y accesibilidad, ofreciendo monturas de calidad para cada
              personalidad y necesidad.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Nuestro objetivo es brindarte una experiencia de compra clara,
              sencilla y confiable, donde puedas explorar y elegir tus gafas
              favoritas sin complicaciones.
            </p>
          </div>

          {/* IMAGEN DEL EQUIPO */}
          <div className="relative h-[360px] w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/about-me.jpg" // <-- IMAGEN DESDE /public
              alt="Equipo de trabajo Óptica JD Fashion"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* ================== VALORES ================== */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Nuestra Filosofía
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Glasses className="mx-auto mb-3 h-8 w-8 text-primary" />
                <p className="font-medium">Cuidado visual responsable</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary" />
                <p className="font-medium">Diseño para cada estilo</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <HeartHandshake className="mx-auto mb-3 h-8 w-8 text-primary" />
                <p className="font-medium">Atención personalizada</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-primary" />
                <p className="font-medium">Compra fácil y segura</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ================== WHATSAPP ================== */}
        <div className="rounded-xl bg-secondary/20 p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Compra fácil y directa
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            En Óptica JD Fashion puedes armar tu pedido desde nuestra tienda online
            y finalizar la compra directamente por WhatsApp, recibiendo asesoría
            personalizada durante todo el proceso.
          </p>
        </div>

      </div>
    </section>
  )
}
