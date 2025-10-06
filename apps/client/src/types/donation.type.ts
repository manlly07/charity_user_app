import { z } from 'zod'

const donationFormSchema = z.object({
  organizationId: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  dateStart: z.date({
    required_error: 'A date and time is required.'
  }),
  dateEnd: z.date({
    required_error: 'A date and time is required.'
  }),
  description: z.string().min(10, 'Description is too short'),
  moneyNeed: z.string().refine((val) => /^\d+$/.test(val), {
    message: 'Must be a positive integer'
  }),
  bankAccount: z.string().refine((val) => /^\d+$/.test(val), {
    message: 'Must be a positive integer'
  }),
  pic: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: 'Image must be smaller than 5MB'
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: 'Image must be JPEG, PNG, or WebP'
    }),
  qrcode: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: 'Image must be smaller than 5MB'
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: 'Image must be JPEG, PNG, or WebP'
    })
    .optional()
})

export { donationFormSchema }
