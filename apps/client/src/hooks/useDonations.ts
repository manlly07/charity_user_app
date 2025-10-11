import DonationService from '@/services/donation.service'
import { RootState } from '@/stores/store'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

export type Donation = {
  id: number
  organizationId: number
  organizationName: string
  title: string
  description: string | null
  moneyNeed: string // BigDecimal bên Java thường trả về string khi JSON
  eventStatus: string
  hasDonate: boolean
  note: string | null
  qrPic: string | null
  bankAccount: string
  pic: string | null
  dateStart: string // ISO datetime string, ví dụ "2025-09-13T15:23:00"
  dateEnd: string
  totalDonated: string // BigDecimal → string
}

type DonationFilter = { name?: string; from?: string; to?: string }

export function useDonations(filters?: { name?: string; from?: string; to?: string }) {
  const { user } = useSelector((state: RootState) => state.auth)

  const key: [string, DonationFilter?] | null = user?.organizationId
    ? [`/events/donation/${user.organizationId}`, filters]
    : null

  const { data, error, isLoading, mutate } = useSWR(key, ([url, f]) =>
    user?.organizationId ? DonationService.getList(user.organizationId, f) : Promise.resolve([])
  )

  return {
    donations: error || !data ? [] : (data as Donation[]),
    isLoading,
    isError: error,
    mutate
  }
}
