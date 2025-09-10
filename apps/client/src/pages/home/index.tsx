import { Charity, Notifications, OrganizeFollow } from '@/components'
import CharityService from '@/services/charity.service'
import { RootState } from '@/stores/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import useSWR from 'swr'

export type CharityEventResponseList = {
  id: number
  pic: string
  name: string
  description: string
  requirement: string
  destination: string
  dateStart: string // ISO string từ LocalDateTime

  organization: {
    id: number
    name: string
    avatar: string // map từ logo
  }

  joined: boolean
}

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  if (!user?.id) return <Navigate to={'/login'} />

  const { data, error, isLoading } = useSWR('/events/charity', () =>
    CharityService.getDashboard(user?.id)
  )

  const charities = useMemo(() => {
    if (error || !data) return []
    return data
  }, [data, error])

  return (
    <div className="max-w-[1440px] w-full m-auto py-8 px-6">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
        <div className="hidden lg:block col-span-1">
          <div className="sticky top-20">
            <OrganizeFollow />
          </div>
        </div>
        <div className="col-span-2 space-y-8">
          {charities.map((_: CharityEventResponseList, index: number) => (
            <Charity data={_} key={index} />
          ))}
        </div>
        <div className="hidden md:block col-span-1">
          <div className="sticky top-20">
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
