import Image from "next/image"
import "./loading-glasses.css"

export function LoadingGlasses() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      <div className="flex flex-col items-center gap-8">
        {/* Load logo con efecto shimmer */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          <Image
            src="/load-logo.png"
            alt="Cargando"
            width={384}
            height={384}
            className="w-full h-full object-contain filter drop-shadow-lg"
            priority
          />

          {/* Efecto shimmer animado */}
          <div className="absolute inset-0 shimmer-effect" />
        </div>

        {/* Texto */}
        <div className="text-center">
          <p className="text-lg sm:text-xl font-semibold text-stone-700 animate-pulse">
            Cargando
          </p>
        </div>
      </div>
    </div>
  )
}
