import { Event4, Event5, Event6, Event7 } from '@/assets'
import SearchInput from '@/components/search'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/lib/api'
import { cn } from '@/lib/utils'
import { RootState } from '@/stores/store'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useSearchParams } from 'react-router'
import useSWR from 'swr'

const EVENTS = [
  {
    image: Event4,
    title: 'Community Food Drive Platform',
    location: 'Local Food Bank',
    date: 'Participated on October 15, 2023',
    registered: 'Registered'
  },
  {
    image: Event5,
    title: 'CNeighborhood Cleanup Initiative',
    location: 'Environmental Group',
    date: 'Participated on September 25, 2023',
    registered: 'Participated'
  },
  {
    image: Event6,
    title: 'Book Donation Event',
    location: 'City Library',
    date: 'Participated on November 10, 2023',
    registered: 'Participated'
  },
  {
    image: Event7,
    title: 'Park Beautification Project',
    location: 'Community Park Association',
    date: 'Participated on August 5, 2023',
    registered: 'Missed'
  }
]

const CharityHistory = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  if (!user?.id) return <Navigate to={'/login'} />

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get('s') || '')

  useEffect(() => {
    if (keyword.trim() === '') {
      navigate('.', { replace: true }) // xoá query param
    }
  }, [keyword, navigate])

  const handleSearch = () => {
    if (!keyword.trim()) return
    navigate(`?s=${encodeURIComponent(keyword.trim())}`)
  }

  const { data, error } = useSWR(['/charity/history', keyword], async () => {
    const res = await axiosInstance.get(`/events/charity/volunteer/${user?.id}/history`, {
      params: {
        ...(keyword.trim() ? { search: keyword.trim() } : {})
      }
    })
    return res.data
  })

  const EVENTS = useMemo(() => {
    if (error || !data) return []
    return data
  }, [data, error])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Your Volunteer Activities</p>
          <p className="text-base text-text-custom-color">
            Track and manage your volunteering journey
          </p>
        </div>
      </div>
      <div className="shadow rounded-lg p-6 space-y-4">
        <div className="flex items-center [&>*]:flex-1 gap-4">
          <SearchInput
            placeholder="Search by Program Name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          {/* <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger className="w-full" asChild>
              <div>
                <Button variant="outline" id="date" className="w-full justify-between font-normal">
                  {dateFrom ? dateFrom.toLocaleDateString() : 'Date Start'}
                  <ChevronDownIcon />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full overflow-hidden p-0" align="start">
              <Calendar mode="range" defaultMonth={date} className="rounded-lg border shadow-sm" />
            </PopoverContent>
          </Popover> */}
        </div>
        <Button className="bg-primary-custom-color hover:bg-primary-custom-color">
          <span>Search</span>
        </Button>
      </div>
      <div className="space-y-4">
        {EVENTS.map((event: any, _: number) => (
          <div key={_} className="rounded-lg overflow-hidden shadow flex">
            <img src={event?.pic ?? ''} width={200} height={160} className="object-cover" />
            <div className="p-6 space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-lg font-medium">{event?.charityEventName}</p>
                <Badge
                  variant={'secondary'}
                  className={cn('text-xs', {
                    'bg-primary-custom-color/10 text-primary-custom-color':
                      event?.eventStatus === 'Registered',
                    'bg-blue-500/10 text-blue-500': event?.registered === 'Participated',
                    'bg-red-500/10 text-red-500': event?.registered === 'CLOSED'
                  })}
                >
                  {event?.registered}
                </Badge>
              </div>
              <p className="text-base text-text-secondary">{event?.organizationName}</p>
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-text-custom-color">
                  Participated on {dayjs(event?.eventCreatedAt).format('MMM D, YYYY')}
                </p>
                {/* <Button
                  className="border-border-input-color text-primary-custom-color hover:text-primary-custom-color"
                  variant={'outline'}
                >
                  See more
                </Button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="m-auto mt-8">
        {/* <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </div>
    </div>
  )
}

export default CharityHistory
