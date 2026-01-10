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

export interface CreateProductData {
  nombre: string
  marca?: string
  precio: number
  stock: number
  descripcion?: string
  imagen_url?: string
  activo?: boolean
}

export interface UpdateProductData {
  nombre?: string
  marca?: string
  precio?: number
  stock?: number
  descripcion?: string
  imagen_url?: string
  activo?: boolean
}