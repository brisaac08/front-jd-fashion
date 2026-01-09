export interface AdminProduct {
  id: string
  nombre: string
  marca: string | null
  precio: number
  stock: number
  descripcion: string | null
  imagen_url: string | null
  activo: boolean
}
