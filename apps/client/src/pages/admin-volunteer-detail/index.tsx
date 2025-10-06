import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import VolunteersService, { Role, VolunteerUpdateRequest } from '@/services/volunteers.service'
import dayjs from 'dayjs'
import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import useSWR from 'swr'

const Volunteers = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const { data, mutate } = useSWR('/admin/volunteer/' + id, () =>
    VolunteersService.getVolunteerById(id!)
  )

  const handleUpdateVolunteer = async (data: VolunteerUpdateRequest) => {
    await VolunteersService.updateVolunteer(id!, data)
    mutate('/admin/volunteer')
  }
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ChevronLeft />
          Back
        </div>
        <div className="text-2xl font-bold">Account Details</div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-primary-custom-color"
            size={'sm'}
            onClick={() => handleUpdateVolunteer({ role: Role.ROLE_ADMIN })}
          >
            Be Admin
          </Button>
          {/* <Button
            className="text-blue-500 border-blue-500 px-6"
            variant={'outline'}
            size={'sm'}
            onClick={() => navigate(`/admin/volunteer/edit/${id}`)}
          >
            Edit
          </Button> */}
          {!data?.banned ? (
            <Button
              className="text-black border-gray-200 px-6"
              variant={'outline'}
              size={'sm'}
              onClick={() => handleUpdateVolunteer({ isBanned: true })}
            >
              Ban
            </Button>
          ) : (
            <Button
              className="text-black border-green-200 px-6 text-green-300"
              variant={'outline'}
              size={'sm'}
              onClick={() => handleUpdateVolunteer({ isBanned: false })}
            >
              Allow
            </Button>
          )}
          {data?.active ? (
            <Button
              className="text-red-400 border-red-200 px-6"
              variant={'outline'}
              size={'sm'}
              onClick={() => handleUpdateVolunteer({ isActive: false })}
            >
              Inactive
            </Button>
          ) : (
            <Button
              className="text-green-400 border-green-200 px-6"
              variant={'outline'}
              size={'sm'}
              onClick={() => handleUpdateVolunteer({ isActive: true })}
            >
              Active
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Basic Information</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-base font-medium">{data?.fullName || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium">{data?.email || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-base font-medium">{data?.contact || '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">User ID</p>
            <p className="text-base font-medium">{data?.id ? `VOL - ${data?.id}` : '-'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-base font-medium">{data?.role || '-'}</p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Organization Information</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Organization ID</p>
            <p className="text-base font-medium">
              {data?.organization?.id ? `ORG - ${data?.organization?.id}` : '-'}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Organization Name</p>
            <p className="text-base font-medium">{data?.organization?.organizationName || '-'}</p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Event Participation History</p>
        <div className="space-y-2">
          {data?.participatedEvents?.length === 0 && <p>No events participated yet.</p>}
          {data?.participatedEvents?.map((event: any) => {
            return (
              <div className="p-4 border border-gray-200 rounded flex items-center justify-between">
                <div>
                  <p className="font-medium">{event?.charityName}</p>
                  <p className="text-sm text-gray-500">
                    Participated on: {`${dayjs(event?.dateStart).format('MMM D, YYYY')}`} •{' '}
                    {event?.destination || '-'}
                  </p>
                </div>
                <div>
                  <Badge
                    variant={'secondary'}
                    className={cn('text-xs', {
                      'bg-green-500/10 text-green-500': event?.eventStatus === 'active',
                      'bg-blue-500/10 text-blue-500': event?.eventStatus === 'completed',
                      'bg-yellow-500/10 text-yellow-500': event?.eventStatus === 'upcoming',
                      'bg-red-500/10 text-red-500': event?.eventStatus === 'cancelled'
                    })}
                  >
                    {String(event?.eventStatus).charAt(0).toUpperCase() +
                      String(event?.eventStatus).slice(1)}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="space-y-6">
        <p className="text-xl font-semibold">Donation History</p>
        <div className="space-y-2 border border-gray-200 rounded">
          <div className="flex items-center p-4 gap-2 bg-gray-100">
            <p className="flex-[2] text-sm">Campaign Name</p>
            <p className="flex-1 text-sm">Date</p>
            <p className="flex-1 text-sm">Amount</p>
          </div>
          {data?.donationHistory?.length === 0 && (
            <p className="text-center p-4">No donation yet.</p>
          )}
          {data?.donationHistory?.map((event: any) => {
            return (
              <div className="flex items-center p-4 gap-2 border-t border-gray-200">
                <p className="flex-[2] text-sm">{event?.donationEventTitle}</p>
                <p className="flex-1 text-sm">{`${dayjs(event?.createdAt).format('MMM D, YYYY')}`}</p>
                <p className="flex-1 text-sm">{event?.donateAmount}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Volunteers
