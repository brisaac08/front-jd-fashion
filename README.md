## 🧩 Descripción técnica

### 🛍️ Carrito de compras

#### CartProvider

`CartProvider` es un **contexto global** que envuelve toda la aplicación (definido en `layout.tsx`) y se encarga de gestionar el estado del carrito de compras.

**Responsabilidades principales:**

- Mantener la lista de productos agregados al carrito  
- Controlar las cantidades de cada producto  
- Calcular el total del pedido  
- Exponer acciones para manipular el carrito  

**Acciones disponibles:**

- `addItem` → agrega un producto al carrito  
- `removeItem` → elimina un producto del carrito  
- `updateQuantity` → actualiza la cantidad de un producto  
- `total` → valor total del pedido  

---

#### useCart()

`useCart()` es un **hook personalizado** que permite acceder fácilmente al estado y a las acciones del carrito desde cualquier componente de la aplicación, como:

- `Header`
- `ProductCard`
- `StoriesFeed`
- `CartPage`

---

### 🔔 Notificaciones

#### useToast() / Toaster

El proyecto incluye un **sistema global de notificaciones (toasts)** basado en **shadcn/ui**.

- `Toaster` se monta una sola vez en `layout.tsx`
- `useToast()` permite disparar notificaciones desde cualquier componente

Se utiliza para mostrar mensajes como:

- Producto agregado al carrito  
- Producto eliminado  
- Cambios en cantidades  
- Confirmaciones visuales al usuario  

---

### 📱 Checkout por WhatsApp

Desde la ruta `/carrito`, el sistema de checkout realiza el siguiente flujo:

1. Muestra el resumen completo del pedido  
2. Permite modificar cantidades o eliminar productos  
3. Recoge los datos del cliente (nombre, contacto, observaciones)  
4. Construye automáticamente un mensaje con:
   - Lista de productos  
   - Cantidades  
   - Precio total  
5. Redirige al usuario a WhatsApp con el mensaje del pedido listo para enviar  

Este flujo elimina la necesidad de pagos integrados y facilita la conversión directa.

---

## 🛠️ Tecnologías utilizadas

- Next.js  
- React  
- TypeScript  
- Tailwind CSS  
- shadcn/ui  
- clsx  
- tailwind-merge  

---

## ▶️ Instalación y ejecución

### Requisitos previos

- Node.js >= 18  
- pnpm (recomendado) o npm / yarn  

---

### Instalación de dependencias

Con pnpm:

```bash
pnpm install
```

O con npm

```bash
npm install

```
### Correr la aplicación

Con npm:

```bash
pnpm run dev

```
O con npm

```bash
npm run dev

```

