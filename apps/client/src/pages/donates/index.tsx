import { DonateItem, OrganizeFollow, UpcomingEvent } from '@/components'

type Props = {}

const Donate = (props: Props) => {
  return (
    <div className="max-w-[1440px] w-full m-auto py-8 px-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="sticky top-0">
            <OrganizeFollow />
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="col-span-1">
                <DonateItem />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <div className="sticky top-0">
            <UpcomingEvent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donate
