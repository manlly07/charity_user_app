import VolunteersService from '@/services/volunteers.service'
import { RootState } from '@/stores/store'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

type TCharityStatus = 'active' | 'inactive' | 'upcoming' | 'completed'

export type VolunteerListResponse = {
  id: number
  fullName: string
  email: string
  contact: string
  pic: string
  active: boolean
  banned: boolean
  role: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_ORGANIZATION' // điều chỉnh theo enum Role của bạn
  createdAt: string // ISO string
  updatedAt: string // ISO string
  isDeleted: boolean
  organizationName?: string // optional nếu volunteer không có org
  organizationId?: number // optional nếu volunteer không có org
}

type CharityFilters = { search?: string }

export function useVolunteer(filters?: { search?: string }) {
  const { user } = useSelector((state: RootState) => state.auth)

  const key: [string, CharityFilters?] | null = user?.organizationId
    ? [`/admin/volunteers`, filters]
    : null

  const { data, error, isLoading, mutate } = useSWR(key, ([url, f]) =>
    user?.organizationId
      ? VolunteersService.getAllVolunteers(f as CharityFilters)
      : Promise.resolve([])
  )

  return {
    volunteers: error || !data ? [] : (data as VolunteerListResponse[]),
    isLoading,
    isError: error,
    mutate
  }
}
