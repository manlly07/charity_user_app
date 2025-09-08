import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useCharities } from '@/hooks'
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router'
import TableOrganization from './table'

const Charities = () => {
  const navigate = useNavigate()

  const { charities, isLoading, isError } = useCharities()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Failed to load</p>
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Charities List</p>
          <p className="text-base text-text-custom-color">
            View and manage all registered charity organizations.
          </p>
        </div>
      </div>
      <div className="p-6 shadow">
        <div className="flex items-center [&>*]:flex-1 gap-4">
          <SearchInput placeholder="Search by Program Name" />
          <DateRangePicker />
          <Button className="bg-primary-custom-color hover:bg-primary-custom-color">
            <MagnifyingGlassIcon />
            <span>Search</span>
          </Button>
          <Button
            className="bg-primary-custom-color hover:bg-primary-custom-color"
            onClick={() => navigate('/organization/charities/create')}
          >
            <PlusIcon />
            <span>Add new Event</span>
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <TableOrganization charityList={charities} />
      </div>
    </div>
  )
}

export default Charities
