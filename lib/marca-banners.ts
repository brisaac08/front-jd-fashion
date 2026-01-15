// Mapeo de marcas a sus banners correspondientes
export const marcaBanners: Record<string, string> = {
  "Carrera": "/banner-carrera.jpg",
  "Tommy Hilfiger": "/banner-tommy.jpg",
  "Lacoste": "/banner-lacoste.jpg",
  "Ray-Ban": "/banner-ray-ban.jpg",
  "Vogue": "/banner-vogue.jpg",
  "Longchamp": "/banner-longchamp.png",
  "Calvin Klein": "/banner-calvin-klein.jpg",
  "Victory": "/banner-victory.jpg",
  "Marc Jacobs": "/banner-marc-jacobs.jpg",
  "Michael Kors": "/banner-michael-kors.png.jpeg",
}

export function getMarcaBanner(marca?: string): string | undefined {
  if (!marca) return undefined
  return marcaBanners[marca]
}
