import { Button } from '@/components/ui/button'
import { ImageIcon, PersonIcon, TrashIcon } from '@radix-ui/react-icons'
import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploadProps {
  onImageChange: (file: File | null) => void
  onImagePreviewChange?: (preview: string | null) => void
  onImageRemove?: () => void
  maxSize?: number
  accept?: Record<string, string[]>
  className?: string
  placeholder?: string
  showPersonIcon?: boolean
  children?: React.ReactNode
}

const ImageUpload = React.forwardRef<HTMLDivElement, ImageUploadProps>(
  (
    {
      onImageChange,
      onImagePreviewChange,
      onImageRemove,
      maxSize = 1000000,
      accept = { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
      className = '',
      placeholder = 'Upload Photo',
      showPersonIcon = true,
      children
    },
    ref
  ) => {
    const [preview, setPreview] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        const reader = new FileReader()
        try {
          reader.onload = () => {
            const result = reader.result as string
            setPreview(result)
            onImagePreviewChange?.(result)
          }
          reader.readAsDataURL(acceptedFiles[0])
          onImageChange(acceptedFiles[0])
        } catch (error) {
          console.error('Error reading file:', error)
          setPreview(null)
          onImagePreviewChange?.(null)
          onImageChange(null)
        }
      },
      [onImageChange, onImagePreviewChange]
    )

    const handleRemoveImage = (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation()
        e.preventDefault()
      }

      // Reset preview state
      setPreview(null)

      // Clear file input
      if (inputRef.current) {
        inputRef.current.value = ''
      }

      // Notify parent components
      onImagePreviewChange?.(null)
      onImageChange(null)
      onImageRemove?.()
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize,
      accept
    })

    return (
      <div
        {...getRootProps()}
        ref={ref}
        className={`flex items-center justify-center gap-4 h-full relative ${className}`}
      >
        {preview && (
          <div className="absolute inset-0">
            <img
              src={preview}
              alt="Uploaded image"
              className="absolute z-10 inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 w-full h-full z-20 group">
              <div className="hidden w-full h-full items-center justify-center bg-black/20 group-hover:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveImage()
                  }}
                  type="button"
                  className="bg-white/10 hover:bg-white/20"
                >
                  <TrashIcon width={32} height={32} className="text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <div>
          <input {...getInputProps()} type="file" ref={inputRef} />
        </div>

        {isDragActive ? (
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center">
            <ImageIcon width={32} height={32} className="text-gray-600" />
          </div>
        ) : (
          <div className="space-y-4 flex flex-col items-center justify-center">
            {showPersonIcon ?? (
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center">
                <PersonIcon width={32} height={32} className="text-gray-600" />
              </div>
            )}
            {children}
            <Button
              variant="outline"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                inputRef.current?.click()
              }}
              className="flex items-center gap-2"
            >
              <ImageIcon width={16} height={16} />
              {placeholder}
            </Button>
          </div>
        )}
      </div>
    )
  }
)

ImageUpload.displayName = 'ImageUpload'

export default ImageUpload
