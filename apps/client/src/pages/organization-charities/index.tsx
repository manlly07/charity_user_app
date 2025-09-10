import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useCharities } from '@/hooks'
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import TableOrganization from './table'

const Charities = () => {
  const navigate = useNavigate()

  const [filters, setFilters] = useState<{ name?: string; from?: string; to?: string }>()
  const { charities, isLoading, isError } = useCharities(filters)
  const [programName, setProgramName] = useState('')
  const [range, setRange] = useState<{ from: Date; to?: Date }>({
    from: new Date(),
    to: new Date()
  })

  const handleSearch = () => {
    const from = range?.from?.toISOString().split('T')[0]
    const to = range?.to?.toISOString().split('T')[0]

    const searchFilters = {
      name: programName || undefined,
      from,
      to
    }

    console.log('Search params:', searchFilters)

    // cập nhật filters -> useCharities sẽ gọi lại API
    setFilters(searchFilters)
  }

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
          <SearchInput
            placeholder="Search by Program Name"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
          />
          <DateRangePicker onUpdate={({ range }) => setRange(range)} />
          <Button
            className="bg-primary-custom-color hover:bg-primary-custom-color"
            onClick={handleSearch}
          >
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
