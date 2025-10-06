import { z } from 'zod'

// Regex cho số điện thoại Việt Nam
const vietnamPhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/

// Schema chính cho form đăng ký
const FormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full Name phải có ít nhất 2 ký tự')
    .max(50, 'Full Name tối đa 50 ký tự'),

  email: z.string().trim().email().max(255, 'Email must be at most 255 characters long'),

  phoneNumber: z
    .string()
    .trim()
    .regex(vietnamPhoneRegex, 'Số điện thoại không đúng định dạng Việt Nam')
    .optional(),

  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters long')
    .max(255, 'Password must be at most 255 characters long')
})

// Schema cho thông tin tài khoản (không bao gồm password)
const AccountSchema = FormSchema.pick({
  email: true,
  fullName: true,
  phoneNumber: true
}).extend({
  image: z
    .instanceof(File)
    .or(
      z.any().refine((val) => val instanceof File || val === undefined, {
        message: 'Invalid file'
      })
    )
    .optional()
})

// Schema cho đổi mật khẩu
const PasswordSchema = FormSchema.pick({
  password: true
})
  .extend({
    newPassword: z.string().trim().min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự'),
    confirmPassword: z.string().trim().min(8, 'Xác nhận mật khẩu phải có ít nhất 8 ký tự')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  })

// Schema cho đăng nhập
const LoginSchema = FormSchema.pick({
  email: true,
  password: true
})

const RegisterSchema = FormSchema.omit({ phoneNumber: true })

// Schema cho quên mật khẩu
const ForgotPasswordSchema = FormSchema.pick({
  email: true
})

// Schema cho reset mật khẩu
const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token không hợp lệ'),
    newPassword: z.string().trim().min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự'),
    confirmPassword: z.string().trim().min(8, 'Xác nhận mật khẩu phải có ít nhất 8 ký tự')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  })

// Export các types từ schema
export type FormData = z.infer<typeof FormSchema>
export type AccountData = z.infer<typeof AccountSchema>
export type PasswordData = z.infer<typeof PasswordSchema>
export type LoginData = z.infer<typeof LoginSchema>
export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>
export type RegisterData = z.infer<typeof RegisterSchema>
export type JwtTokens = {
  accessToken: string
  refreshToken: string
  tokenType: 'Bearer'
}

export type User = JwtTokens & {
  id: number
  username: string
  contact: string
  email: string
  role: string
  organizationId: number
  active: boolean
  pic: string | null
}
export {
  AccountSchema,
  ForgotPasswordSchema,
  FormSchema,
  LoginSchema,
  PasswordSchema,
  RegisterSchema,
  ResetPasswordSchema,
  vietnamPhoneRegex
}
