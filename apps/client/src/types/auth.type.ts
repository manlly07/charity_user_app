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

  email: z.string().trim().email('Email không hợp lệ'),

  phoneNumber: z
    .string()
    .trim()
    .regex(vietnamPhoneRegex, 'Số điện thoại không đúng định dạng Việt Nam'),

  password: z.string().trim().min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
})

// Schema cho thông tin tài khoản (không bao gồm password)
const AccountSchema = FormSchema.pick({
  email: true,
  fullName: true,
  phoneNumber: true
}).extend({
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), {
      message: 'File phải là hình ảnh'
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Ảnh phải nhỏ hơn 5MB'
    })
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

export {
  AccountSchema,
  ForgotPasswordSchema,
  FormSchema,
  LoginSchema,
  PasswordSchema,
  ResetPasswordSchema,
  vietnamPhoneRegex
}
