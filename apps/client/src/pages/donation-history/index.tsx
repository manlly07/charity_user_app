import SearchInput from '@/components/search'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/lib/api'
import { RootState } from '@/stores/store'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import useSWR from 'swr'

const DonationHistory = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  if (!user?.id) return <Navigate to={'/login'} />
  const { data, error } = useSWR('/charity/donation', async () => {
    const res = await axiosInstance.get(`/events/donation/volunteer/${user?.id}/history`)
    return res.data
  })

  const EVENTS = useMemo(() => {
    if (error || !data) return []
    return data
  }, [data, error])

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
        {EVENTS.map((donation: any) => (
          <div className="rounded-lg overflow-hidden shadow flex justify-between">
            <div className="p-6 space-y-1">
              <p className="text-lg font-medium">{donation?.donationEventTitle}</p>
              <p className="text-base text-text-secondary">{donation?.organizationName}</p>
            </div>
            <div className="p-6 space-y-1 text-right">
              <p className="text-lg font-medium text-primary-custom-color">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(donation?.donateAmount)}
              </p>
              <p className="text-base text-text-secondary">
                {dayjs(donation?.donationCreatedAt).format('MMMM DD, YYYY')}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="m-auto mt-8">
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
      </div> */}
    </div>
  )
}

export default DonationHistory
