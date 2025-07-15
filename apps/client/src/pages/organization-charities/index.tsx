import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import { ChevronDownIcon } from '@radix-ui/themes'
import { useState } from 'react'
import TableOrganization from './table'

const Charities = () => {
  const [date, _setDate] = useState<Date | undefined>()
  const [open, setOpen] = useState(false)
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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="w-full" asChild>
              <div>
                <Button variant="outline" id="date" className="w-full justify-between font-normal">
                  {date ? date.toLocaleDateString() : 'Date Start'}
                  <ChevronDownIcon />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full overflow-hidden p-0" align="start">
              <Calendar mode="range" defaultMonth={date} className="rounded-lg border shadow-sm" />
            </PopoverContent>
          </Popover>
          <Button className="bg-primary-custom-color hover:bg-primary-custom-color">
            <MagnifyingGlassIcon />
            <span>Search</span>
          </Button>
          <Button className="bg-primary-custom-color hover:bg-primary-custom-color">
            <PlusIcon />
            <span>Add new Event</span>
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <TableOrganization />
      </div>
    </div>
  )
}

export default Charities
