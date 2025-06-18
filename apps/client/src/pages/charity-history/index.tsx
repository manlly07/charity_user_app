import { Event4, Event5, Event6, Event7 } from '@/assets'
import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ChevronDownIcon } from '@radix-ui/themes'
import { useState } from 'react'

const CharityHistory = () => {
  const [date, _setDate] = useState<Date | undefined>(new Date(2025, 5, 12))
  const [openFrom, setOpenFrom] = useState(false)
  const [dateFrom, _setDateFrom] = useState<Date | undefined>(undefined)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Your Volunteer Activities</p>
          <p className="text-base text-text-custom-color">
            Track and manage your volunteering journey
          </p>
        </div>
      </div>
      <div className="shadow rounded-lg p-6 space-y-4">
        <div className="flex items-center [&>*]:flex-1 gap-4">
          <SearchInput placeholder="Search by Program Name" />
          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger className="w-full" asChild>
              <div>
                <Button variant="outline" id="date" className="w-full justify-between font-normal">
                  {dateFrom ? dateFrom.toLocaleDateString() : 'Date Start'}
                  <ChevronDownIcon />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full overflow-hidden p-0" align="start">
              <Calendar mode="range" defaultMonth={date} className="rounded-lg border shadow-sm" />
            </PopoverContent>
          </Popover>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-primary-custom-color hover:bg-primary-custom-color">
          <span>Search</span>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg overflow-hidden shadow flex">
          <img src={Event4} width={200} height={160} className="object-cover" />
          <div className="p-6 space-y-3 flex-1">
            <p className="text-lg font-medium">Community Food Drive</p>
            <p className="text-base text-text-secondary">Local Food Bank</p>
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-text-custom-color">Participated on October 15, 2023</p>
              <Button
                className="border-border-input-color text-primary-custom-color hover:text-primary-custom-color"
                variant={'outline'}
              >
                See more
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow flex">
          <img src={Event5} width={200} height={160} className="object-cover" />
          <div className="p-6 space-y-3 flex-1">
            <p className="text-lg font-medium">Community Food Drive</p>
            <p className="text-base text-text-secondary">Local Food Bank</p>
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-text-custom-color">Participated on October 15, 2023</p>
              <Button
                className="border-border-input-color text-primary-custom-color hover:text-primary-custom-color"
                variant={'outline'}
              >
                See more
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow flex">
          <img src={Event6} width={200} height={160} className="object-cover" />
          <div className="p-6 space-y-3 flex-1">
            <p className="text-lg font-medium">Community Food Drive</p>
            <p className="text-base text-text-secondary">Local Food Bank</p>
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-text-custom-color">Participated on October 15, 2023</p>
              <Button
                className="border-border-input-color text-primary-custom-color hover:text-primary-custom-color"
                variant={'outline'}
              >
                See more
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow flex">
          <img src={Event7} width={200} height={160} className="object-cover" />
          <div className="p-6 space-y-3 flex-1">
            <p className="text-lg font-medium">Community Food Drive</p>
            <p className="text-base text-text-secondary">Local Food Bank</p>
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-text-custom-color">Participated on October 15, 2023</p>
              <Button
                className="border-border-input-color text-primary-custom-color hover:text-primary-custom-color"
                variant={'outline'}
              >
                See more
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default CharityHistory
