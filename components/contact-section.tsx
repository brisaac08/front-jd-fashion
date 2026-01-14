"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react"

interface ContactInfo {
  icon: typeof Phone | typeof Clock | typeof MapPin | typeof Instagram | typeof Facebook
  title: string
  value: string
  description?: string
  action?: () => void
  actionText?: string
}

export function ContactSection() {
  const contactInfo: ContactInfo[] = [
    {
      icon: Phone,
      title: "Teléfono",
      value: "324 6718202",
      action: () => { globalThis.location.href = "tel:3246718202" },
      actionText: "Llamar"
    },
    {
      icon: Clock,
      title: "Horarios de Atención",
      value: "8:00 AM - 1:00 PM • 2:00 PM - 6:00 PM"
    }
  ]

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/opticajdfashion/",
      color: "text-pink-600"
    },
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=100063850763137",
      color: "text-blue-600"
    }
  ]

  return (
    <section className="w-full py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Título */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Contacto</h2>
          <p className="text-muted-foreground text-lg">Estamos aquí para ayudarte</p>
        </div>

        {/* Grid con información de contacto y mapa */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Información de contacto - IZQUIERDA */}
          <div className="space-y-6">
            {/* Tarjetas de contacto */}
            <div className="space-y-3">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon
                return (
                  <Card key={`contact-${info.title}`} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-stone-100 shrink-0">
                        <Icon className="h-5 w-5 text-stone-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-stone-900">{info.title}</h3>
                        <p className="text-sm font-medium text-stone-700 mt-1">{info.value}</p>
                        {info.action && (
                          <Button
                            size="sm"
                            className="mt-2 h-8 text-xs bg-stone-700 hover:bg-stone-800 text-white"
                            onClick={info.action}
                          >
                            {info.actionText}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Redes sociales */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Síguenos</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                        title={social.name}
                      >
                        <div className="p-2 rounded-lg bg-white border border-stone-200 group-hover:border-stone-400 transition-colors">
                          <Icon className={`h-5 w-5 ${social.color}`} />
                        </div>
                      </a>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* UBICACIÓN + MAPA - DERECHA (2 columnas) */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Dirección */}
              <CardContent className="p-4 flex items-start gap-3 bg-white border-b">
                <div className="p-2 rounded-lg bg-stone-100 shrink-0">
                  <MapPin className="h-5 w-5 text-stone-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-stone-900 mb-1">Ubicación</h3>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    Cra. 9 #16a23, Centro, Valledupar, Cesar, Colombia
                  </p>
                </div>
              </CardContent>

              {/* Mapa de Google Maps */}
              <div className="overflow-hidden flex-1" style={{ minHeight: "300px" }}>
                <iframe
                  title="Ubicación de Óptica JD Fashion - Valledupar"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.7862450000004!2d-73.25622!3d10.48333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e888b8b8b8b8b8d%3A0x8b8b8b8b8b8b8b8b!2sCra.%209%20%2316a23%2C%20Valledupar%2C%20Cesar!5e0!3m2!1ses!2sco!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: "none", display: "block" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
