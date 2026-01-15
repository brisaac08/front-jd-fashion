"use client"

import { Input } from "@/components/ui/input"
import { forwardRef } from "react"

interface PriceInputProps extends React.HTMLAttributes<HTMLInputElement> {
  value: number | string
  onChange: (value: number) => void
  placeholder?: string
}

export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  ({ value, onChange, placeholder, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value

      // Solo permitir números y un punto decimal
      const cleaned = inputValue.replaceAll(/[^0-9.]/g, "")

      // Limitar a un solo punto decimal
      const parts = cleaned.split(".")
      const finalValue =
        parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned

      const numValue = Number.parseFloat(finalValue)
      if (!Number.isNaN(numValue) || finalValue === "") {
        onChange(finalValue === "" ? 0 : numValue)
      }
    }

    // Solo mostrar el valor si es mayor a 0
    const displayValue = value && Number(value) > 0 ? value : ""

    return (
      <Input
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleChange}
        inputMode="decimal"
        placeholder={placeholder || ""}
        className="placeholder:text-transparent"
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    )
  }
)

PriceInput.displayName = "PriceInput"
