"use client"

import { useEffect, useState } from "react"
import { GlassesCoverflow } from "./glasses-coverflow"

interface Slide {
  id: string
  title: string
  description: string
  image: string
}

export function StoriesFeed() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/publicidad/slides")
        if (res.ok) {
          const data = await res.json()
          setSlides(data)
        }
      } catch (error) {
        console.error("Error al cargar slides:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  if (loading) {
    return <div className="h-150 bg-slate-100 animate-pulse" />
  }

  if (!slides.length) {
    return null
  }

  return <GlassesCoverflow slides={slides} />
}
