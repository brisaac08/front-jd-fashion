"use client"

import { useCallback, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Upload, X } from "lucide-react"

interface Props {
  initialUrl?: string | null
  onUploaded?: (url: string) => void
  uploadFn?: (file: File) => Promise<string>
  maxSizeBytes?: number
}

export default function ImageUploadInput({
  initialUrl = null,
  onUploaded,
  uploadFn,
  maxSizeBytes = 5 * 1024 * 1024, // 5MB
}: Props) {
  const [preview, setPreview] = useState<string | null>(initialUrl)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validate = useCallback(
    (f: File) => {
      setError(null)
      if (!f.type.startsWith("image/")) return "Tipo de archivo no permitido"
      if (f.size > maxSizeBytes) return `Archivo demasiado grande (máx ${Math.round(maxSizeBytes / 1024 / 1024)}MB)`
      return null
    },
    [maxSizeBytes]
  )

  const handleFile = useCallback(
    async (f: File | null) => {
      if (!f) return
      const err = validate(f)
      if (err) {
        setError(err)
        return
      }
      
      // Show preview immediately
      const url = URL.createObjectURL(f)
      setPreview(url)
      
      // Auto-upload if uploadFn is available
      if (uploadFn) {
        setUploading(true)
        try {
          const uploadedUrl = await uploadFn(f)
          setPreview(uploadedUrl)
          onUploaded?.(uploadedUrl)
        } catch (err) {
          setError(String(err))
          setPreview(null)
        } finally {
          setUploading(false)
        }
      }
    },
    [validate, uploadFn, onUploaded]
  )

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0] ?? null
    handleFile(f)
  }

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    handleFile(f)
  }

  const handleClear = () => {
    setPreview(initialUrl || null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
          "hover:border-primary hover:bg-primary/5",
          preview ? "border-border bg-muted/30" : "border-muted"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        {!preview && (
          <div className="flex flex-col items-center gap-3">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">Arrastra una imagen aquí</p>
            <p className="text-xs text-muted-foreground">o haz clic para seleccionar</p>
          </div>
        )}
        
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          onChange={onSelect} 
          className="hidden"
          disabled={uploading}
        />

        {preview && (
          <img src={preview} alt="preview" className="h-40 w-auto object-contain mx-auto rounded" />
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {preview && (
        <div className="flex gap-2 justify-end">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={handleClear}
            disabled={uploading}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Quitar
          </Button>
        </div>
      )}
    </div>
  )
}
