"use client"

import Link from "next/link"
import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        {/* Grid: 4 columnas en desktop, 1 en mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* COLUMNA 1: CONTACTO */}
          <div className="space-y-6">
            {/* Teléfono */}
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-stone-100 h-fit">
                <Phone className="h-5 w-5 text-stone-700" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-stone-900">Teléfono</h4>
                <p className="text-sm text-stone-700 mt-1">324 6718202</p>
                <a
                  href="tel:3246718202"
                  className="text-xs text-stone-600 hover:text-stone-900 transition-colors mt-2 inline-block"
                >
                  Llamar →
                </a>
              </div>
            </div>

            {/* Horarios */}
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-stone-100 h-fit">
                <Clock className="h-5 w-5 text-stone-700" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-stone-900">Horarios</h4>
                <p className="text-xs text-stone-700 mt-1">
                  8:00 AM - 1:00 PM<br />
                  2:00 PM - 6:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: UBICACIÓN */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-stone-100 h-fit">
                <MapPin className="h-5 w-5 text-stone-700" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-stone-900">Ubicación</h4>
                <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                  Cra. 9 #16a23<br />
                  Centro, Valledupar<br />
                  Cesar, Colombia
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA 3: REDES SOCIALES */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-stone-900">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/opticajdfashion/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
                title="Instagram"
              >
                <Instagram className="h-5 w-5 text-pink-600" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100063850763137"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
                title="Facebook"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
              </a>
            </div>
          </div>

          {/* COLUMNA 4: MAPA */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-stone-900 mb-3">Ver en Google Maps</h4>
            <div className="rounded-lg overflow-hidden shadow-sm border border-stone-200" style={{ height: "180px" }}>
              <iframe
                title="Ubicación de Óptica JD Fashion - Valledupar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.7862450000004!2d-73.25622!3d10.48333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e888b8b8b8b8b8d%3A0x8b8b8b8b8b8b8b8b!2sCra.%209%20%2316a23%2C%20Valledupar%2C%20Cesar!5e0!3m2!1ses!2sco!4v1234567890"
                width="100%"
                height="180"
                style={{ border: "none", display: "block" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-200 mt-8 pt-8">
          <p className="text-xs text-stone-600 text-center">
            © 2025 Óptica JD Fashion. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
