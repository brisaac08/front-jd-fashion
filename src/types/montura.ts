export interface Montura {
  id: string
  nombre: string
  marca: string
  precio: number
  stock: number | null
  descripcion: string | null
  imagen_url: string | null
  activo: boolean
  created_at: string
  color?: string
  material?: string
  genero?: string
  estilo?: string
  tipo?: string
  forma?: string
}
