import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { useCharitiesAdmin } from '@/hooks/useCharitiesAdmin'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import TableCharities from './table'

const Charities = () => {
  const navigate = useNavigate()

  const [filters, setFilters] = useState<{ search?: string }>()
  const { charities, isLoading, isError } = useCharitiesAdmin(filters)
  const [programName, setProgramName] = useState('')

  const handleSearch = () => {
    const searchFilters = {
      search: programName || undefined
    }

    console.log('Search params:', searchFilters)

    setFilters(searchFilters)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Failed to load</p>
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Charity Management</p>
          <p className="text-base text-text-custom-color">
            View and manage all registered charities.
          </p>
        </div>
      </div>
      <div className="p-6 shadow">
        <div className="flex items-center gap-4">
          <SearchInput
            placeholder="Search by Program Name"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
          />
          <Button
            className="bg-primary-custom-color hover:bg-primary-custom-color"
            onClick={handleSearch}
          >
            <MagnifyingGlassIcon />
            <span>Search</span>
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <TableCharities charities={charities} />
      </div>
    </div>
  )
}

export default Charities
