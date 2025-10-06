import DonationAdminService from '@/services/organization.admin.service'
import { RootState } from '@/stores/store'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

export enum EEventStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ONGOING',
  COMPLETED = 'completed',
  CANCELLED = 'CANCELLED',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FULFILLED = 'FULFILLED',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}
// 👆 sửa lại cho khớp enum EEventStatus bạn đang có trong backend

export interface DonationEventListResponse {
  id: number
  title: string
  description: string | null
  moneyNeed: string // BigDecimal thường trả về dạng string trong JSON
  eventStatus: EEventStatus
  hasDonate: boolean
  note: string | null
  qrPic: string | null
  bankAccount: string | null
  pic: string | null
  createdAt: string // ISO datetime string
  updatedAt: string // ISO datetime string

  // Organization info
  organizationId: number
  organizationName: string
  organizationDescription: string | null

  // Total donated amount
  totalDonatedAmount: string
}

type CharityFilters = { search?: string }

export function useDonationAdmin(filters?: { search?: string }) {
  const { user } = useSelector((state: RootState) => state.auth)

  const key: [string, CharityFilters?] | null = user?.organizationId
    ? [`/admin/organizations`, filters]
    : null

  const { data, error, isLoading, mutate } = useSWR(key, ([url, f]) =>
    user?.organizationId
      ? DonationAdminService.getAllDonations(f as CharityFilters)
      : Promise.resolve([])
  )

  return {
    donations: error || !data ? [] : (data as DonationEventListResponse[]),
    isLoading,
    isError: error,
    mutate
  }
}
