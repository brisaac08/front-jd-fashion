'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CoverflowSlide {
  id: string
  title: string
  description: string
  image: string
}

interface GlassesCoverflowProps {
  readonly slides: readonly CoverflowSlide[]
}

export function GlassesCoverflow({ slides }: Readonly<GlassesCoverflowProps>) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = React.useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-avance cada 3 segundos
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    // Reiniciar el auto-play cuando el usuario interactúa
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 3000)
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % slides.length)
  }

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length)
  }

  // Extraer nombre normalizado del archivo de imagen
  const getSlideNameFromImage = (imagePath: string): string => {
    const normalized = imagePath
      .replace(/^publicidad-/i, "")
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
    return normalized
  }

  // Navegar a la página de publicidad
  const handleSlideClick = (index: number) => {
    const slide = slides[index]
    const slideName = getSlideNameFromImage(slide.image)
    router.push(`/publicidad/${slideName}`)
  }

  // Valores responsivos
  const slideSpacing = isMobile ? 200 : 380
  const rotateDeg = isMobile ? -20 : -30
  const translateZ = isMobile ? -200 : -300
  const maxImageWidth = isMobile ? 280 : 420

  const getSlideStyle = (index: number) => {
    // Calcular diferencia circular (para efecto infinito)
    let diff = index - currentIndex
    
    // Ajustar para que la diferencia sea la más corta en el círculo
    if (diff > slides.length / 2) {
      diff -= slides.length
    } else if (diff < -slides.length / 2) {
      diff += slides.length
    }
    
    const isActive = diff === 0

    let transform = `translateX(${diff * slideSpacing}px) translateZ(${isActive ? 0 : translateZ}px) rotateY(${diff * rotateDeg}deg)`
    let opacity = 1 - Math.abs(diff) * 0.25
    let zIndex = 10 - Math.abs(diff)

    if (Math.abs(diff) > 2) {
      opacity = 0
    }

    return {
      transform,
      opacity,
      zIndex,
      filter: isActive ? 'brightness(1)' : 'brightness(0.7)',
    }
  }

  return (
    <section className="w-full bg-linear-to-br from-slate-50 via-white to-slate-50 py-4 sm:py-6 md:py-8">
      <div className="px-4 sm:px-6 md:px-8 mx-auto w-full">
        <div className="space-y-6 sm:space-y-8">
          {/* Carousel */}
          <div className="relative h-95 sm:h-120 md:h-150" style={{ perspective: '1200px' }}>
            <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {slides.map((slide: CoverflowSlide, index: number) => (
                <button
                  key={slide.id}
                  onClick={() => handleSlideClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleSlideClick(index)
                    }
                  }}
                  className="absolute transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    ...getSlideStyle(index),
                    width: '100%',
                    maxWidth: `${maxImageWidth}px`,
                    height: 'auto',
                  } as React.CSSProperties}
                  aria-label={`Ver ${slide.title}`}
                >
                  <div className="w-full overflow-hidden">
                    <div className="relative w-full rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl hover:shadow-xl sm:hover:shadow-3xl transition-shadow overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={420}
                        height={480}
                        className="w-full h-auto object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 rounded-full hover:bg-white shadow-lg h-8 w-8 sm:h-10 sm:w-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            </Button>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 rounded-full hover:bg-white shadow-lg h-8 w-8 sm:h-10 sm:w-10"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </Button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-1.5 sm:gap-2">
            {slides.map((_: CoverflowSlide, index: number) => (
              <button
                key={`slide-dot-${_?.id || index}`}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 sm:w-10 sm:h-2.5 bg-slate-800'
                    : 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
