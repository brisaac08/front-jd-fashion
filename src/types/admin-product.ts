/* =======================
   MODELO PRINCIPAL
======================= */
export interface AdminProduct {
  id: string
  nombre: string
  marca?: string
  precio: number
  stock?: number
  descripcion?: string
  imagen_url?: string
  activo: boolean

  // 🆕 NUEVOS CAMPOS
  color?: string
  material?: string
  genero?: string
  estilo?: string
  tipo?: string
  forma?: string

  created_at?: string
}

/* =======================
   CREAR PRODUCTO
======================= */
export interface CreateProductData {
  nombre: string
  marca?: string
  precio: number
  stock: number
  descripcion?: string
  imagen_url?: string
  activo?: boolean

  // 🆕 NUEVOS CAMPOS
  color?: string
  material?: string
  genero?: string
  estilo?: string
  tipo?: string
  forma?: string
}

/* =======================
   ACTUALIZAR PRODUCTO
======================= */
export interface UpdateProductData {
  nombre?: string
  marca?: string
  precio?: number
  stock?: number
  descripcion?: string
  imagen_url?: string
  activo?: boolean

  // 🆕 NUEVOS CAMPOS
  color?: string
  material?: string
  genero?: string
  estilo?: string
  tipo?: string
  forma?: string
}
