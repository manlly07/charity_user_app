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
export function useCharities() {
  const { user } = useSelector((state: RootState) => state.auth)

  const { data, error, isLoading, mutate } = useSWR(
    user?.organizationId ? `/events/charity/${user.organizationId}` : null, // key
    () => (user?.organizationId ? CharityService.getList(user.organizationId) : Promise.resolve([])) // fetcher
  )

  return {
    charities: error || !data ? [] : (data as TCharity[]),
    isLoading,
    isError: error,
    mutate // dùng để revalidate hoặc update dữ liệu thủ công
  }
}
