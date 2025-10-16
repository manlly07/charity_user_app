import { Banner2, Event1 } from '@/assets'
import { Button } from '@/components/ui/button'
import CharityService from '@/services/charity.service'
import { RootState } from '@/stores/store'
import {
  CalendarIcon,
  CheckCircledIcon,
  HeartIcon,
  PaperPlaneIcon,
  PersonIcon,
  Share1Icon
} from '@radix-ui/react-icons'
import { Avatar, Badge, Progress } from '@radix-ui/themes'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router'
import useSWR from 'swr'
import { CharityEventResponseList } from '../home'

const CharityDetail = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { id } = useParams<{ id: string }>()
  const charityId = id ? parseInt(id, 10) : 0
  const navigate = useNavigate()
  if (!user) return <Navigate to={'/login'} />

  const { data, error } = useSWR<CharityEventResponseList | null>('/events/charity', () =>
    CharityService.getCharityById(charityId, user?.id)
  )

  const [joined, setJoined] = useState(false)

  const charity = useMemo(() => {
    if (error || !data) return null
    setJoined(data.joined)
    return data
  }, [data, error])

  const { data: simalar, error: errorSimilar } = useSWR(['/events/charity', user?.id], () =>
    CharityService.getDashboard(user.id)
  )

  const eventSimilar = useMemo(() => {
    if (errorSimilar || !simalar) return []
    return simalar.filter((item: any) => item.id !== charityId).slice(0, 3)
  }, [simalar, errorSimilar])

  const formatEventDate = (dateStart?: string, dateEnd?: string) => {
    if (!dateStart) return ''

    const start = dayjs(dateStart)
    const end = dateEnd ? dayjs(dateEnd) : null

    if (!end) return start.format('MMM D, YYYY')
    if (start.year() !== end.year())
      return `${start.format('MMM D, YYYY')} - ${end.format('MMM D, YYYY')}`

    return `${start.format('MMM D')} - ${end.format('MMM D, YYYY')}`
  }

  const handleJoin = async () => {
    try {
      if (joined) {
        await CharityService.leaveProgram(charityId, user.id)
        setJoined(false)
      } else {
        await CharityService.joinProgram(charityId, user.id)
        setJoined(true)
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <div className="relative">
        <div className="image w-full h-[400px]">
          <img src={charity?.pic ?? Banner2} alt="banner" className="w-full h-full object-cover" />
          <span className="absolute top-0 left-0 right-0 bottom-0 morphing"></span>
        </div>
        <div className="absolute bottom-8 left-8">
          <div className="flex gap-4 items-center">
            <Avatar
              size="6"
              src={charity?.organization?.avatar ?? ''}
              fallback={
                <span className="text-white text-2xl font-bold">
                  {charity?.organization?.name.charAt(0) || 'C'}
                </span>
              }
              className="bg-transparent"
            />
            <div className="space-y-1 text-white">
              <p className="text-2xl font-bold p-0">{charity?.organization?.name}</p>
              <p className="text-base text-white/80">Community Garden Project</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] w-full m-auto py-12 px-8 space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <Badge
              color={
                charity?.status === 'ACTIVE'
                  ? 'green'
                  : charity?.status === 'CLOSED'
                    ? 'orange'
                    : 'red'
              }
              radius="full"
            >
              {charity?.status === 'ACTIVE'
                ? 'Active Event'
                : charity?.status === 'CLOSED'
                  ? 'Closed Event'
                  : 'Inactive Event'}
            </Badge>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <CalendarIcon />
              <span>{`${dayjs(charity?.dateStart).format('MMM D, YYYY')}`}</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <PersonIcon />
              <span>{charity?.numVolunteerActual ?? 0} Joined</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <PaperPlaneIcon />
              <span>{charity?.destination}</span>
            </div>
          </div>
          <p className="text-3xl font-bold">{charity?.name ?? 'Community Garden Revitalization'}</p>
          <div className="space-y-4">
            <p className="text-text-secondary text-base font-normal">
              {charity?.description ??
                'Join us in transforming vacant urban spaces into thriving community gardens. This project brings together volunteers, local schools, and community members to create sustainable green spaces that benefit our entire neighborhood'}
            </p>
            {/* <p className="text-text-secondary text-base font-normal">
              Through this initiative, we aim to promote environmental awareness, provide fresh
              produce to local families, and create opportunities for community engagement and
              learning.
            </p> */}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-text-custom-color text-sm">
              <span>Volunteer Spots</span>
              <span>
                {charity?.numVolunteerActual ?? 0}/{charity?.numVolunteerRequire}
              </span>
            </div>
            <div>
              <Progress
                value={
                  charity?.numVolunteerRequire
                    ? ((charity?.numVolunteerActual ?? 0) / charity.numVolunteerRequire) * 100
                    : 0
                }
                radius="full"
                color="grass"
              />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <Button
              onClick={charity?.status === 'ACTIVE' ? handleJoin : undefined}
              className={
                joined
                  ? 'bg-red-500 hover:bg-red-600 px-6'
                  : 'bg-primary-custom-color hover:bg-primary-custom-color/85 px-6'
              }
              size={'lg'}
            >
              {joined ? 'Leave Program' : 'Join us Volunteer'}
            </Button>
            <HeartIcon width={24} height={24} />
            <Share1Icon width={24} height={24} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div className="h-full col-span-1 p-6 space-y-4 bg-secondary-bg-color rounded">
            <p className="text-lg font-bold">Requirements</p>
            <div className="space-y-3 h-full">
              {charity?.requirement.split(';').map((item) => (
                <div className="flex items-center gap-2" key={item}>
                  <CheckCircledIcon className="text-primary-custom-color" width={20} height={20} />
                  <span className="text-base text-text-secondary text-wrap max-w-3/4">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full col-span-1 p-6 space-y-4 bg-secondary-bg-color rounded">
            <p className="text-lg font-bold">What You'll Do</p>
            <div className="space-y-3">
              {charity?.todo.split(';').map((item) => (
                <div className="flex items-center gap-2" key={item}>
                  <CheckCircledIcon className="text-primary-custom-color" width={20} height={20} />
                  <span className="text-base text-text-secondary text-wrap max-w-3/4">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full col-span-1 p-6 space-y-4 bg-secondary-bg-color rounded">
            <p className="text-lg font-bold">About Us</p>
            <div className="space-y-3">
              <p className="text-text-secondary text-base text-wrap w-full">
                {charity?.organization?.reason}
              </p>
              {/* <div className="flex items-center gap-2">
                <PaperPlaneIcon className="text-custom-color" width={20} height={20} />
                <span className="text-base text-text-secondary text-wrap max-w-3/4">
                  {charity?.destination}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="text-custom-color" width={20} height={20} />
                <span className="text-base text-text-secondary">100+ Completed Projects</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-xl font-bold">Similar Events</p>
          <div className="grid grid-cols-3 gap-6">
            {eventSimilar.length === 0 && <p className="text-base text-text-secondary">No data</p>}
            {eventSimilar.map((item: CharityEventResponseList) => (
              <div
                className="col-span-1 space-y-4"
                key={item.id}
                onClick={() => navigate('/organize/charity/' + item.id)}
              >
                <div className="image w-full h-[200px] overflow-hidden rounded">
                  <img
                    src={item?.pic ?? Event1}
                    alt="event"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-bold">{item?.name}</div>
                  <div className="text-text-custom-color flex gap-2 text-sm">
                    <CalendarIcon width={16} height={16} />
                    <span>{formatEventDate(charity?.dateStart, charity?.dateEnd)}</span>
                  </div>
                  <div className="text-primary-custom-color flex gap-2 text-sm">
                    <PersonIcon width={16} height={16} />
                    <span>
                      {(item?.numVolunteerRequire ?? 0) - (item?.numVolunteerActual ?? 0)} spots
                      left
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default CharityDetail
