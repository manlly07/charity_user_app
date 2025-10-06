import SearchInput from '@/components/search'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import DonationService from '@/services/donation.service'
import { BackpackIcon, CalendarIcon, TargetIcon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'
import TableCharityUsers from './table'

const DonationDetail = () => {
  const { id } = useParams<{ id: string }>()

  const donationId = id ? parseInt(id, 10) : 0

  const { data, error } = useSWR('/events/donation', () =>
    DonationService.getDonationById(donationId)
  )

  const donation = useMemo(() => {
    if (error || !data) return null
    return data
  }, [data, error])

  console.log(donation)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Donor List - {donation?.title}</p>
          <p className="text-base text-text-custom-color">
            Overview of all contributions made to this campaign
          </p>
        </div>
      </div>
      <div className="p-6 shadow">
        <div className="grid grid-cols-4 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-text-custom-color text-sm">
              <TargetIcon /> Goal Amount
            </div>
            <p className="font-semibold text-lg">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(parseFloat(donation?.moneyNeed as string) || 0)}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-text-custom-color text-sm">
              <BackpackIcon /> GTotal Raised
            </div>
            <p className="font-semibold text-lg">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(parseFloat(donation?.totalDonated as string) || 0)}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-text-custom-color text-sm">
              <CalendarIcon /> Start Date
            </div>
            <p className="font-semibold text-lg">{`${dayjs(donation?.dateStart).format('MMM D, YYYY')}`}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-text-custom-color text-sm">
              <CalendarIcon /> End Date
            </div>
            <p className="font-semibold text-lg">{`${dayjs(donation?.dateEnd).format('MMM D, YYYY')}`}</p>
          </div>
        </div>
      </div>
      <div className="p-6 shadow">
        <div className="flex items-center gap-4">
          <SearchInput placeholder="Search volunteers by name or email" />
          <DateRangePicker />
        </div>
      </div>
      <div className="space-y-6">
        <TableCharityUsers />
      </div>
    </div>
  )
}

export default DonationDetail
