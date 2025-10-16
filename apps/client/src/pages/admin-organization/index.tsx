import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { useOrganizationAdmin } from '@/hooks/useOrganizationAdmin'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import TableOrganization from './table'

const Organization = () => {
  const [filters, setFilters] = useState<{ search?: string }>()
  const { organizations, isLoading, isError } = useOrganizationAdmin(filters)
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
          <p className="text-3xl font-bold">Organization Management</p>
          <p className="text-base text-text-custom-color">
            View and manage all registered organizations.
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
        <TableOrganization organizations={organizations} />
      </div>
    </div>
  )
}

export default Organization
