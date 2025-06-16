import { Banner2 } from '@/assets'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Avatar, Badge } from '@radix-ui/themes'

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

const CharityDetail = (props: Props) => {
  return (
    <>
      <div className="relative">
        <div className="image w-full h-[400px]">
          <img src={Banner2} alt="banner" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-8 left-8">
          <div className="flex gap-4 items-center">
            <Avatar
              size="6"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
            />
            <div className="space-y-1 text-white">
              <p className="text-2xl font-bold p-0">Green Earth Foundation</p>
              <p className="text-base text-white/80">Community Garden Project</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] w-full m-auto py-12 px-8 space-y-6">
        <div className="flex items-center gap-6">
          <Badge color="green" radius="full">
            Active Event
          </Badge>
          <div className="flex items-center gap-1.5 text-text-secondary">
            <CalendarIcon />
            <span>Sep 15 - Oct 30, 2023</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharityDetail
