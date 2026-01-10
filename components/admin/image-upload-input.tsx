"use client"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

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
    (f: File | null) => {
      if (!f) return
      const err = validate(f)
      if (err) {
        setError(err)
        return
      }
      setFile(f)
      const url = URL.createObjectURL(f)
      setPreview(url)
    },
    [validate]
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

  async function doUpload() {
    if (!file) return
    if (!uploadFn) return
    setUploading(true)
    try {
      const url = await uploadFn(file)
      onUploaded?.(url)
    } catch (err) {
      setError(String(err))
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={cn(
          "border-dashed border-2 rounded p-4 text-center",
          preview ? "border-border" : "border-muted"
        )}
      >
        <p className="text-sm">Arrastra una imagen aquí o selecciona</p>
        <input type="file" accept="image/*" onChange={onSelect} className="mt-2" />
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </div>

      {preview && (
        <div className="mt-2">
          <img src={preview} alt="preview" className="h-36 w-auto object-contain rounded" />
        </div>
      )}

      <div className="flex gap-2 justify-end mt-2">
        <Button variant="outline" onClick={() => { setFile(null); setPreview(initialUrl); setError(null) }}>
          Quitar
        </Button>
        <Button disabled={!file || !uploadFn || uploading} onClick={doUpload}>
          {uploading ? "Subiendo..." : "Subir imagen"}
        </Button>
      </div>
    </div>
  )
}
