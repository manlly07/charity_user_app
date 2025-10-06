import { Button } from '@/components/ui/button'
import { EEventStatus } from '@/hooks/useDonationAdmin'
import DonationAdminService from '@/services/organization.admin.service'
import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import useSWR from 'swr'
import TableDonor from './table'

const Volunteers = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data } = useSWR('/admin/volunteer/' + id, () =>
    DonationAdminService.getDonationsById(id!)
  )

  const handleUpdateDonation = async (data: { eventStatus: EEventStatus }) => {
    await DonationAdminService.updateDonationStatus(id!, data)
  }

  console.log(data)
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ChevronLeft />
          Back
        </div>
        <div className="text-2xl font-bold">Donation Details</div>
        <div className="flex items-center gap-2"></div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Basic Information</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Donation Id</p>
            <p className="text-base font-medium">{data?.id ? `DON - ${data?.id}` : '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Organization Name</p>
            <p className="text-base font-medium">{data?.organizationName || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Program Name</p>
            <p className="text-base font-medium">{data?.title || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Money need</p>
            <p className="text-base font-medium">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(parseFloat(data?.moneyNeed as string) || 0)}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-xl font-semibold">Picture/ Banner</p>
          <div>
            {!data?.pic && <p className="text-sm text-text-secondary">No banner available.</p>}
            {data?.pic && (
              <img
                src={data?.pic}
                alt={data?.title}
                className="w-ful h-40 rounded object-cover block "
              />
            )}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Description</p>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-base font-medium">{data?.description || '-'}</p>
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Donation History</p>
        <TableDonor donation={data?.donors ?? []} />
      </div>
      <Button
        className="text-red-400 border-red-200 px-6"
        variant={'outline'}
        size={'sm'}
        onClick={() =>
          handleUpdateDonation({
            eventStatus: EEventStatus.CLOSED
          })
        }
      >
        Stop This Event
      </Button>
    </div>
  )
}

export default Volunteers
