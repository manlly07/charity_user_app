import { DonateItem, OrganizeFollow, UpcomingEvent } from '@/components'

type Props = {}

const Donate = (_props: Props) => {
  return (
    <div className="max-w-[1440px] w-full m-auto py-8 px-6">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
        <div className="hidden lg:block col-span-1">
          <div className="sticky top-20">
            <OrganizeFollow />
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="col-span-1" key={index}>
                <DonateItem />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block col-span-1">
          <div className="sticky top-20">
            <UpcomingEvent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donate
