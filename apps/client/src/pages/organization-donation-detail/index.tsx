import SearchInput from '@/components/search'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { BackpackIcon, CalendarIcon, TargetIcon } from '@radix-ui/react-icons'
import TableCharityUsers from './table'

const DonationDetail = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Donor List - Save The Children Campaign</p>
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
            <p className="font-semibold text-lg">$50,000</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-text-custom-color text-sm">
              <BackpackIcon /> GTotal Raised
            </div>
            <p className="font-semibold text-lg">$32,450</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-text-custom-color text-sm">
              <CalendarIcon /> Start Date
            </div>
            <p className="font-semibold text-lg">Jan 15, 2024</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-text-custom-color text-sm">
              <CalendarIcon /> End Date
            </div>
            <p className="font-semibold text-lg">Mar 15, 2024</p>
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
