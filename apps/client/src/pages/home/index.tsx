import { Charity, OrganizeFollow, UpcomingEvent } from '@/components'

const Home = () => {
  return (
    <div className="max-w-[1440px] w-full m-auto py-8 px-6">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
        <div className="hidden lg:block col-span-1">
          <div className="sticky top-20">
            <OrganizeFollow />
          </div>
        </div>
        <div className="col-span-2 space-y-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <Charity key={index} />
          ))}
        </div>
        <div className="hidden md:block col-span-1">
          <div className="sticky top-20">
            <UpcomingEvent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
