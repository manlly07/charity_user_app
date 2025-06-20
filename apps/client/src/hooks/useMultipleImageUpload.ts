import { useCallback, useState } from 'react'

interface ImageData {
  file: File | null
  preview: string | null
  error?: string | null
}

interface UseMultipleImageUploadOptions {
  maxSize?: number
  allowedTypes?: string[]
  required?: string[]
  form?: any // React Hook Form instance
}

export const useMultipleImageUpload = (options: UseMultipleImageUploadOptions = {}) => {
  const {
    maxSize = 5000000,
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    required = [],
    form
  } = options

  const [images, setImages] = useState<Record<string, ImageData>>({})

  // Validate file
  const validateFile = useCallback(
    (file: File | null, key: string): string | null => {
      if (!file) {
        return required.includes(key) ? `${key} is required` : null
      }

      if (file.size > maxSize) {
        return `File size must be less than ${Math.round(maxSize / 1000000)}MB`
      }

      if (!allowedTypes.includes(file.type)) {
        return `File type must be one of: ${allowedTypes.join(', ')}`
      }

      return null
    },
    [maxSize, allowedTypes, required]
  )

  // Handle image change
  const handleImageChange = useCallback(
    (key: string) => (file: File | null) => {
      const error = validateFile(file, key)

      setImages((prev) => ({
        ...prev,
        [key]: {
          file,
          preview: prev[key]?.preview || null,
          error
        }
      }))

      // Update React Hook Form if provided
      if (form) {
        form.setValue(key, file, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })

        if (error) {
          form.setError(key, { type: 'manual', message: error })
        } else {
          form.clearErrors(key)
        }
      }
    },
    [validateFile, form]
  )

  // Handle preview change
  const handlePreviewChange = useCallback(
    (key: string) => (preview: string | null) => {
      setImages((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          preview
        }
      }))
    },
    []
  )

  // Handle image remove
  const handleImageRemove = useCallback(
    (key: string) => () => {
      setImages((prev) => ({
        ...prev,
        [key]: {
          file: null,
          preview: null,
          error: null
        }
      }))

      // Update React Hook Form if provided
      if (form) {
        form.resetField(key)
        form.trigger(key) // Re-validate
      }
    },
    [form]
  )

  // Reset specific image
  const resetImage = useCallback(
    (key: string) => {
      handleImageRemove(key)()
    },
    [handleImageRemove]
  )

  // Reset all images
  const resetAllImages = useCallback(() => {
    const keys = Object.keys(images)
    const resetData: Record<string, ImageData> = {}

    keys.forEach((key) => {
      resetData[key] = {
        file: null,
        preview: null,
        error: null
      }
    })

    setImages(resetData)

    // Update React Hook Form if provided
    if (form) {
      keys.forEach((key) => {
        form.resetField(key)
      })
    }
  }, [images, form])

  // Get image data for a specific key
  const getImageData = useCallback(
    (key: string): ImageData => {
      return images[key] || { file: null, preview: null, error: null }
    },
    [images]
  )

  // Get all files as FormData
  const getFormData = useCallback(
    (additionalFields: Record<string, any> = {}): FormData => {
      const formData = new FormData()

      Object.entries(images).forEach(([key, data]) => {
        if (data.file) {
          formData.append(key, data.file)
        }
      })

      Object.entries(additionalFields).forEach(([key, value]) => {
        formData.append(key, value)
      })

      return formData
    },
    [images]
  )

  // Get validation status
  const getValidationStatus = useCallback(() => {
    const hasErrors = Object.values(images).some((data) => data.error)
    const missingRequired = required.filter((key) => !images[key]?.file)

    return {
      isValid: !hasErrors && missingRequired.length === 0,
      hasErrors,
      missingRequired,
      errors: Object.entries(images)
        .filter(([_, data]) => data.error)
        .reduce((acc, [key, data]) => ({ ...acc, [key]: data.error }), {})
    }
  }, [images, required])

  // Get summary
  const getSummary = useCallback(() => {
    const totalFiles = Object.values(images).filter((data) => data.file).length
    const totalSize = Object.values(images)
      .filter((data) => data.file)
      .reduce((sum: number, data) => sum + (data.file?.size || 0), 0)

    return {
      totalFiles,
      totalSize,
      totalSizeMB: Math.round((totalSize / 1000000) * 100) / 100,
      keys: Object.keys(images)
    }
  }, [images])

  return {
    // Data
    images,

    // Handlers for ImageUpload component
    handleImageChange,
    handlePreviewChange,
    handleImageRemove,

    // Utility functions
    resetImage,
    resetAllImages,
    getImageData,
    getFormData,
    getValidationStatus,
    getSummary,

    // Computed values
    isValid: getValidationStatus().isValid,
    hasErrors: getValidationStatus().hasErrors,
    summary: getSummary()
  }
}
