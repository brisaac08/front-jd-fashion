export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-background to-muted/20 py-12 sm:py-16 md:py-20 lg:py-32">
      <div className="px-4 sm:px-6 md:px-8 mx-auto w-full">
        <div className="mx-auto max-w-2xl sm:max-w-3xl text-center space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            Encuentra tu estilo perfecto
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            Descubre nuestra colección exclusiva de monturas premium. Calidad excepcional y diseño sofisticado para
            realzar tu personalidad.
          </p>
        </div>
      </div>
      <div className=\"absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]\" />
    </section>
  )
}
