import CharitiesAdminService from '@/services/charities.admin.service'
import { RootState } from '@/stores/store'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import { EEventStatus } from './useDonationAdmin'

export interface CharityEventListResponse {
  id: number
  charityName: string
  description: string
  todo: string
  requirement: string
  destination: string
  dateStart: string // LocalDateTime => string (ISO format) khi trả từ API
  dateEnd: string
  numVolunteerRequire: number
  numVolunteerActual: number
  note: string
  pic: string
  eventStatus: EEventStatus
  createdAt: string
  updatedAt: string

  // Organization info
  organizationId: number
  organizationName: string
  organizationDescription: string

  // Total participants count
  totalParticipants: number
}

type CharityFilters = { search?: string }

export function useCharitiesAdmin(filters?: { search?: string }) {
  const { user } = useSelector((state: RootState) => state.auth)

  const key: [string, CharityFilters?] | null = user ? [`/adminn/charities`, filters] : null

  const { data, error, isLoading, mutate } = useSWR(key, ([url, f]) =>
    user ? CharitiesAdminService.getAllCharityEvents(f as CharityFilters) : Promise.resolve([])
  )

  return {
    charities: error || !data ? [] : (data as CharityEventListResponse[]),
    isLoading,
    isError: error,
    mutate
  }
}
