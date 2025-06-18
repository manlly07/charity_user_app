import { Charity, OrganizeFollow, UpcomingEvent } from '@/components'

const Home = () => {
  return (
    <div className="max-w-[1440px] w-full m-auto py-8 px-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="sticky top-0">
            <OrganizeFollow />
          </div>
        </div>
        <div className="col-span-2 space-y-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <Charity key={index} />
          ))}
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

export default Home
