import { Charity, DonateItem, FollowIcon } from '@/components'
import { useUrlParams } from '@/hooks'
import axiosInstance from '@/lib/api'
import { cn } from '@/lib/utils'
import CharityService from '@/services/charity.service'
import { RootState } from '@/stores/store'
import { Avatar } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router'
import useSWR from 'swr'

type Props = {}

type SearchParams = 'q'

const Menu = [
  {
    name: 'Charity Events',
    path: 'charity'
  },
  {
    name: 'Donation Programs',
    path: 'donation'
  }
]

const Organizes = (_props: Props) => {
  const { id } = useParams<{ id: string }>()
  const { user } = useSelector((state: RootState) => state.auth)
  if (!user?.id) return <Navigate to={'/login'} />

  const { setParam, setParams, getParam, hasParam } = useUrlParams<SearchParams>({
    trackParams: ['q'],
    replace: false
  })

  const handleSearch = (query: string) => {
    setParam('q', query)
  }

  const query = getParam('q')
  useEffect(() => {
    if (!query) {
      setParam('q', 'charity')
    }
    if (query && !hasParam('q')) {
      setParams({ q: query.toLowerCase() })
    }
  }, [query])

  const { data, error, mutate } = useSWR('/organizes/', async () => {
    const res = await axiosInstance.get(`/events/organization/${id}`, {
      params: {
        volunteerId: user.id
      }
    })
    return res.data
  })

  const [followed, setFollowed] = useState(data?.followed || false)

  const handleFollow = async () => {
    try {
      if (data?.followed) {
        console.log()
        await CharityService.unfollowOrganization(data.id, user.id)
        setFollowed(false)
      } else {
        await CharityService.followOrganization(data.id, user.id)
        setFollowed(true)
      }
      mutate()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-[1440px] w-full m-auto py-8 px-6 space-y-4">
      <div className="info flex items-center justify-between">
        <div className="flex gap-8">
          <Avatar
            size="8"
            src={data?.logo || ''}
            fallback={data?.organizationName?.charAt(0) ?? 'A'}
          />
          <div className="space-y-4">
            <p className="text-[32px] font-bold p-0">{data?.organizationName}</p>
            <p className="text-base text-[#4B5563]">Hosted by {data?.owner}</p>
            <p className="text-lg text-[#4B5563] line-clamp-1">{data?.description}</p>
          </div>
        </div>
        <FollowIcon followed={data?.followed} onClick={handleFollow} />
      </div>
      <div className="flex gap-8 border-b border-input">
        {Menu.map((item) => (
          <span
            key={item.path}
            className={cn('p-4 text-base font-medium text-center cursor-pointer', {
              'text-primary-custom-color border-b-2 border-primary-custom-color':
                item.path === query,
              'text-[#4B5563]': item.path != query
            })}
            onClick={() => handleSearch(item.path)}
          >
            {item.name}
          </span>
        ))}
      </div>
      <div
        className={cn('grid gap-2.5', {
          'grid-cols-2': query === 'charity',
          'grid-cols-4': query === 'donation'
        })}
      >
        {query === 'charity' &&
          (data?.charities || []).map((_: any, index: number) => (
            <div className="col-span-1" key={index}>
              <Charity data={_} />
            </div>
          ))}
        {query === 'donation' &&
          (data?.donations || []).map((_: any, index: number) => (
            <div className="col-span-1" key={index}>
              <DonateItem donation={_} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Organizes
