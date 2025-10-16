import { Charity, OrganizeFollow } from '@/components'
import CharityService from '@/services/charity.service'
import { RootState } from '@/stores/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useSearchParams } from 'react-router'
import useSWR from 'swr'

export type CharityEventResponseList = {
  id: number
  pic: string
  name: string
  description: string
  requirement: string
  todo: string
  destination: string
  dateStart: string
  dateEnd: string
  numVolunteerRequire: number
  numVolunteerActual: number

  organization: {
    id: number
    name: string
    avatar: string | null
    reason: string | null
  }

  joined: boolean
  followed: boolean
}

const Home = () => {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('s') || '' // đọc param ?s
  const { user } = useSelector((state: RootState) => state.auth)
  if (!user) return <Navigate to={'/login'} />

  const { data, error } = useSWR(['/events/charity', user?.id, keyword], () =>
    CharityService.getDashboard(user.id, keyword)
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
        {/* <div className="hidden md:block col-span-1">
          <div className="sticky top-20">
            <Notifications />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Home
