import { Button } from '@/components/ui/button'
import { EEventStatus } from '@/hooks/useDonationAdmin'
import CharitiesAdminService from '@/services/charities.admin.service'
import dayjs from 'dayjs'
import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import useSWR from 'swr'
import TableVolunteer from './table'

const Volunteers = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data, mutate } = useSWR('/admin/charities/' + id, () =>
    CharitiesAdminService.getCharitiesById(id!)
  )

  const handleUpdateDonation = async (data: { eventStatus: EEventStatus }) => {
    await CharitiesAdminService.updateCharityEventStatus(id!, data)
    mutate()
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ChevronLeft />
          Back
        </div>
        <div className="text-2xl font-bold">Charity Details</div>
        <div className="flex items-center gap-2"></div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Basic Information</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Charity Id</p>
            <p className="text-base font-medium">{data?.id ? `DON - ${data?.id}` : '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Organization Name</p>
            <p className="text-base font-medium">{data?.organizationName || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Program Name</p>
            <p className="text-base font-medium">{data?.charityName || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="text-base font-medium">{dayjs(data?.dateStart).format('MMM D, YYYY')}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Number of Volunteer Need</p>
            <p className="text-base font-medium">{data?.numVolunteerRequire || '-'}</p>
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
        <div>
          <p className="text-xl font-semibold">Description</p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-base font-medium">{data?.description || '-'}</p>
          </div>
          <p className="text-xl font-semibold">To do</p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-base font-medium">{data?.todo || '-'}</p>
          </div>
          <p className="text-xl font-semibold">Require</p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-base font-medium">{data?.requirement || '-'}</p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <TableVolunteer participants={data?.participants ?? []} />
      </div>
      {data?.eventStatus === EEventStatus.ACTIVE && (
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
      )}

      {data?.eventStatus === EEventStatus.CLOSED && (
        <Button
          className="text-green-400 border-green-200 px-6"
          variant={'outline'}
          size={'sm'}
          onClick={() =>
            handleUpdateDonation({
              eventStatus: EEventStatus.ACTIVE
            })
          }
        >
          Active This Event
        </Button>
      )}
      {data?.eventStatus === EEventStatus.PENDING && (
        <Button
          className="ml-4 text-green-400 border-green-200 px-6"
          variant={'outline'}
          size={'sm'}
          onClick={() =>
            handleUpdateDonation({
              eventStatus: EEventStatus.ACTIVE
            })
          }
        >
          Accept This Event
        </Button>
      )}
    </div>
  )
}

export default Volunteers
