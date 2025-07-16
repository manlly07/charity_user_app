import SearchInput from '@/components/search'
import TableCharityUsers from './table'

const CharityDetail = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Event Attendance</p>
          <p className="text-base text-text-custom-color">Beach Cleanup - June 15, 2023</p>
        </div>
      </div>
      <div className="p-6 shadow">
        <div className="flex items-center gap-4">
          <SearchInput placeholder="Search by name, email or ID" />
        </div>
      </div>
      <div className="space-y-6">
        <TableCharityUsers />
      </div>
    </div>
  )
}

export default CharityDetail
