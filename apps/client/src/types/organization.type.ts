import { z } from 'zod'

// Regex cho số điện thoại Việt Nam
const vietnamPhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/

// Schema cho Organization (form data với File objects)
const OrganizationSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(2, 'Tên tổ chức phải có ít nhất 2 ký tự')
    .max(100, 'Tên tổ chức tối đa 100 ký tự'),

  founderFullName: z
    .string()
    .trim()
    .min(2, 'Tên người sáng lập phải có ít nhất 2 ký tự')
    .max(50, 'Tên người sáng lập tối đa 50 ký tự'),

  email: z.string().trim().email('Email không hợp lệ'),

  phoneNumber: z
    .string()
    .trim()
    .regex(vietnamPhoneRegex, 'Số điện thoại không đúng định dạng Việt Nam'),

  organizationLogo: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Logo không được vượt quá 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Logo phải là file ảnh (JPEG, PNG, WebP)'
    )
    .optional(),

  reason: z
    .string()
    .trim()
    .min(10, 'Lý do tạo tổ chức phải có ít nhất 10 ký tự')
    .max(500, 'Lý do tạo tổ chức tối đa 500 ký tự'),

  certificate: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'Chứng chỉ không được vượt quá 10MB')
    .refine(
      (file) =>
        [
          'application/pdf',
          'image/jpeg',
          'image/jpg',
          'image/png',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ].includes(file.type),
      'Chứng chỉ phải là file PDF, ảnh hoặc Word'
    )
    .optional()
})

// Schema cho Organization API (sau khi upload, với URL strings)
const OrganizationApiSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(2, 'Tên tổ chức phải có ít nhất 2 ký tự')
    .max(100, 'Tên tổ chức tối đa 100 ký tự'),

  founderFullName: z
    .string()
    .trim()
    .min(2, 'Tên người sáng lập phải có ít nhất 2 ký tự')
    .max(50, 'Tên người sáng lập tối đa 50 ký tự'),

  email: z.string().trim().email('Email không hợp lệ'),

  phoneNumber: z
    .string()
    .trim()
    .regex(vietnamPhoneRegex, 'Số điện thoại không đúng định dạng Việt Nam'),

  organizationLogo: z.string().url('Logo phải là URL hợp lệ').optional().nullable(),

  reason: z
    .string()
    .trim()
    .min(10, 'Lý do tạo tổ chức phải có ít nhất 10 ký tự')
    .max(500, 'Lý do tạo tổ chức tối đa 500 ký tự'),

  certificate: z.string().url('Chứng chỉ phải là URL hợp lệ').optional().nullable()
})

// Schema cho update organization (tất cả fields optional trừ id)
const UpdateOrganizationSchema = OrganizationApiSchema.partial().extend({
  id: z.string().min(1, 'ID tổ chức không hợp lệ')
})

// Schema cho organization filter/search
const OrganizationFilterSchema = z.object({
  search: z.string().optional(),
  founderName: z.string().optional(),
  email: z.string().optional(),
  createdFrom: z.string().optional(),
  createdTo: z.string().optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'suspended']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10)
})

// Export types từ schema
export type OrganizationFormData = z.infer<typeof OrganizationSchema> // Form data với File objects
export type OrganizationApiData = z.infer<typeof OrganizationApiSchema> // API data với URL strings
export type UpdateOrganizationData = z.infer<typeof UpdateOrganizationSchema>
export type OrganizationFilter = z.infer<typeof OrganizationFilterSchema>

// Export schemas
export {
  OrganizationApiSchema,
  OrganizationFilterSchema,
  OrganizationSchema,
  UpdateOrganizationSchema,
  vietnamPhoneRegex
}

// Organization entity type (với thông tin từ database)
export interface Organization {
  id: string
  organizationName: string
  founderFullName: string
  email: string
  phoneNumber: string
  organizationLogo?: string | null
  reason: string
  certificate?: string | null
  status: OrganizationStatus
  createdAt: string
  updatedAt: string
  approvedAt?: string | null
  approvedBy?: string | null
  rejectedAt?: string | null
  rejectedBy?: string | null
  rejectionReason?: string | null
}

// Organization status enum
export type OrganizationStatus = 'pending' | 'approved' | 'rejected' | 'suspended'

// Organization statistics
export interface OrganizationStats {
  totalOrganizations: number
  pendingOrganizations: number
  approvedOrganizations: number
  rejectedOrganizations: number
  suspendedOrganizations: number
  organizationsThisMonth: number
  organizationsLastMonth: number
  growthRate: number
}

// API response types
export interface OrganizationResponse {
  success: boolean
  data?: Organization
  error?: ApiError
  message?: string
}

export interface OrganizationListResponse {
  success: boolean
  data?: {
    organizations: Organization[]
    pagination: PaginationInfo
  }
  error?: ApiError
  message?: string
}

// Pagination info
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// API error type
export interface ApiError {
  message: string
  code?: string
  field?: string
}

// File upload types
export interface FileUpload {
  file: File
  name: string
  size: number
  type: string
  url?: string
}

export interface UploadResponse {
  success: boolean
  url?: string
  error?: string
}

// Form state types
export interface OrganizationFormState {
  loading: boolean
  error: string | null
  success: boolean
  uploadingLogo: boolean
  uploadingCertificate: boolean
}

// Organization form props
export interface OrganizationFormProps {
  initialData?: Partial<OrganizationFormData>
  onSubmit: (data: OrganizationFormData) => void | Promise<void>
  loading?: boolean
  error?: string | null
  mode?: 'create' | 'edit'
}

// Organization actions
export interface OrganizationActions {
  approve: (id: string, approvedBy: string) => Promise<void>
  reject: (id: string, rejectedBy: string, reason: string) => Promise<void>
  suspend: (id: string, suspendedBy: string, reason: string) => Promise<void>
  reactivate: (id: string, reactivatedBy: string) => Promise<void>
}

// Organization approval/rejection data
export interface OrganizationActionData {
  organizationId: string
  actionBy: string
  reason?: string
  note?: string
}

// Search/Filter result type
export interface OrganizationSearchResult {
  organizations: Organization[]
  totalCount: number
  filters: OrganizationFilter
  pagination: PaginationInfo
}

// Organization member type (nếu có system quản lý thành viên)
export interface OrganizationMember {
  id: string
  organizationId: string
  userId: string
  role: 'admin' | 'member' | 'viewer'
  joinedAt: string
  invitedBy?: string
  status: 'active' | 'inactive' | 'pending'
}

// Organization invitation type
export interface OrganizationInvitation {
  id: string
  organizationId: string
  email: string
  role: 'admin' | 'member' | 'viewer'
  invitedBy: string
  invitedAt: string
  expiresAt: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  token: string
}
