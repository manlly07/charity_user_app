import CharityService from '@/services/charity.service'
import { RootState } from '@/stores/store'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

type TCharityStatus = 'active' | 'inactive' | 'upcoming' | 'completed'

type TCharity = {
  id: number
  charityName: string
  description: string
  destination: string
  dateStart: string
  dateEnd: string
  numVolunteerRequire: number
  numVolunteerActual?: number
  note?: string
  eventStatus: TCharityStatus
  pic: string
}

type CharityFilters = { name?: string; from?: string; to?: string }

export function useCharities(filters?: { name?: string; from?: string; to?: string }) {
  const { user } = useSelector((state: RootState) => state.auth)

  const key: [string, CharityFilters?] | null = user?.organizationId
    ? [`/events/charity/${user.organizationId}`, filters]
    : null

  const { data, error, isLoading, mutate } = useSWR(key, ([url, f]) =>
    user?.organizationId ? CharityService.getList(user.organizationId, f) : Promise.resolve([])
  )

  return {
    charities: error || !data ? [] : (data as TCharity[]),
    isLoading,
    isError: error,
    mutate
  }
}
