import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import CharityService from '@/services/charity.service'
import { RootState } from '@/stores/store'
import { CheckCircledIcon, ClockIcon, PersonIcon, RocketIcon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import useSWR from 'swr'
import { CharityEventResponseList } from '../home'
import TableCharityUsers from './table'

const CharityDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
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
          <p className="text-3xl font-bold">Volunteer Registrations - {charity?.name}</p>
          <p className="text-base text-text-custom-color">
            List of users who have signed up for this event
          </p>
        </div>
      </div>
      <div className="p-6 shadow space-y-2">
        <p className="text-2xl font-bold">{charity?.name}</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-text-custom-color">
            <RocketIcon className="text-primary-custom-color" /> {charity?.destination}
          </div>
          <div className="flex items-center gap-2 text-text-custom-color">
            <ClockIcon className="text-primary-custom-color" />{' '}
            {`${dayjs(charity?.dateStart).format('MMM D, YYYY • h:mm A')}`}
          </div>
          <div className="flex items-center gap-2 text-text-custom-color">
            <PersonIcon className="text-primary-custom-color" /> {charity?.numVolunteerActual ?? 0}{' '}
            Registered Volunteers
          </div>
          <div className="flex items-center gap-2 text-text-custom-color">
            <CheckCircledIcon className="text-primary-custom-color" /> Registration Open
          </div>
        </div>
        <p className="text-text-custom-color text-sm">
          Join us for our annual beach cleanup initiative to preserve our coastal environment.
        </p>
      </div>
      <div className="p-6 shadow">
        <div className="flex items-center gap-4">
          <SearchInput placeholder="Search volunteers by name or email" />
          <Button
            className="bg-primary-custom-color hover:bg-primary-custom-color"
            onClick={() => navigate(`/organization/charities/${id}/checkin`)}
          >
            <CheckCircledIcon />
            <span>Check in</span>
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <TableCharityUsers id={id ?? ''} />
      </div>
    </div>
  )
}

export default CharityDetail
