"use client"

import { useState } from "react"
import {
  Glasses,
  Sparkles,
  HeartHandshake,
  ShoppingBag,
  LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const ICONS: Record<string, LucideIcon> = {
  glasses: Glasses,
  sparkles: Sparkles,
  handshake: HeartHandshake,
  shopping: ShoppingBag,
}

interface PhilosophyCardProps {
  readonly icon: string
  readonly title: string
  readonly description: string
}

export function PhilosophyCard({
  icon,
  title,
  description,
}: PhilosophyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = ICONS[icon]

  const handleMouseEnter = () => setIsFlipped(true)
  const handleMouseLeave = () => setIsFlipped(false)
  const toggleFlip = () => setIsFlipped((v) => !v)

  return (
    <button
      className="h-full w-full cursor-pointer group p-0 bg-transparent border-0 text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={(e) => {
        e.preventDefault()
        toggleFlip()
      }}
      aria-label={`${title}. Pasa el mouse para ver más detalles`}
    >
      {/* 3D Flip Container - NOT the button itself */}
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          perspective: "1000px",
          pointerEvents: "none",
        }}
      >
        {/* FRONT - Icon + Title */}
        <div
          className="w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
            <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center justify-center gap-4 h-full">
              {Icon && (
                <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-stone-700 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
              )}
              <div className="space-y-1 sm:space-y-2">
                <p className="font-semibold text-sm sm:text-base leading-snug">
                  {title}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Pasa el mouse para más detalles
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BACK - Title + Description */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
            <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center justify-center gap-3 h-full">
              {Icon && (
                <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-stone-700 shrink-0" />
              )}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base text-foreground">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </button>
  )
}
