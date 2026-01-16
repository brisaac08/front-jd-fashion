export interface CarouselInfo {
  marca: string
  emoji: string
  titulo: string
  descripcion: string
}

export const carouselDatabase: Record<string, CarouselInfo> = {
  longchamp: {
    marca: "Longchamp",
    emoji: "🕶️",
    titulo: "Elegancia y estilo atemporal",
    descripcion: "Las monturas Longchamp destacan por su diseño refinado, femenino y cómodo, ideales para quienes buscan un accesorio sofisticado que complemente su imagen diaria sin perder funcionalidad.",
  },
  "marc-jacobs": {
    marca: "Marc Jacobs",
    emoji: "👓",
    titulo: "Diseño moderno con personalidad",
    descripcion: "Las monturas Marc Jacobs combinan formas contemporáneas y detalles distintivos, pensadas para quienes desean expresar su estilo con un toque creativo y actual.",
  },
  "michael-kors": {
    marca: "Michael Kors",
    emoji: "👁️",
    titulo: "Moda y versatilidad en cada detalle",
    descripcion: "Michael Kors ofrece monturas elegantes y modernas, con líneas limpias y acabados cuidados, perfectas para un look actual que se adapta tanto al uso diario como a ocasiones especiales.",
  },
  "montura-jd": {
    marca: "JD (Marca Propia)",
    emoji: "🏷️",
    titulo: "Estilo que se adapta a ti",
    descripcion: "Las monturas JD están pensadas para quienes buscan diseño, comodidad y tendencia, ofreciendo opciones versátiles que realzan tu imagen y se ajustan a diferentes estilos de vida.",
  },
  transitions: {
    marca: "Transitions",
    emoji: "🌗",
    titulo: "Lentes que se adaptan a la luz",
    descripcion: "Transitions se oscurecen automáticamente al exponerse al sol y se aclaran en interiores, brindando comodidad visual, protección UV y practicidad en todo momento.",
  },
  varilux: {
    marca: "Varilux",
    emoji: "👓",
    titulo: "Visión clara a todas las distancias",
    descripcion: "Varilux son lentes progresivos que permiten ver de lejos, intermedio y cerca sin líneas visibles, ofreciendo una experiencia visual cómoda y natural durante todo el día.",
  },
}

export function getCarouselInfo(filename: string): CarouselInfo | null {
  // Remover "publicidad-" y la extensión
  const normalized = filename
    .replace(/^publicidad-/i, "")
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()

  return carouselDatabase[normalized] || null
}
