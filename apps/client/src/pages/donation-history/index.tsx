import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

const DonationHistory = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">Your Donation History</p>
          <p className="text-base text-text-custom-color">Track all your contributions</p>
        </div>
      </div>
      <div className="shadow rounded-lg p-6 space-y-4 flex items-center justify-center gap-4">
        <SearchInput className="m-0" placeholder="Search by Program Name" />
        <Button className="bg-primary-custom-color hover:bg-primary-custom-color">
          <span>Search</span>
        </Button>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map(() => (
          <div className="rounded-lg overflow-hidden shadow flex justify-between">
            <div className="p-6 space-y-1">
              <p className="text-lg font-medium">Clean Water Initiative</p>
              <p className="text-base text-text-secondary">Global Water Foundation</p>
            </div>
            <div className="p-6 space-y-1 text-right">
              <p className="text-lg font-medium text-primary-custom-color">$250.00</p>
              <p className="text-base text-text-secondary">April 15, 2024</p>
            </div>
          </div>
        ))}
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

export default DonationHistory
