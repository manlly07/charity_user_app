import SearchInput from '@/components/search'
import CharityService from '@/services/charity.service'
import { RootState } from '@/stores/store'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import useSWR from 'swr'
import { CharityEventResponseList } from '../home'
import TableCharityUsers from './table'

const CharityDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useSelector((state: RootState) => state.auth)

  const charityId = id ? parseInt(id, 10) : 0

  const { data, error } = useSWR<CharityEventResponseList | null>('/events/charity', () =>
    CharityService.getCharityById(charityId, user?.id)
  )

  const charity = useMemo(() => {
    if (error || !data) return null
    return data
  }, [data, error])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Event Attendance</p>
          <p className="text-base text-text-custom-color">
            {charity?.name} - {`${dayjs(charity?.dateStart).format('MMM D, YYYY')}`}
          </p>
        </div>
      </div>
      <div className="p-6 shadow">
        <div className="flex items-center gap-4">
          <SearchInput placeholder="Search by name, email or ID" />
        </div>
      </div>
      <div className="space-y-6">
        <TableCharityUsers id={id ?? ''} />
      </div>
    </div>
  )
}

export default CharityDetail
