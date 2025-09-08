import { z } from 'zod'

const charityFormSchema = z.object({
  organizationId: z.number().optional(),
  charityName: z.string().min(3, 'Name must be at least 3 characters'),
  dateStart: z.date({
    required_error: 'A date and time is required.'
  }),
  dateEnd: z.date({
    required_error: 'A date and time is required.'
  }),
  destination: z.string().min(5, 'destination must be at least 5 characters'),
  description: z.string().min(10, 'Description is too short'),
  todo: z.string().min(5, 'To-do is required'),
  requirement: z.string().min(5, 'Requirement is required'),
  numVolunteerRequire: z.string().refine((val) => /^\d+$/.test(val), {
    message: 'Must be a positive integer'
  }),
  pic: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: 'Image must be smaller than 5MB'
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: 'Image must be JPEG, PNG, or WebP'
    })
})

export { charityFormSchema }
