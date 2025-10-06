import { DonateItem, OrganizeFollow, UpcomingEvent } from '@/components'
import DonationService from '@/services/donation.service'
import { useMemo } from 'react'
import useSWR from 'swr'

type Props = {}

const Donate = (_props: Props) => {
  const { data, error } = useSWR('/events/donation', () => DonationService.getDashboard())

  const donaitonList = useMemo(() => {
    if (error || !data) return []
    return data
  }, [data, error])

  console.log(donaitonList)
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
            {donaitonList.map((_, index) => (
              <div className="col-span-1" key={index}>
                <DonateItem donation={_} />
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
