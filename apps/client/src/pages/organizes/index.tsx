import { Charity, DonateItem, FollowIcon } from '@/components'
import { useUrlParams } from '@/hooks'
import { cn } from '@/lib/utils'
import { Avatar } from '@radix-ui/themes'
import { useEffect } from 'react'

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

const Organizes = (props: Props) => {
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

  return (
    <div className="max-w-[1440px] w-full m-auto py-8 px-6 space-y-4">
      <div className="info flex items-center justify-between">
        <div className="flex gap-8">
          <Avatar
            size="8"
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="A"
          />
          <div className="space-y-4">
            <p className="text-[32px] font-bold p-0">Global Hope Foundation</p>
            <p className="text-base text-[#4B5563]">Hosted by Sarah Johnson</p>
            <p className="text-lg text-[#4B5563] line-clamp-1">
              Empowering communities through education and sustainable development. We believe in
              creating lasting positive change through collaborative efforts.
            </p>
          </div>
        </div>
        <FollowIcon />
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
          Array.from({ length: 4 }).map((_, index) => (
            <div className="col-span-1" key={index}>
              <Charity />
            </div>
          ))}
        {query === 'donation' &&
          Array.from({ length: 15 }).map((_, index) => (
            <div className="col-span-1" key={index}>
              <DonateItem />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Organizes
